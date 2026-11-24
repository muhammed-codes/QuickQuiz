/**
 * ============================================================================
 * QuickQuiz — Database Schema Initialization Script
 * Runs schema.sql to create all tables and indexes in Neon PostgreSQL
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const { query, testConnection } = require('../config/db');

async function initializeDatabase() {
  console.log('[QuickQuiz DB Init] Checking Neon database connection...');
  const connTest = await testConnection();

  if (!connTest.success) {
    console.error('[QuickQuiz DB Init] Connection failed:', connTest.message);
    process.exit(1);
  }

  console.log(`[QuickQuiz DB Init] Connected to: ${connTest.database}`);
  console.log('[QuickQuiz DB Init] Reading schema.sql...');

  const schemaPath = path.join(__dirname, 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  try {
    console.log('[QuickQuiz DB Init] Executing DDL migrations...');
    await query(schemaSql);
    console.log('[QuickQuiz DB Init] Schema initialization completed successfully.');
  } catch (err) {
    console.error('[QuickQuiz DB Init] Migration failed:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  initializeDatabase().then(() => process.exit(0));
}

module.exports = { initializeDatabase };
