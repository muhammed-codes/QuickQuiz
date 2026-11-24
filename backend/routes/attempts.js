/**
 * ============================================================================
 * QuickQuiz — Quiz Attempts Express Router
 * ============================================================================
 */

const express = require('express');
const router = express.Router();
const {
  getAllAttempts,
  createAttempt,
  clearAllAttempts
} = require('../controllers/attempts');
const { validateCreateAttempt } = require('../middleware/validate');

router.route('/')
  .get(getAllAttempts)
  .post(validateCreateAttempt, createAttempt)
  .delete(clearAllAttempts);

module.exports = router;
