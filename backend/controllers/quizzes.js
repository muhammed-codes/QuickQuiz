/**
 * ============================================================================
 * QuickQuiz — Quizzes Controller
 * Handles CRUD operations for quizzes and their questions in Neon PostgreSQL
 * ============================================================================
 */

const { query, getClient } = require('../config/db');
const { AppError } = require('../middleware/errorHandler');

/**
 * GET /api/quizzes
 * Retrieve all available quizzes with question counts
 */
async function getAllQuizzes(req, res, next) {
  try {
    const sql = `
      SELECT 
        q.id,
        q.title,
        q.category,
        q.difficulty,
        q.description,
        q.is_default,
        q.created_at,
        q.updated_at,
        COUNT(qs.id)::int AS question_count
      FROM quizzes q
      LEFT JOIN questions qs ON q.id = qs.quiz_id
      GROUP BY q.id
      ORDER BY q.is_default DESC, q.created_at DESC;
    `;
    const result = await query(sql);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/quizzes/:id
 * Retrieve a single quiz and its questions.
 * Security: Does not expose correct_answer or explanation unless ?includeAnswers=true is specified.
 */
async function getQuizById(req, res, next) {
  try {
    const { id } = req.params;
    const includeAnswers = req.query.includeAnswers === 'true';

    const quizResult = await query('SELECT * FROM quizzes WHERE id = $1', [id]);
    if (quizResult.rowCount === 0) {
      return next(new AppError(`Quiz not found with ID "${id}"`, 404));
    }

    const quiz = quizResult.rows[0];

    // Select questions
    let questionsSql;
    if (includeAnswers) {
      questionsSql = `
        SELECT id, quiz_id, question_text, options, correct_answer, explanation, question_order
        FROM questions
        WHERE quiz_id = $1
        ORDER BY question_order ASC;
      `;
    } else {
      questionsSql = `
        SELECT id, quiz_id, question_text, options, question_order
        FROM questions
        WHERE quiz_id = $1
        ORDER BY question_order ASC;
      `;
    }

    const questionsResult = await query(questionsSql, [id]);

    // Format questions to match frontend structure (prompt, options)
    const formattedQuestions = questionsResult.rows.map(row => {
      const q = {
        id: row.id,
        prompt: row.question_text,
        options: row.options,
        questionOrder: row.question_order
      };
      if (includeAnswers) {
        q.correctAnswer = row.correct_answer;
        q.explanation = row.explanation;
      }
      return q;
    });

    res.status(200).json({
      success: true,
      data: {
        id: quiz.id,
        title: quiz.title,
        category: quiz.category,
        difficulty: quiz.difficulty,
        description: quiz.description,
        isDefault: quiz.is_default,
        createdAt: quiz.created_at,
        updatedAt: quiz.updated_at,
        questions: formattedQuestions
      }
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/quizzes
 * Create a new custom quiz with questions inside a transaction
 */
async function createQuiz(req, res, next) {
  const client = await getClient();
  try {
    const { title, category, difficulty = 'Medium', description = '', questions } = req.body;
    const quizId = `quiz_custom_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    await client.query('BEGIN');

    // Insert Quiz
    const quizSql = `
      INSERT INTO quizzes (id, title, category, difficulty, description, is_default)
      VALUES ($1, $2, $3, $4, $5, FALSE)
      RETURNING *;
    `;
    const quizRes = await client.query(quizSql, [quizId, title.trim(), category.trim(), difficulty, description.trim()]);
    const createdQuiz = quizRes.rows[0];

    // Insert Questions
    const questionSql = `
      INSERT INTO questions (quiz_id, question_text, options, correct_answer, explanation, question_order)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const insertedQuestions = [];
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const prompt = (q.prompt || q.question_text).trim();
      const optionsJson = JSON.stringify(q.options.map(o => o.trim()));
      const correctAnswer = (q.correct_answer !== undefined) ? q.correct_answer : q.correctAnswer;
      const explanation = (q.explanation || 'No explanation provided.').trim();

      const qRes = await client.query(questionSql, [quizId, prompt, optionsJson, correctAnswer, explanation, i + 1]);
      insertedQuestions.push(qRes.rows[0]);
    }

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully.',
      data: {
        id: createdQuiz.id,
        title: createdQuiz.title,
        category: createdQuiz.category,
        difficulty: createdQuiz.difficulty,
        description: createdQuiz.description,
        isDefault: createdQuiz.is_default,
        createdAt: createdQuiz.created_at,
        questionsCount: insertedQuestions.length
      }
    });
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
}

/**
 * PUT /api/quizzes/:id
 * Update an existing quiz
 */
async function updateQuiz(req, res, next) {
  const client = await getClient();
  try {
    const { id } = req.params;
    const { title, category, difficulty, description, questions } = req.body;

    // Check quiz exists
    const checkRes = await query('SELECT * FROM quizzes WHERE id = $1', [id]);
    if (checkRes.rowCount === 0) {
      return next(new AppError(`Quiz not found with ID "${id}"`, 404));
    }

    if (checkRes.rows[0].is_default) {
      return next(new AppError('Default curriculum quizzes cannot be modified.', 403));
    }

    await client.query('BEGIN');

    // Update Quiz record
    const updateSql = `
      UPDATE quizzes
      SET 
        title = COALESCE($1, title),
        category = COALESCE($2, category),
        difficulty = COALESCE($3, difficulty),
        description = COALESCE($4, description),
        updated_at = NOW()
      WHERE id = $5
      RETURNING *;
    `;
    const updatedRes = await client.query(updateSql, [
      title ? title.trim() : null,
      category ? category.trim() : null,
      difficulty || null,
      description !== undefined ? description.trim() : null,
      id
    ]);

    // If new questions array provided, replace existing questions
    if (Array.isArray(questions) && questions.length > 0) {
      await client.query('DELETE FROM questions WHERE quiz_id = $1', [id]);

      const questionSql = `
        INSERT INTO questions (quiz_id, question_text, options, correct_answer, explanation, question_order)
        VALUES ($1, $2, $3, $4, $5, $6);
      `;
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const prompt = (q.prompt || q.question_text).trim();
        const optionsJson = JSON.stringify(q.options.map(o => o.trim()));
        const correctAnswer = (q.correct_answer !== undefined) ? q.correct_answer : q.correctAnswer;
        const explanation = (q.explanation || 'No explanation provided.').trim();

        await client.query(questionSql, [id, prompt, optionsJson, correctAnswer, explanation, i + 1]);
      }
    }

    await client.query('COMMIT');

    res.status(200).json({
      success: true,
      message: 'Quiz updated successfully.',
      data: updatedRes.rows[0]
    });
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
}

/**
 * DELETE /api/quizzes/:id
 * Delete a custom quiz and its questions
 */
async function deleteQuiz(req, res, next) {
  try {
    const { id } = req.params;

    const checkRes = await query('SELECT * FROM quizzes WHERE id = $1', [id]);
    if (checkRes.rowCount === 0) {
      return next(new AppError(`Quiz not found with ID "${id}"`, 404));
    }

    if (checkRes.rows[0].is_default) {
      return next(new AppError('Default curriculum quizzes cannot be deleted.', 403));
    }

    await query('DELETE FROM quizzes WHERE id = $1', [id]);

    res.status(200).json({
      success: true,
      message: `Quiz "${checkRes.rows[0].title}" deleted successfully.`
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz
};
