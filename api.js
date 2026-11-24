/**
 * ============================================================================
 * QuickQuiz — Frontend API Service Client
 * Handles communication between the client and the Express/Neon backend
 * ============================================================================
 */

(function (window) {
  'use strict';

  // Automatically resolve the backend API base URL
  // If running via Live Server (e.g. port 5500), file://, or non-5000 port, route to Express backend at http://localhost:5000
  const isDirectBackend = window.location.protocol !== 'file:' && (window.location.port === '5000' || (!window.location.port && (window.location.protocol === 'http:' || window.location.protocol === 'https:')));
  const API_BASE_URL = isDirectBackend ? '' : 'http://localhost:5000';

  /**
   * Helper function for unified fetch requests
   * @param {string} endpoint - API path (e.g. '/api/quizzes')
   * @param {object} options - Fetch options
   * @returns {Promise<any>}
   */
  async function request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {})
      }
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        const errorMsg = (data && data.error && data.error.message) || data.message || `HTTP ${response.status}`;
        throw new Error(errorMsg);
      }

      return data;
    } catch (err) {
      console.warn(`[QuickQuiz API] Request to "${endpoint}" failed:`, err.message);
      throw err;
    }
  }

  const QuickQuizAPI = {
    /**
     * Check backend health and Neon PostgreSQL connectivity
     */
    async checkHealth() {
      try {
        return await request('/api/health');
      } catch (err) {
        return {
          status: 'offline',
          database: { connected: false, message: err.message }
        };
      }
    },

    /**
     * Fetch all available quizzes from the cloud database
     * @returns {Promise<Array>}
     */
    async getQuizzes() {
      const res = await request('/api/quizzes');
      return res.data || [];
    },

    /**
     * Fetch a single quiz by ID with its questions
     * @param {string} id - Quiz ID
     * @param {boolean} includeAnswers - Whether to include correct answers (for review)
     * @returns {Promise<object>}
     */
    async getQuizById(id, includeAnswers = false) {
      const queryParam = includeAnswers ? '?includeAnswers=true' : '';
      const res = await request(`/api/quizzes/${encodeURIComponent(id)}${queryParam}`);
      return res.data;
    },

    /**
     * Create a new custom quiz
     * @param {object} quizData - { title, category, difficulty, description, questions }
     * @returns {Promise<object>}
     */
    async createQuiz(quizData) {
      const res = await request('/api/quizzes', {
        method: 'POST',
        body: JSON.stringify(quizData)
      });
      return res.data;
    },

    /**
     * Update an existing custom quiz
     * @param {string} id - Quiz ID
     * @param {object} quizData - Fields to update
     * @returns {Promise<object>}
     */
    async updateQuiz(id, quizData) {
      const res = await request(`/api/quizzes/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: JSON.stringify(quizData)
      });
      return res.data;
    },

    /**
     * Delete a custom quiz
     * @param {string} id - Quiz ID
     * @returns {Promise<object>}
     */
    async deleteQuiz(id) {
      return await request(`/api/quizzes/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
    },

    /**
     * Retrieve all quiz attempt history
     * @returns {Promise<Array>}
     */
    async getAttempts() {
      const res = await request('/api/attempts');
      return res.data || [];
    },

    /**
     * Submit completed quiz attempt for server-side evaluation & saving
     * @param {string} quizId - Target quiz ID
     * @param {Array} answers - User selections array: [{ questionIndex, selectedOption }]
     * @returns {Promise<object>} - Evaluated attempt with scores and answers
     */
    async submitAttempt(quizId, answers) {
      const res = await request('/api/attempts', {
        method: 'POST',
        body: JSON.stringify({ quizId, answers })
      });
      return res.data;
    },

    /**
     * Clear all quiz history
     * @returns {Promise<object>}
     */
    async clearAttempts() {
      return await request('/api/attempts', {
        method: 'DELETE'
      });
    }
  };

  // Attach to global window object
  window.QuickQuizAPI = QuickQuizAPI;

})(window);
