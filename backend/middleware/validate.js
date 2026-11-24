/**
 * ============================================================================
 * QuickQuiz — Request Validation Middleware
 * ============================================================================
 */

const { AppError } = require('./errorHandler');

function validateCreateQuiz(req, res, next) {
  const { title, category, difficulty, description, questions } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return next(new AppError('Quiz title is required and must be a non-empty string.', 400));
  }
  if (title.trim().length > 255) {
    return next(new AppError('Quiz title must not exceed 255 characters.', 400));
  }

  if (!category || typeof category !== 'string' || !category.trim()) {
    return next(new AppError('Category is required.', 400));
  }

  const validDifficulties = ['Easy', 'Medium', 'Hard'];
  if (difficulty && !validDifficulties.includes(difficulty)) {
    return next(new AppError('Difficulty must be Easy, Medium, or Hard.', 400));
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    return next(new AppError('A quiz must contain at least 1 question.', 400));
  }
  if (questions.length > 10) {
    return next(new AppError('A quiz cannot have more than 10 questions.', 400));
  }

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const qNum = i + 1;

    const promptText = q.prompt || q.question_text;
    if (!promptText || typeof promptText !== 'string' || !promptText.trim()) {
      return next(new AppError(`Question ${qNum} is missing question prompt text.`, 400));
    }

    if (!Array.isArray(q.options) || q.options.length !== 4) {
      return next(new AppError(`Question ${qNum} must provide exactly 4 options.`, 400));
    }

    for (let o = 0; o < 4; o++) {
      if (!q.options[o] || typeof q.options[o] !== 'string' || !q.options[o].trim()) {
        return next(new AppError(`Question ${qNum} has an empty option at position ${o + 1}.`, 400));
      }
    }

    const correct = (q.correct_answer !== undefined) ? q.correct_answer : q.correctAnswer;
    if (correct === undefined || correct === null || typeof correct !== 'number' || correct < 0 || correct > 3) {
      return next(new AppError(`Question ${qNum} must specify a valid correct answer index (0-3).`, 400));
    }
  }

  next();
}

function validateCreateAttempt(req, res, next) {
  const { quizId, answers } = req.body;

  if (!quizId || typeof quizId !== 'string') {
    return next(new AppError('quizId is required.', 400));
  }

  if (!Array.isArray(answers) || answers.length === 0) {
    return next(new AppError('answers array is required.', 400));
  }

  for (let i = 0; i < answers.length; i++) {
    const a = answers[i];
    if (a.selectedAnswer === undefined && a.selected_answer === undefined) {
      return next(new AppError(`Answer at index ${i} is missing selected answer index.`, 400));
    }
  }

  next();
}

module.exports = {
  validateCreateQuiz,
  validateCreateAttempt
};
