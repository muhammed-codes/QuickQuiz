/**
 * ============================================================================
 * QuickQuiz — Centralized Error Handling Middleware
 * ============================================================================
 */

function errorHandler(err, req, res, next) {
  console.error(`[QuickQuiz API Error] ${req.method} ${req.url}:`, err.message);

  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : (statusCode === 500 ? 'Internal Server Error' : err.message);

  res.status(statusCode).json({
    success: false,
    error: {
      status: statusCode,
      message: message,
      ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
    }
  });
}

class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { errorHandler, AppError };
