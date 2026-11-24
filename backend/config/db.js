/**
 * ============================================================================
 * QuickQuiz — Neon PostgreSQL Connection Pool
 * ============================================================================
 */

const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

let pool = null;

if (connectionString) {
  pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false // Neon requires SSL; rejectUnauthorized: false ensures compatibility with cloud certs
    },
    max: 10, // maximum connection pool size
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000
  });

  pool.on('error', (err) => {
    console.error('[QuickQuiz DB] Unexpected error on idle PostgreSQL client:', err.message);
  });
} else {
  console.warn('[QuickQuiz DB] WARNING: DATABASE_URL is not defined in environment variables. Database queries will fail until .env is configured.');
}

/**
 * Execute a parameterized SQL query
 * @param {string} text - SQL statement with $1, $2 placeholders
 * @param {Array} params - Parameter values array
 * @returns {Promise<import('pg').QueryResult>}
 */
async function query(text, params = []) {
  if (!pool) {
    throw new Error('Database connection not configured. Please define DATABASE_URL in your .env file.');
  }
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  if (process.env.NODE_ENV === 'development') {
    console.log(`[QuickQuiz DB] Query executed in ${duration}ms:`, { text, rows: res.rowCount });
  }
  return res;
}

/**
 * Acquire a client from the pool for transactions
 * @returns {Promise<import('pg').PoolClient>}
 */
async function getClient() {
  if (!pool) {
    throw new Error('Database connection not configured. Please define DATABASE_URL in your .env file.');
  }
  return await pool.connect();
}

/**
 * Test the database connection
 * @returns {Promise<{ success: boolean, message: string, timestamp?: string }>}
 */
async function testConnection() {
  if (!pool) {
    return {
      success: false,
      message: 'DATABASE_URL is not set in environment (.env).'
    };
  }
  try {
    const res = await query('SELECT NOW() as current_time, current_database() as db_name, version() as pg_version;');
    return {
      success: true,
      message: 'Connected to Neon PostgreSQL successfully.',
      database: res.rows[0].db_name,
      timestamp: res.rows[0].current_time,
      version: res.rows[0].pg_version
    };
  } catch (err) {
    return {
      success: false,
      message: `Database connection error: ${err.message}`
    };
  }
}

module.exports = {
  pool,
  query,
  getClient,
  testConnection
};
