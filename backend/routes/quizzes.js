/**
 * ============================================================================
 * QuickQuiz — Quizzes Express Router
 * ============================================================================
 */

const express = require('express');
const router = express.Router();
const {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz
} = require('../controllers/quizzes');
const { validateCreateQuiz } = require('../middleware/validate');

router.route('/')
  .get(getAllQuizzes)
  .post(validateCreateQuiz, createQuiz);

router.route('/:id')
  .get(getQuizById)
  .put(updateQuiz)
  .delete(deleteQuiz);

module.exports = router;
