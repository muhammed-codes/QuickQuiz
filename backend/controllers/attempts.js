/**
 * ============================================================================
 * QuickQuiz — Quiz Attempts Controller
 * Handles recording attempts, server-side answer evaluation, and history
 * ============================================================================
 */

const { query, getClient } = require('../config/db');
const { AppError } = require('../middleware/errorHandler');

/**
 * GET /api/attempts
 * Retrieve all completed quiz attempts with answers
 */
async function getAllAttempts(req, res, next) {
  try {
    const attemptsSql = `
      SELECT 
        id,
        quiz_id,
        quiz_title,
        category,
        score,
        total_questions,
        percentage,
        completed_at
      FROM quiz_attempts
      ORDER BY completed_at DESC;
    `;
    const attemptsRes = await query(attemptsSql);

    if (attemptsRes.rowCount === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: []
      });
    }

    const attemptIds = attemptsRes.rows.map(a => a.id);

    // Fetch attempt answers for all attempts
    const answersSql = `
      SELECT 
        attempt_id,
        question_id,
        question_text,
        options,
        selected_answer,
        correct_answer,
        is_correct,
        explanation
      FROM attempt_answers
      WHERE attempt_id = ANY($1)
      ORDER BY id ASC;
    `;
    const answersRes = await query(answersSql, [attemptIds]);

    // Group answers by attempt_id
    const answersMap = {};
    answersRes.rows.forEach(ans => {
      if (!answersMap[ans.attempt_id]) {
        answersMap[ans.attempt_id] = [];
      }
      answersMap[ans.attempt_id].push({
        questionId: ans.question_id,
        questionPrompt: ans.question_text,
        options: ans.options,
        selectedOption: ans.selected_answer,
        correctOption: ans.correct_answer,
        isCorrect: ans.is_correct,
        explanation: ans.explanation
      });
    });

    const formattedData = attemptsRes.rows.map(att => ({
      id: att.id,
      quizId: att.quiz_id,
      quizTitle: att.quiz_title,
      category: att.category,
      correctCount: att.score,
      totalQuestions: att.total_questions,
      percentage: att.percentage,
      completedAt: att.completed_at,
      userAnswers: answersMap[att.id] || []
    }));

    res.status(200).json({
      success: true,
      count: formattedData.length,
      data: formattedData
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/attempts
 * Submit completed quiz answers. Evaluates correctness server-side against Neon DB.
 */
async function createAttempt(req, res, next) {
  const client = await getClient();
  try {
    const { quizId, answers } = req.body;

    // 1. Fetch Quiz & Question Data
    const quizRes = await client.query('SELECT * FROM quizzes WHERE id = $1', [quizId]);
    if (quizRes.rowCount === 0) {
      return next(new AppError(`Quiz not found with ID "${quizId}"`, 404));
    }
    const quiz = quizRes.rows[0];

    const questionsRes = await client.query(
      'SELECT id, question_text, options, correct_answer, explanation, question_order FROM questions WHERE quiz_id = $1 ORDER BY question_order ASC',
      [quizId]
    );
    const dbQuestions = questionsRes.rows;

    if (dbQuestions.length === 0) {
      return next(new AppError('This quiz does not have any questions registered.', 400));
    }

    // 2. Evaluate answers server-side
    let score = 0;
    const evaluatedAnswers = [];

    dbQuestions.forEach((dbQ, idx) => {
      // Find matching submitted answer by question_id or question index
      const submitted = answers.find(a => (a.questionId && a.questionId === dbQ.id) || a.questionIndex === idx) || answers[idx];
      const selectedAnswer = submitted ? (submitted.selectedAnswer !== undefined ? submitted.selectedAnswer : submitted.selectedOption) : -1;
      const isCorrect = (selectedAnswer === dbQ.correct_answer);

      if (isCorrect) score += 1;

      evaluatedAnswers.push({
        questionId: dbQ.id,
        questionPrompt: dbQ.question_text,
        options: dbQ.options,
        selectedOption: selectedAnswer,
        correctOption: dbQ.correct_answer,
        isCorrect: isCorrect,
        explanation: dbQ.explanation || 'No explanation provided.'
      });
    });

    const totalQuestions = dbQuestions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const attemptId = `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // 3. Persist attempt in Neon DB inside transaction
    await client.query('BEGIN');

    const insertAttemptSql = `
      INSERT INTO quiz_attempts (id, quiz_id, quiz_title, category, score, total_questions, percentage, completed_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING *;
    `;
    const attemptResult = await client.query(insertAttemptSql, [
      attemptId,
      quiz.id,
      quiz.title,
      quiz.category,
      score,
      totalQuestions,
      percentage
    ]);

    const insertAnswerSql = `
      INSERT INTO attempt_answers (attempt_id, question_id, question_text, options, selected_answer, correct_answer, is_correct, explanation)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;

    for (const ans of evaluatedAnswers) {
      await client.query(insertAnswerSql, [
        attemptId,
        ans.questionId,
        ans.questionPrompt,
        JSON.stringify(ans.options),
        ans.selectedOption,
        ans.correctOption,
        ans.isCorrect,
        ans.explanation
      ]);
    }

    await client.query('COMMIT');

    const savedRecord = attemptResult.rows[0];

    // 4. Return evaluated results to client for the results screen
    res.status(201).json({
      success: true,
      message: 'Quiz attempt evaluated and saved successfully.',
      data: {
        id: savedRecord.id,
        quizId: savedRecord.quiz_id,
        quizTitle: savedRecord.quiz_title,
        category: savedRecord.category,
        correctCount: savedRecord.score,
        totalQuestions: savedRecord.total_questions,
        percentage: savedRecord.percentage,
        completedAt: savedRecord.completed_at,
        userAnswers: evaluatedAnswers
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
 * DELETE /api/attempts
 * Clear all quiz attempts history
 */
async function clearAllAttempts(req, res, next) {
  try {
    await query('DELETE FROM quiz_attempts;');

    res.status(200).json({
      success: true,
      message: 'All quiz attempts history cleared successfully.'
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllAttempts,
  createAttempt,
  clearAllAttempts
};
