/**
 * ============================================================================
 * QuickQuiz — Express Backend Server
 * Node.js + Express + Neon PostgreSQL
 * ============================================================================
 */

require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const { testConnection } = require('./config/db');
const quizzesRouter = require('./routes/quizzes');
const attemptsRouter = require('./routes/attempts');
const { errorHandler, AppError } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static assets (HTML, CSS, JS) from project root
const publicDir = path.resolve(__dirname, '..');
app.use(express.static(publicDir));

// Health & Database Diagnostics Endpoint
app.get('/api/health', async (req, res) => {
  const dbStatus = await testConnection();
  res.status(dbStatus.success ? 200 : 503).json({
    status: dbStatus.success ? 'healthy' : 'degraded',
    service: 'QuickQuiz API',
    timestamp: new Date().toISOString(),
    database: {
      connected: dbStatus.success,
      details: dbStatus
    }
  });
});

// REST API Routes
app.use('/api/quizzes', quizzesRouter);
app.use('/api/attempts', attemptsRouter);

// 404 Handler for undefined API routes
app.use('/api', (req, res, next) => {
  next(new AppError(`Endpoint not found: ${req.method} ${req.originalUrl}`, 404));
});

// Fallback to index.html for root or client navigation (non-API GET requests)
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(publicDir, 'index.html'));
  }
  next();
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start Server if invoked directly
if (require.main === module) {
  const server = app.listen(PORT, async () => {
    console.log(`[QuickQuiz] Server listening on http://localhost:${PORT}`);
    console.log(`[QuickQuiz] Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Check Neon connection status on startup
    const dbTest = await testConnection();
    if (dbTest.success) {
      console.log(`[QuickQuiz] Neon PostgreSQL: Connected to "${dbTest.database}" (${dbTest.version.split(' ')[0] || 'PostgreSQL'})`);
    } else {
      console.warn(`[QuickQuiz] Neon PostgreSQL: Not connected (${dbTest.message})`);
      console.warn('[QuickQuiz] Tip: Provide a valid DATABASE_URL in your .env file to enable cloud database persistence.');
    }
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('[QuickQuiz] SIGTERM received. Shutting down gracefully...');
    server.close(() => {
      console.log('[QuickQuiz] Process terminated.');
    });
  });
}

module.exports = app;
