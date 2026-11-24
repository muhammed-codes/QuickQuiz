-- ============================================================================
-- QuickQuiz Database Schema for Neon PostgreSQL
-- ============================================================================

-- 1. Quizzes Table
CREATE TABLE IF NOT EXISTS quizzes (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  difficulty VARCHAR(50) NOT NULL DEFAULT 'Medium',
  description TEXT,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Questions Table
CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  quiz_id VARCHAR(64) NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INTEGER NOT NULL,
  explanation TEXT,
  question_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Quiz Attempts Table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id VARCHAR(64) PRIMARY KEY,
  quiz_id VARCHAR(64) REFERENCES quizzes(id) ON DELETE SET NULL,
  quiz_title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage INTEGER NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Attempt Answers Table
CREATE TABLE IF NOT EXISTS attempt_answers (
  id SERIAL PRIMARY KEY,
  attempt_id VARCHAR(64) NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  question_id INTEGER,
  question_text TEXT NOT NULL,
  options JSONB,
  selected_answer INTEGER NOT NULL,
  correct_answer INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL,
  explanation TEXT
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_questions_quiz_id ON questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_questions_quiz_order ON questions(quiz_id, question_order ASC);
CREATE INDEX IF NOT EXISTS idx_attempts_completed_at ON quiz_attempts(completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_attempt_answers_attempt_id ON attempt_answers(attempt_id);
