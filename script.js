/**
 * ============================================================================
 * QuickQuiz — Modern SaaS Quiz Application
 * Vanilla JavaScript (ES6+) with localStorage persistence
 * ============================================================================
 */

'use strict';

/* ----------------------------------------------------------------------------
   1. DEFAULT SAMPLE QUIZZES
   Curated, high-quality sample quizzes with 5 questions each, 4 options per question,
   accurate correct answer indices, and clear explanations.
   ---------------------------------------------------------------------------- */
const DEFAULT_QUIZZES = [
  {
    id: 'quiz_web_dev_basics',
    title: 'Web Development Basics',
    category: 'Web Development',
    difficulty: 'Easy',
    description: 'Master the fundamental building blocks of modern web engineering: HTML, CSS, JavaScript, and protocols.',
    isDefault: true,
    questions: [
      {
        prompt: 'What does the HTML acronym stand for?',
        options: [
          'HyperText Markup Language',
          'HighText Machine Language',
          'Hyperlink and Text Management Level',
          'Home Tool Markup Language'
        ],
        correctAnswer: 0,
        explanation: 'HTML stands for HyperText Markup Language. It provides the standard semantic markup structure for documents designed to be displayed in a web browser.'
      },
      {
        prompt: 'Which CSS property controls the internal spacing between an element\'s content and its border?',
        options: [
          'margin',
          'padding',
          'border-spacing',
          'gap'
        ],
        correctAnswer: 1,
        explanation: 'The padding property clears an area around the content inside an element\'s border. In contrast, margin creates space outside the element\'s border.'
      },
      {
        prompt: 'Which JavaScript keyword is used to declare a variable that is strictly block-scoped and reassignable?',
        options: [
          'var',
          'const',
          'let',
          'static'
        ],
        correctAnswer: 2,
        explanation: 'The let keyword declares a reassignable, block-scoped local variable introduced in ECMAScript 2015 (ES6). const cannot be reassigned, and var is function-scoped.'
      },
      {
        prompt: 'What is the primary benefit of using semantic HTML elements such as <header>, <nav>, and <article>?',
        options: [
          'They automatically style elements with beautiful CSS animations',
          'They enhance accessibility, screen reader navigation, and SEO ranking',
          'They make JavaScript execute twice as fast in modern engines',
          'They compress HTML files for faster server transmission'
        ],
        correctAnswer: 1,
        explanation: 'Semantic elements clearly describe their meaning to both the browser and the developer, significantly enhancing accessibility for screen readers and improving search engine optimization (SEO).'
      },
      {
        prompt: 'Which protocol secures web traffic between a client browser and server using TLS/SSL encryption?',
        options: [
          'HTTP',
          'FTP',
          'HTTPS',
          'SMTP'
        ],
        correctAnswer: 2,
        explanation: 'HTTPS (HyperText Transfer Protocol Secure) encrypts all communication between client and server using Transport Layer Security (TLS), protecting sensitive user data against eavesdropping and tampering.'
      }
    ]
  },
  {
    id: 'quiz_general_knowledge',
    title: 'General Knowledge Challenge',
    category: 'General Knowledge',
    difficulty: 'Medium',
    description: 'Test your awareness of global geography, world history, astronomy, and classical arts.',
    isDefault: true,
    questions: [
      {
        prompt: 'Which celestial body in our solar system is widely known as the "Red Planet"?',
        options: [
          'Venus',
          'Mars',
          'Jupiter',
          'Mercury'
        ],
        correctAnswer: 1,
        explanation: 'Mars is called the Red Planet because the iron oxide (rust) prevalent on its surface gives it a distinct reddish appearance.'
      },
      {
        prompt: 'Which Italian polymath painted the famous High Renaissance portrait of the Mona Lisa?',
        options: [
          'Michelangelo Buonarroti',
          'Raphael Sanzio',
          'Leonardo da Vinci',
          'Sandro Botticelli'
        ],
        correctAnswer: 2,
        explanation: 'Leonardo da Vinci painted the Mona Lisa in the early 16th century. It is now housed in the Louvre Museum in Paris and is regarded as an archetypal Renaissance masterpiece.'
      },
      {
        prompt: 'Which is the largest and deepest ocean on planet Earth by total surface area and volume?',
        options: [
          'Atlantic Ocean',
          'Indian Ocean',
          'Arctic Ocean',
          'Pacific Ocean'
        ],
        correctAnswer: 3,
        explanation: 'The Pacific Ocean is the largest and deepest of the world\'s oceans, extending from the Arctic in the north to the Southern Ocean in the south, covering over 30% of Earth\'s surface.'
      },
      {
        prompt: 'In which landmark year did NASA\'s Apollo 11 mission achieve the first human Moon landing?',
        options: [
          '1965',
          '1969',
          '1972',
          '1975'
        ],
        correctAnswer: 1,
        explanation: 'On July 20, 1969, American astronauts Neil Armstrong and Buzz Aldrin landed the Apollo Lunar Module Eagle on the Moon, marking a monumental achievement in human spaceflight.'
      },
      {
        prompt: 'What is the capital city of Japan, known as the world\'s most populous metropolitan area?',
        options: [
          'Kyoto',
          'Osaka',
          'Tokyo',
          'Sapporo'
        ],
        correctAnswer: 2,
        explanation: 'Tokyo is the capital and largest city of Japan. Formerly known as Edo, it serves as the political, economic, and cultural hub of the nation.'
      }
    ]
  },
  {
    id: 'quiz_everyday_science',
    title: 'Everyday Science & Physics',
    category: 'Science',
    difficulty: 'Medium',
    description: 'Explore the natural laws, chemical reactions, and biological phenomena shaping our everyday world.',
    isDefault: true,
    questions: [
      {
        prompt: 'What atmospheric gas do green plants primarily absorb during the process of photosynthesis?',
        options: [
          'Oxygen',
          'Carbon Dioxide',
          'Nitrogen',
          'Hydrogen'
        ],
        correctAnswer: 1,
        explanation: 'During photosynthesis, green plants capture sunlight and absorb carbon dioxide (CO2) from the air, combining it with water to produce glucose and releasing oxygen as a byproduct.'
      },
      {
        prompt: 'What is the chemical formula for common household table salt?',
        options: [
          'NaCl',
          'KCl',
          'NaHCO3',
          'CaCl2'
        ],
        correctAnswer: 0,
        explanation: 'Common table salt is sodium chloride, represented by the chemical formula NaCl. It is an ionic compound formed from sodium (Na+) and chloride (Cl-) ions in a 1:1 ratio.'
      },
      {
        prompt: 'Which vital organs in the human body are primarily responsible for filtering waste products from the bloodstream?',
        options: [
          'Lungs',
          'Liver',
          'Kidneys',
          'Pancreas'
        ],
        correctAnswer: 2,
        explanation: 'The kidneys filter blood to remove metabolic waste products and excess fluid, producing urine while regulating electrolyte balance and blood pressure.'
      },
      {
        prompt: 'At standard atmospheric pressure at sea level, at what temperature does pure water freeze into ice?',
        options: [
          '0°C (32°F)',
          '10°C (50°F)',
          '-5°C (23°F)',
          '4°C (39.2°F)'
        ],
        correctAnswer: 0,
        explanation: 'Under normal atmospheric pressure (1 atm), the freezing and melting point of pure water is precisely 0 degrees Celsius (32 degrees Fahrenheit).'
      },
      {
        prompt: 'What form of energy does an object possess strictly by virtue of its physical motion?',
        options: [
          'Potential Energy',
          'Kinetic Energy',
          'Thermal Energy',
          'Chemical Energy'
        ],
        correctAnswer: 1,
        explanation: 'Kinetic energy is the energy an object possesses due to its motion, mathematically calculated as KE = 1/2 * m * v² (where m is mass and v is velocity).'
      }
    ]
  }
];

/* ----------------------------------------------------------------------------
   2. LOCAL STORAGE HELPERS
   Safely loads and saves data with try/catch error handling.
   ---------------------------------------------------------------------------- */
const STORAGE_KEYS = {
  CUSTOM_QUIZZES: 'quickquiz_custom_quizzes',
  ATTEMPTS: 'quickquiz_attempts'
};

function safeStorageGet(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (err) {
    console.error(`QuickQuiz: Failed to read from localStorage key "${key}":`, err);
    return fallback;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`QuickQuiz: Failed to write to localStorage key "${key}":`, err);
    return false;
  }
}

/* ----------------------------------------------------------------------------
   3. GLOBAL APPLICATION STATE
   Single source of truth for the entire application.
   ---------------------------------------------------------------------------- */
const AppState = {
  // Navigation
  currentView: 'overview', // 'overview' | 'quiz' | 'results' | 'create' | 'history'
  activeFilter: 'all',

  // Cloud & Local State
  isCloudMode: false,
  cloudQuizzes: [],
  customQuizzes: safeStorageGet(STORAGE_KEYS.CUSTOM_QUIZZES, []),
  attempts: safeStorageGet(STORAGE_KEYS.ATTEMPTS, []),

  // Active Quiz State
  activeQuiz: null,
  /* Schema: {
       quizId: string,
       title: string,
       category: string,
       difficulty: string,
       questions: Array,
       currentIndex: number,
       userAnswers: Array,
       selectedOptionIndex: number | null
     }
  */

  // Creator state
  builderQuestions: [],

  // Pending Modal Targets
  pendingViewChange: null,
  quizToDeleteId: null
};

/* ----------------------------------------------------------------------------
   4. DOM ELEMENT REFERENCES
   Cached for performance and clean organization.
   ---------------------------------------------------------------------------- */
const DOM = {
  // Navigation elements
  sidebar: document.getElementById('sidebar'),
  sidebarBackdrop: document.getElementById('sidebarBackdrop'),
  mobileMenuToggle: document.getElementById('mobileMenuToggle'),
  brandLink: document.getElementById('brandLink'),
  navOverview: document.getElementById('navOverview'),
  navCreate: document.getElementById('navCreate'),
  navHistory: document.getElementById('navHistory'),
  navLinks: document.querySelectorAll('.nav-link'),

  // Views
  viewOverview: document.getElementById('viewOverview'),
  viewQuiz: document.getElementById('viewQuiz'),
  viewResults: document.getElementById('viewResults'),
  viewCreate: document.getElementById('viewCreate'),
  viewHistory: document.getElementById('viewHistory'),

  // Dashboard elements
  btnQuickStart: document.getElementById('btnQuickStart'),
  btnBannerCreate: document.getElementById('btnBannerCreate'),
  statAvailableQuizzes: document.getElementById('statAvailableQuizzes'),
  statCompletedQuizzes: document.getElementById('statCompletedQuizzes'),
  statAverageScore: document.getElementById('statAverageScore'),
  categoryFilters: document.querySelectorAll('.filter-chip'),
  quizGrid: document.getElementById('quizGrid'),

  // Active Quiz elements
  btnExitQuiz: document.getElementById('btnExitQuiz'),
  quizActiveCategory: document.getElementById('quizActiveCategory'),
  quizActiveTitle: document.getElementById('quizActiveTitle'),
  quizQuestionCounter: document.getElementById('quizQuestionCounter'),
  quizProgressFill: document.getElementById('quizProgressFill'),
  questionNumberPill: document.getElementById('questionNumberPill'),
  questionDifficultyPill: document.getElementById('questionDifficultyPill'),
  questionPrompt: document.getElementById('questionPrompt'),
  optionsContainer: document.getElementById('optionsContainer'),
  quizActionTip: document.getElementById('quizActionTip'),
  btnPrevQuestion: document.getElementById('btnPrevQuestion'),
  btnNextQuestion: document.getElementById('btnNextQuestion'),
  btnNextText: document.getElementById('btnNextText'),

  // Results Screen elements
  resultsQuizTitle: document.getElementById('resultsQuizTitle'),
  scoreRingProgress: document.getElementById('scoreRingProgress'),
  scorePercentage: document.getElementById('scorePercentage'),
  scoreRatio: document.getElementById('scoreRatio'),
  performanceTitle: document.getElementById('performanceTitle'),
  performanceDesc: document.getElementById('performanceDesc'),
  resultsCorrectCount: document.getElementById('resultsCorrectCount'),
  resultsIncorrectCount: document.getElementById('resultsIncorrectCount'),
  resultsAccuracy: document.getElementById('resultsAccuracy'),
  btnTryAgain: document.getElementById('btnTryAgain'),
  btnResultsOverview: document.getElementById('btnResultsOverview'),
  reviewList: document.getElementById('reviewList'),

  // Quiz Creator elements
  quizCreatorForm: document.getElementById('quizCreatorForm'),
  createQuizTitle: document.getElementById('createQuizTitle'),
  createQuizCategory: document.getElementById('createQuizCategory'),
  createQuizDifficulty: document.getElementById('createQuizDifficulty'),
  createQuizDescription: document.getElementById('createQuizDescription'),
  btnAddQuestion: document.getElementById('btnAddQuestion'),
  btnResetForm: document.getElementById('btnResetForm'),
  btnCancelCreate: document.getElementById('btnCancelCreate'),
  questionsEditorList: document.getElementById('questionsEditorList'),
  questionCountDisplay: document.getElementById('questionCountDisplay'),

  // History elements
  btnClearHistory: document.getElementById('btnClearHistory'),
  historyTable: document.getElementById('historyTable'),
  historyTableWrapper: document.getElementById('historyTableWrapper'),
  historyTableBody: document.getElementById('historyTableBody'),
  historyEmptyState: document.getElementById('historyEmptyState'),
  btnHistoryExplore: document.getElementById('btnHistoryExplore'),

  // Modals
  modalExitQuiz: document.getElementById('modalExitQuiz'),
  btnModalStay: document.getElementById('btnModalStay'),
  btnModalConfirmExit: document.getElementById('btnModalConfirmExit'),

  modalClearHistory: document.getElementById('modalClearHistory'),
  btnModalCancelClear: document.getElementById('btnModalCancelClear'),
  btnModalConfirmClear: document.getElementById('btnModalConfirmClear'),

  modalDeleteQuiz: document.getElementById('modalDeleteQuiz'),
  modalDeleteQuizPrompt: document.getElementById('modalDeleteQuizPrompt'),
  btnModalCancelDeleteQuiz: document.getElementById('btnModalCancelDeleteQuiz'),
  btnModalConfirmDeleteQuiz: document.getElementById('btnModalConfirmDeleteQuiz'),

  // Toast Container
  toastContainer: document.getElementById('toastContainer')
};

/* ----------------------------------------------------------------------------
   5. VIEW MANAGEMENT & ROUTING
   ---------------------------------------------------------------------------- */
function switchView(viewName, force = false) {
  // If user is inside an active, in-progress quiz and tries to navigate away, prompt confirmation
  if (!force && AppState.activeQuiz && AppState.currentView === 'quiz' && viewName !== 'quiz') {
    AppState.pendingViewChange = viewName;
    openModal(DOM.modalExitQuiz);
    return;
  }

  // Hide all views
  const views = [DOM.viewOverview, DOM.viewQuiz, DOM.viewResults, DOM.viewCreate, DOM.viewHistory];
  views.forEach(v => v.classList.remove('active'));

  // Update active navigation link
  DOM.navLinks.forEach(link => {
    if (link.dataset.view === viewName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Close mobile drawer if open
  closeMobileSidebar();

  // Show target view
  AppState.currentView = viewName;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  switch (viewName) {
    case 'overview':
      DOM.viewOverview.classList.add('active');
      renderDashboard();
      break;
    case 'quiz':
      DOM.viewQuiz.classList.add('active');
      break;
    case 'results':
      DOM.viewResults.classList.add('active');
      break;
    case 'create':
      DOM.viewCreate.classList.add('active');
      break;
    case 'history':
      DOM.viewHistory.classList.add('active');
      renderHistoryView();
      break;
    default:
      DOM.viewOverview.classList.add('active');
      renderDashboard();
  }
}

function openMobileSidebar() {
  DOM.sidebar.classList.add('mobile-open');
  DOM.sidebarBackdrop.classList.add('mobile-open');
  DOM.mobileMenuToggle.setAttribute('aria-expanded', 'true');
}

function closeMobileSidebar() {
  DOM.sidebar.classList.remove('mobile-open');
  DOM.sidebarBackdrop.classList.remove('mobile-open');
  DOM.mobileMenuToggle.setAttribute('aria-expanded', 'false');
}

/* ----------------------------------------------------------------------------
   6. TOAST NOTIFICATIONS & MODALS
   ---------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  } else if (type === 'error') {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
  } else {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `
    <span class="toast-icon">${iconSvg}</span>
    <span class="toast-message">${escapeHtml(message)}</span>
  `;

  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }, 3200);
}

function openModal(modalEl) {
  modalEl.classList.add('active');
  modalEl.setAttribute('aria-hidden', 'false');
  // Auto-focus first button
  const firstBtn = modalEl.querySelector('button');
  if (firstBtn) firstBtn.focus();
}

function closeModal(modalEl) {
  modalEl.classList.remove('active');
  modalEl.setAttribute('aria-hidden', 'true');
}

/* ----------------------------------------------------------------------------
   7. DASHBOARD LOGIC & STATISTICS
   ---------------------------------------------------------------------------- */
function getAllQuizzes() {
  if (AppState.isCloudMode && Array.isArray(AppState.cloudQuizzes) && AppState.cloudQuizzes.length > 0) {
    return AppState.cloudQuizzes;
  }
  return [...DEFAULT_QUIZZES, ...AppState.customQuizzes];
}

function renderDashboard() {
  // Update Live Statistics
  const allQuizzes = getAllQuizzes();
  const completedAttempts = AppState.attempts;

  DOM.statAvailableQuizzes.textContent = allQuizzes.length;
  DOM.statCompletedQuizzes.textContent = completedAttempts.length;

  if (completedAttempts.length === 0) {
    DOM.statAverageScore.textContent = '--';
  } else {
    const totalPercentage = completedAttempts.reduce((acc, curr) => acc + curr.percentage, 0);
    const avg = Math.round(totalPercentage / completedAttempts.length);
    DOM.statAverageScore.textContent = `${avg}%`;
  }

  renderQuizGrid();
}

function renderQuizGrid() {
  const allQuizzes = getAllQuizzes();
  const activeCategory = AppState.activeFilter;

  // Filter quizzes based on active category
  let filteredQuizzes = allQuizzes;
  if (activeCategory === 'custom') {
    filteredQuizzes = allQuizzes.filter(q => {
      const isDef = q.isDefault !== undefined ? q.isDefault : (q.is_default !== undefined ? q.is_default : false);
      return !isDef;
    });
  } else if (activeCategory !== 'all') {
    filteredQuizzes = allQuizzes.filter(q => q.category === activeCategory);
  }

  DOM.quizGrid.innerHTML = '';

  if (filteredQuizzes.length === 0) {
    const emptyNotice = document.createElement('div');
    emptyNotice.className = 'quiz-empty-filter';
    emptyNotice.innerHTML = `
      <p>No quizzes found in this category.</p>
      ${activeCategory === 'custom' 
        ? `<button type="button" class="btn btn-primary btn-sm" id="btnFilterCreate">Create Your First Quiz</button>`
        : `<button type="button" class="btn btn-secondary btn-sm" id="btnFilterReset">View All Quizzes</button>`
      }
    `;
    DOM.quizGrid.appendChild(emptyNotice);

    const btnCreate = document.getElementById('btnFilterCreate');
    if (btnCreate) btnCreate.addEventListener('click', () => switchView('create'));

    const btnReset = document.getElementById('btnFilterReset');
    if (btnReset) btnReset.addEventListener('click', () => {
      AppState.activeFilter = 'all';
      DOM.categoryFilters.forEach(chip => {
        chip.classList.toggle('active', chip.dataset.category === 'all');
      });
      renderQuizGrid();
    });
    return;
  }

  filteredQuizzes.forEach(quiz => {
    const card = document.createElement('article');
    card.className = 'quiz-card';
    card.setAttribute('aria-label', quiz.title);

    // Difficulty style badge
    const diff = quiz.difficulty || 'Medium';
    const diffClass = `badge-${diff.toLowerCase()}`;

    // Custom badge
    const isDefault = quiz.isDefault !== undefined ? quiz.isDefault : (quiz.is_default !== undefined ? quiz.is_default : false);
    const customBadge = !isDefault 
      ? `<span class="badge badge-custom">Custom</span>` 
      : '';

    // Question count handles questions array or question_count number
    const count = (quiz.questions && quiz.questions.length) || quiz.question_count || quiz.questionsCount || 0;

    card.innerHTML = `
      <div class="quiz-card-top">
        <div class="quiz-card-tags">
          <span class="badge badge-category">${escapeHtml(quiz.category)}</span>
          <span class="badge ${diffClass}">${escapeHtml(diff)}</span>
          ${customBadge}
        </div>
        ${!isDefault ? `
          <button type="button" class="btn-icon btn-delete-quiz" data-quiz-id="${quiz.id}" aria-label="Delete custom quiz" title="Delete Quiz">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        ` : ''}
      </div>

      <h3 class="quiz-card-title">${escapeHtml(quiz.title)}</h3>
      <p class="quiz-card-desc">${escapeHtml(quiz.description || 'Test your knowledge on this topic.')}</p>

      <div class="quiz-card-footer">
        <div class="quiz-card-meta">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>${count} Questions</span>
        </div>
        <button type="button" class="btn btn-primary btn-sm btn-start-quiz" data-quiz-id="${quiz.id}">
          <span>Start Quiz</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    `;

    DOM.quizGrid.appendChild(card);
  });

  // Attach Start Quiz events
  DOM.quizGrid.querySelectorAll('.btn-start-quiz').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const quizId = e.currentTarget.dataset.quizId;
      startQuiz(quizId);
    });
  });

  // Attach Delete Quiz events
  DOM.quizGrid.querySelectorAll('.btn-delete-quiz').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const quizId = e.currentTarget.dataset.quizId;
      promptDeleteQuiz(quizId);
    });
  });
}

/* ----------------------------------------------------------------------------
   8. ACTIVE QUIZ EXECUTION & EVALUATION
   ---------------------------------------------------------------------------- */
async function startQuiz(quizId) {
  let targetQuiz = null;

  // In Cloud Mode, fetch quiz questions from Neon
  if (AppState.isCloudMode && window.QuickQuizAPI) {
    try {
      targetQuiz = await window.QuickQuizAPI.getQuizById(quizId);
    } catch (err) {
      console.warn('[QuickQuiz] Could not fetch quiz from cloud, falling back to local list:', err);
    }
  }

  if (!targetQuiz) {
    const allQuizzes = getAllQuizzes();
    targetQuiz = allQuizzes.find(q => q.id === quizId);
  }

  if (!targetQuiz || !targetQuiz.questions || targetQuiz.questions.length === 0) {
    showToast('Unable to start quiz. No questions found.', 'error');
    return;
  }

  // Deep clone questions to avoid mutating state
  const questionsClone = JSON.parse(JSON.stringify(targetQuiz.questions));

  AppState.activeQuiz = {
    quizId: targetQuiz.id,
    title: targetQuiz.title,
    category: targetQuiz.category,
    difficulty: targetQuiz.difficulty,
    questions: questionsClone,
    currentIndex: 0,
    userAnswers: new Array(questionsClone.length).fill(null),
    selectedOptionIndex: null
  };

  switchView('quiz', true);
  renderCurrentQuestion();
}

function renderCurrentQuestion() {
  const quiz = AppState.activeQuiz;
  if (!quiz) return;

  const currentQ = quiz.questions[quiz.currentIndex];
  const totalQuestions = quiz.questions.length;
  const currentNum = quiz.currentIndex + 1;

  // Retrieve existing answer if user navigated back to this question
  const existingAnswer = quiz.userAnswers[quiz.currentIndex];
  quiz.selectedOptionIndex = existingAnswer ? existingAnswer.selectedOption : null;

  // Update top bar info
  DOM.quizActiveTitle.textContent = quiz.title;
  DOM.quizActiveCategory.textContent = quiz.category;
  DOM.quizQuestionCounter.textContent = `Question ${currentNum} of ${totalQuestions}`;

  // Update progress bar
  const progressPercent = Math.round((currentNum / totalQuestions) * 100);
  DOM.quizProgressFill.style.width = `${progressPercent}%`;

  // Question header pills
  DOM.questionNumberPill.textContent = `Question ${currentNum}`;
  DOM.questionDifficultyPill.textContent = quiz.difficulty;
  DOM.questionDifficultyPill.className = `question-difficulty-pill badge-${quiz.difficulty.toLowerCase()}`;

  // Question prompt
  DOM.questionPrompt.textContent = currentQ.prompt;

  // Previous button state (disabled on the very first question)
  if (DOM.btnPrevQuestion) {
    DOM.btnPrevQuestion.disabled = (quiz.currentIndex === 0);
  }

  // Next / Finish button state
  if (quiz.selectedOptionIndex !== null) {
    DOM.btnNextQuestion.disabled = false;
    DOM.quizActionTip.textContent = (currentNum === totalQuestions)
      ? 'Option selected. Click "Finish Quiz" to submit.'
      : 'Option selected. Click "Next Question" to proceed.';
  } else {
    DOM.btnNextQuestion.disabled = true;
    DOM.quizActionTip.textContent = 'Select an option to continue';
  }

  if (currentNum === totalQuestions) {
    DOM.btnNextText.textContent = 'Finish Quiz';
  } else {
    DOM.btnNextText.textContent = 'Next Question';
  }

  // Render Option Cards
  DOM.optionsContainer.innerHTML = '';
  const optionLetters = ['A', 'B', 'C', 'D'];

  currentQ.options.forEach((optText, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.setAttribute('role', 'radio');
    btn.dataset.optionIndex = idx;

    const isSelected = (quiz.selectedOptionIndex === idx);
    if (isSelected) {
      btn.classList.add('selected');
      btn.setAttribute('aria-checked', 'true');
    } else {
      btn.setAttribute('aria-checked', 'false');
    }

    const indicatorSvg = isSelected
      ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>`
      : '';

    btn.innerHTML = `
      <span class="option-letter">${optionLetters[idx]}</span>
      <span class="option-text">${escapeHtml(optText)}</span>
      <span class="option-indicator" aria-hidden="true">${indicatorSvg}</span>
    `;

    btn.addEventListener('click', () => handleOptionSelect(idx));
    DOM.optionsContainer.appendChild(btn);
  });
}

function handleOptionSelect(optionIndex) {
  const quiz = AppState.activeQuiz;
  if (!quiz) return;

  quiz.selectedOptionIndex = optionIndex;
  const currentNum = quiz.currentIndex + 1;
  const totalQuestions = quiz.questions.length;
  const currentQ = quiz.questions[quiz.currentIndex];

  // Store user's selected choice in state
  quiz.userAnswers[quiz.currentIndex] = {
    questionIndex: quiz.currentIndex,
    questionPrompt: currentQ.prompt,
    options: currentQ.options,
    selectedOption: optionIndex,
    correctOption: currentQ.correctAnswer,
    isCorrect: optionIndex === currentQ.correctAnswer,
    explanation: currentQ.explanation || 'No explanation provided.'
  };

  // Update visual selection without revealing correctness
  const allOptionBtns = DOM.optionsContainer.querySelectorAll('.option-btn');
  allOptionBtns.forEach(btn => {
    const idx = parseInt(btn.dataset.optionIndex, 10);
    const isSelected = idx === optionIndex;
    btn.classList.toggle('selected', isSelected);
    btn.setAttribute('aria-checked', isSelected ? 'true' : 'false');

    const indicator = btn.querySelector('.option-indicator');
    if (indicator) {
      indicator.innerHTML = isSelected
        ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>`
        : '';
    }
  });

  // Enable Next Question or Finish button
  DOM.btnNextQuestion.disabled = false;
  if (currentNum === totalQuestions) {
    DOM.quizActionTip.textContent = 'Option selected. Click "Finish Quiz" to submit.';
  } else {
    DOM.quizActionTip.textContent = 'Option selected. Click "Next Question" to proceed.';
  }
}

function handlePrevQuestion() {
  const quiz = AppState.activeQuiz;
  if (!quiz || quiz.currentIndex <= 0) return;

  quiz.currentIndex -= 1;
  renderCurrentQuestion();
}

function handleNextQuestion() {
  const quiz = AppState.activeQuiz;
  if (!quiz || quiz.selectedOptionIndex === null) return;

  if (quiz.currentIndex + 1 < quiz.questions.length) {
    quiz.currentIndex += 1;
    renderCurrentQuestion();
  } else {
    finishQuiz();
  }
}

async function finishQuiz() {
  const quiz = AppState.activeQuiz;
  if (!quiz) return;

  const totalQuestions = quiz.questions.length;
  const validAnswers = quiz.userAnswers.filter(a => a !== null);

  let attempt = null;

  // Cloud Mode: Submit to Neon backend for server-side evaluation & saving
  if (AppState.isCloudMode && window.QuickQuizAPI) {
    try {
      const payloadAnswers = quiz.questions.map((q, idx) => ({
        questionId: q.id,
        questionIndex: idx,
        selectedOption: quiz.userAnswers[idx] ? quiz.userAnswers[idx].selectedOption : -1,
        selectedAnswer: quiz.userAnswers[idx] ? quiz.userAnswers[idx].selectedOption : -1
      }));

      attempt = await window.QuickQuizAPI.submitAttempt(quiz.quizId, payloadAnswers);
    } catch (err) {
      console.warn('[QuickQuiz] Cloud attempt submission failed, using local fallback:', err);
    }
  }

  // Local fallback if cloud request failed or in offline mode
  if (!attempt) {
    const correctCount = validAnswers.filter(a => a.isCorrect).length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    attempt = {
      id: `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      quizId: quiz.quizId,
      quizTitle: quiz.title,
      category: quiz.category,
      difficulty: quiz.difficulty,
      totalQuestions: totalQuestions,
      correctCount: correctCount,
      percentage: percentage,
      completedAt: new Date().toISOString(),
      userAnswers: validAnswers
    };
  }

  // Prepend to attempts array (most recent first)
  AppState.attempts.unshift(attempt);
  safeStorageSet(STORAGE_KEYS.ATTEMPTS, AppState.attempts);

  // Render results
  renderResultsView(attempt);
  switchView('results', true);

  // Reset active quiz
  AppState.activeQuiz = null;
}

/* ----------------------------------------------------------------------------
   9. RESULTS SCREEN & REVIEW
   ---------------------------------------------------------------------------- */
function renderResultsView(attempt) {
  DOM.resultsQuizTitle.textContent = attempt.quizTitle;
  DOM.resultsCorrectCount.textContent = attempt.correctCount;
  DOM.resultsIncorrectCount.textContent = attempt.totalQuestions - attempt.correctCount;
  DOM.resultsAccuracy.textContent = `${attempt.percentage}%`;

  // Circular Score Meter Animation
  // Circumference = 2 * π * 70 ≈ 440
  const circumference = 440;
  const offset = circumference - (attempt.percentage / 100) * circumference;
  
  DOM.scoreRingProgress.style.strokeDashoffset = offset;
  if (attempt.percentage >= 80) {
    DOM.scoreRingProgress.style.stroke = 'var(--success)';
  } else if (attempt.percentage >= 50) {
    DOM.scoreRingProgress.style.stroke = 'var(--warning)';
  } else {
    DOM.scoreRingProgress.style.stroke = 'var(--error)';
  }

  DOM.scorePercentage.textContent = `${attempt.percentage}%`;
  DOM.scoreRatio.textContent = `${attempt.correctCount} of ${attempt.totalQuestions} correct`;

  // Performance Message
  if (attempt.percentage === 100) {
    DOM.performanceTitle.textContent = 'Mastery Achieved! 🎉';
    DOM.performanceDesc.textContent = 'Flawless score! You demonstrated complete mastery of all questions in this quiz.';
  } else if (attempt.percentage >= 80) {
    DOM.performanceTitle.textContent = 'Outstanding Performance! 🌟';
    DOM.performanceDesc.textContent = 'Impressive work! You have a very solid grasp of these core principles.';
  } else if (attempt.percentage >= 60) {
    DOM.performanceTitle.textContent = 'Good Effort! 👍';
    DOM.performanceDesc.textContent = 'Solid foundation! Review the explanations below to turn your weak spots into strengths.';
  } else {
    DOM.performanceTitle.textContent = 'Keep Practicing! 📚';
    DOM.performanceDesc.textContent = 'Learning is an iterative journey. Study the detailed review below and take another run!';
  }

  // Store quizId on Try Again button
  DOM.btnTryAgain.dataset.quizId = attempt.quizId;

  // Render Detailed Question Review
  DOM.reviewList.innerHTML = '';
  const optionLetters = ['A', 'B', 'C', 'D'];

  attempt.userAnswers.forEach((ans, index) => {
    const item = document.createElement('div');
    item.className = `review-item ${ans.isCorrect ? 'review-correct' : 'review-incorrect'}`;

    const statusBadge = ans.isCorrect
      ? `<span class="review-status-pill status-correct">✓ Correct</span>`
      : `<span class="review-status-pill status-incorrect">✕ Incorrect</span>`;

    let optionsMarkup = '';
    ans.options.forEach((optText, optIdx) => {
      let optClass = 'review-option';
      let tag = '';

      if (optIdx === ans.correctOption) {
        optClass += ' is-correct-answer';
        tag = '<span class="badge badge-easy">Correct Answer</span>';
      }
      if (optIdx === ans.selectedOption && !ans.isCorrect) {
        optClass += ' is-user-answer';
        tag = '<span class="badge badge-hard">Your Choice</span>';
      } else if (optIdx === ans.selectedOption && ans.isCorrect) {
        tag = '<span class="badge badge-easy">Your Choice</span>';
      }

      optionsMarkup += `
        <div class="${optClass}">
          <span><strong>${optionLetters[optIdx]}.</strong> ${escapeHtml(optText)}</span>
          ${tag}
        </div>
      `;
    });

    item.innerHTML = `
      <div class="review-item-header">
        <span class="review-q-num">Question ${index + 1}</span>
        ${statusBadge}
      </div>
      <h4 class="review-question-text">${escapeHtml(ans.questionPrompt)}</h4>
      <div class="review-options">
        ${optionsMarkup}
      </div>
      <div class="review-explanation">
        <strong>Explanation:</strong>
        ${escapeHtml(ans.explanation)}
      </div>
    `;

    DOM.reviewList.appendChild(item);
  });
}

/* ----------------------------------------------------------------------------
   10. CUSTOM QUIZ CREATOR LOGIC
   Dynamic question builder (1-10 questions), full input validation, and saving.
   ---------------------------------------------------------------------------- */
function initQuizCreator() {
  // Start with 1 clean question draft
  AppState.builderQuestions = [createEmptyQuestionDraft()];
  renderBuilderQuestions();
}

function createEmptyQuestionDraft() {
  return {
    id: `draft_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    prompt: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: ''
  };
}

function renderBuilderQuestions() {
  DOM.questionsEditorList.innerHTML = '';
  const total = AppState.builderQuestions.length;
  DOM.questionCountDisplay.textContent = total;

  // Disable add button if already 10 questions
  DOM.btnAddQuestion.disabled = total >= 10;

  AppState.builderQuestions.forEach((qDraft, qIndex) => {
    const card = document.createElement('div');
    card.className = 'question-builder-card';
    card.dataset.draftIndex = qIndex;

    card.innerHTML = `
      <div class="question-builder-header">
        <span class="question-builder-index">
          <span class="question-builder-index-num">${qIndex + 1}</span>
          Question ${qIndex + 1} of ${total}
        </span>
        ${total > 1 ? `
          <button type="button" class="btn btn-ghost btn-sm btn-remove-question" data-draft-index="${qIndex}" aria-label="Remove Question">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            <span>Remove</span>
          </button>
        ` : ''}
      </div>

      <div class="form-group" style="margin-bottom: 1.25rem;">
        <label class="form-label" for="qPrompt_${qIndex}">Question Prompt <span class="required">*</span></label>
        <input type="text" id="qPrompt_${qIndex}" class="form-control question-input-prompt" placeholder="e.g. Which HTML element specifies a header for a document?" value="${escapeHtml(qDraft.prompt)}" required>
      </div>

      <div class="form-label" style="margin-bottom: 0.5rem;">Answer Options (select the radio button beside the correct answer) <span class="required">*</span></div>
      
      <div class="options-builder-container">
        ${['A', 'B', 'C', 'D'].map((letter, optIdx) => `
          <div class="option-builder-row">
            <label class="option-radio-label" title="Mark as correct answer">
              <input type="radio" name="correct_answer_${qIndex}" class="option-radio-input" value="${optIdx}" ${qDraft.correctAnswer === optIdx ? 'checked' : ''} required>
            </label>
            <span class="option-letter-badge">${letter}</span>
            <input type="text" class="form-control option-input-field" data-opt-index="${optIdx}" placeholder="Option ${letter} text..." value="${escapeHtml(qDraft.options[optIdx])}" required>
          </div>
        `).join('')}
      </div>

      <div class="form-group" style="margin-top: 1rem;">
        <label class="form-label" for="qExpl_${qIndex}">Explanation (optional, shown during answer review)</label>
        <textarea id="qExpl_${qIndex}" class="form-control question-input-explanation" rows="2" placeholder="Explain why the selected option is correct...">${escapeHtml(qDraft.explanation)}</textarea>
      </div>
    `;

    DOM.questionsEditorList.appendChild(card);
  });

  // Attach event listeners for real-time model syncing
  attachBuilderEventListeners();
}

function attachBuilderEventListeners() {
  const cards = DOM.questionsEditorList.querySelectorAll('.question-builder-card');

  cards.forEach(card => {
    const qIndex = parseInt(card.dataset.draftIndex, 10);
    const draft = AppState.builderQuestions[qIndex];
    if (!draft) return;

    // Prompt sync
    const promptInput = card.querySelector('.question-input-prompt');
    promptInput.addEventListener('input', (e) => {
      draft.prompt = e.target.value;
      promptInput.classList.remove('is-invalid');
    });

    // Options sync
    const optInputs = card.querySelectorAll('.option-input-field');
    optInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        const optIdx = parseInt(e.target.dataset.optIndex, 10);
        draft.options[optIdx] = e.target.value;
        input.classList.remove('is-invalid');
      });
    });

    // Correct radio sync
    const radioInputs = card.querySelectorAll('.option-radio-input');
    radioInputs.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          draft.correctAnswer = parseInt(e.target.value, 10);
        }
      });
    });

    // Explanation sync
    const explInput = card.querySelector('.question-input-explanation');
    explInput.addEventListener('input', (e) => {
      draft.explanation = e.target.value;
    });

    // Remove button
    const removeBtn = card.querySelector('.btn-remove-question');
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        if (AppState.builderQuestions.length <= 1) {
          showToast('A quiz must contain at least one question.', 'error');
          return;
        }
        AppState.builderQuestions.splice(qIndex, 1);
        renderBuilderQuestions();
      });
    }
  });
}

function handleAddQuestion() {
  if (AppState.builderQuestions.length >= 10) {
    showToast('A quiz cannot have more than 10 questions.', 'error');
    return;
  }
  AppState.builderQuestions.push(createEmptyQuestionDraft());
  renderBuilderQuestions();

  // Scroll to new question card smoothly
  const cards = DOM.questionsEditorList.querySelectorAll('.question-builder-card');
  if (cards.length > 0) {
    cards[cards.length - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

async function handleSaveCustomQuiz(e) {
  e.preventDefault();

  const title = DOM.createQuizTitle.value.trim();
  const category = DOM.createQuizCategory.value;
  const difficulty = DOM.createQuizDifficulty.value;
  const description = DOM.createQuizDescription.value.trim();

  // Validate Quiz Meta
  if (!title) {
    showToast('Please provide a quiz title.', 'error');
    DOM.createQuizTitle.focus();
    DOM.createQuizTitle.classList.add('is-invalid');
    return;
  }

  if (!category) {
    showToast('Please choose a quiz category.', 'error');
    DOM.createQuizCategory.focus();
    DOM.createQuizCategory.classList.add('is-invalid');
    return;
  }

  if (!description) {
    showToast('Please provide a short description.', 'error');
    DOM.createQuizDescription.focus();
    DOM.createQuizDescription.classList.add('is-invalid');
    return;
  }

  // Validate Questions
  if (AppState.builderQuestions.length === 0) {
    showToast('A quiz must have at least one question.', 'error');
    return;
  }

  for (let i = 0; i < AppState.builderQuestions.length; i++) {
    const q = AppState.builderQuestions[i];
    const qNum = i + 1;

    if (!q.prompt.trim()) {
      showToast(`Question ${qNum} is missing its question prompt.`, 'error');
      const input = document.getElementById(`qPrompt_${i}`);
      if (input) {
        input.focus();
        input.classList.add('is-invalid');
      }
      return;
    }

    for (let o = 0; o < 4; o++) {
      if (!q.options[o] || !q.options[o].trim()) {
        showToast(`Question ${qNum} is missing Option ${['A', 'B', 'C', 'D'][o]}. All 4 options are required.`, 'error');
        const card = DOM.questionsEditorList.children[i];
        if (card) {
          const optField = card.querySelector(`[data-opt-index="${o}"]`);
          if (optField) {
            optField.focus();
            optField.classList.add('is-invalid');
          }
        }
        return;
      }
    }

    if (q.correctAnswer === null || q.correctAnswer === undefined || q.correctAnswer < 0 || q.correctAnswer > 3) {
      showToast(`Question ${qNum} requires a designated correct answer.`, 'error');
      return;
    }
  }

  // Build Quiz Object
  const newQuiz = {
    title: title,
    category: category,
    difficulty: difficulty,
    description: description,
    questions: AppState.builderQuestions.map(q => ({
      prompt: q.prompt.trim(),
      options: q.options.map(opt => opt.trim()),
      correctAnswer: q.correctAnswer,
      explanation: q.explanation.trim() || 'No additional explanation provided.'
    }))
  };

  // If connected to Neon Cloud: persist directly to database
  if (AppState.isCloudMode && window.QuickQuizAPI) {
    try {
      await window.QuickQuizAPI.createQuiz(newQuiz);
      showToast(`Quiz "${newQuiz.title}" saved to Neon Cloud!`, 'success');
      await refreshCloudData();
      resetQuizCreatorForm();
      switchView('overview');
      return;
    } catch (err) {
      console.warn('[QuickQuiz] Cloud save failed, saving locally as fallback:', err);
      showToast('Cloud save failed; saved locally as fallback.', 'info');
    }
  }

  // Local Storage Fallback
  newQuiz.id = `quiz_custom_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  newQuiz.isDefault = false;
  AppState.customQuizzes.unshift(newQuiz);
  safeStorageSet(STORAGE_KEYS.CUSTOM_QUIZZES, AppState.customQuizzes);

  showToast(`Quiz "${newQuiz.title}" created successfully!`, 'success');

  // Reset creator form
  resetQuizCreatorForm();

  // Navigate to Overview to see custom quiz immediately
  switchView('overview');
}

function resetQuizCreatorForm() {
  DOM.quizCreatorForm.reset();
  DOM.createQuizDifficulty.value = 'Medium';
  AppState.builderQuestions = [createEmptyQuestionDraft()];
  renderBuilderQuestions();
}

function promptDeleteQuiz(quizId) {
  const all = getAllQuizzes();
  const quiz = all.find(q => q.id === quizId);
  if (!quiz) return;

  AppState.quizToDeleteId = quizId;
  DOM.modalDeleteQuizPrompt.textContent = `Are you sure you want to permanently delete "${quiz.title}"? This cannot be undone.`;
  openModal(DOM.modalDeleteQuiz);
}

async function confirmDeleteQuiz() {
  if (!AppState.quizToDeleteId) return;

  const quizId = AppState.quizToDeleteId;

  if (AppState.isCloudMode && window.QuickQuizAPI) {
    try {
      await window.QuickQuizAPI.deleteQuiz(quizId);
      AppState.cloudQuizzes = AppState.cloudQuizzes.filter(q => q.id !== quizId);
      closeModal(DOM.modalDeleteQuiz);
      AppState.quizToDeleteId = null;
      showToast('Custom quiz deleted from Neon cloud.', 'info');
      renderDashboard();
      return;
    } catch (err) {
      console.warn('[QuickQuiz] Cloud quiz deletion failed, trying local:', err);
    }
  }

  // Local fallback
  AppState.customQuizzes = AppState.customQuizzes.filter(q => q.id !== quizId);
  safeStorageSet(STORAGE_KEYS.CUSTOM_QUIZZES, AppState.customQuizzes);

  closeModal(DOM.modalDeleteQuiz);
  AppState.quizToDeleteId = null;

  showToast('Custom quiz deleted.', 'info');
  renderDashboard();
}

/* ----------------------------------------------------------------------------
   11. RESULTS HISTORY (MY RESULTS)
   ---------------------------------------------------------------------------- */
function renderHistoryView() {
  const attempts = AppState.attempts;
  const hasHistory = attempts && attempts.length > 0;

  DOM.btnClearHistory.disabled = !hasHistory;

  if (!hasHistory) {
    DOM.historyTableWrapper.style.display = 'none';
    DOM.historyEmptyState.style.display = 'flex';
    return;
  }

  DOM.historyTableWrapper.style.display = 'block';
  DOM.historyEmptyState.style.display = 'none';
  DOM.historyTableBody.innerHTML = '';

  attempts.forEach(att => {
    const tr = document.createElement('tr');

    // Date formatting
    const dateObj = new Date(att.completedAt);
    const dateFormatted = !isNaN(dateObj.getTime())
      ? dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' +
        dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
      : 'Recent';

    // Score pill style
    let scoreClass = 'score-low';
    if (att.percentage >= 80) scoreClass = 'score-high';
    else if (att.percentage >= 50) scoreClass = 'score-mid';

    tr.innerHTML = `
      <td>
        <div class="history-quiz-title">${escapeHtml(att.quizTitle)}</div>
      </td>
      <td>
        <span class="badge badge-category">${escapeHtml(att.category)}</span>
      </td>
      <td>
        <span class="history-date">${dateFormatted}</span>
      </td>
      <td>
        <strong>${att.correctCount} / ${att.totalQuestions}</strong>
      </td>
      <td>
        <span class="history-score-pill ${scoreClass}">${att.percentage}%</span>
      </td>
      <td>
        <button type="button" class="btn btn-secondary btn-sm btn-retake-quiz" data-quiz-id="${att.quizId}">
          <span>Retake</span>
        </button>
      </td>
    `;

    DOM.historyTableBody.appendChild(tr);
  });

  // Retake listeners
  DOM.historyTableBody.querySelectorAll('.btn-retake-quiz').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const quizId = e.currentTarget.dataset.quizId;
      startQuiz(quizId);
    });
  });
}

async function clearAllHistory() {
  if (AppState.isCloudMode && window.QuickQuizAPI) {
    try {
      await window.QuickQuizAPI.clearAttempts();
    } catch (err) {
      console.warn('[QuickQuiz] Could not clear cloud attempts:', err);
    }
  }

  AppState.attempts = [];
  safeStorageSet(STORAGE_KEYS.ATTEMPTS, []);
  closeModal(DOM.modalClearHistory);
  showToast('Quiz history cleared successfully.', 'info');
  renderHistoryView();
  renderDashboard();
}

/* ----------------------------------------------------------------------------
   12. UTILITY FUNCTIONS
   ---------------------------------------------------------------------------- */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ----------------------------------------------------------------------------
   13. EVENT LISTENERS INITIALIZATION
   ---------------------------------------------------------------------------- */
function setupEventListeners() {
  // Navigation Links
  DOM.navOverview.addEventListener('click', () => switchView('overview'));
  DOM.navCreate.addEventListener('click', () => switchView('create'));
  DOM.navHistory.addEventListener('click', () => switchView('history'));
  DOM.brandLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('overview');
  });

  // Mobile Menu Controls
  DOM.mobileMenuToggle.addEventListener('click', () => {
    const isOpen = DOM.sidebar.classList.contains('mobile-open');
    if (isOpen) closeMobileSidebar();
    else openMobileSidebar();
  });
  DOM.sidebarBackdrop.addEventListener('click', closeMobileSidebar);

  // Overview Action Buttons
  DOM.btnQuickStart.addEventListener('click', () => {
    const all = getAllQuizzes();
    if (all.length > 0) {
      startQuiz(all[0].id);
    }
  });
  DOM.btnBannerCreate.addEventListener('click', () => switchView('create'));

  // Category Filter Chips
  DOM.categoryFilters.forEach(chip => {
    chip.addEventListener('click', () => {
      DOM.categoryFilters.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');
      AppState.activeFilter = chip.dataset.category;
      renderQuizGrid();
    });
  });

  // Active Quiz Actions
  DOM.btnExitQuiz.addEventListener('click', () => {
    AppState.pendingViewChange = 'overview';
    openModal(DOM.modalExitQuiz);
  });
  if (DOM.btnPrevQuestion) {
    DOM.btnPrevQuestion.addEventListener('click', handlePrevQuestion);
  }
  DOM.btnNextQuestion.addEventListener('click', handleNextQuestion);

  // Exit Quiz Modal Controls
  DOM.btnModalStay.addEventListener('click', () => {
    closeModal(DOM.modalExitQuiz);
    AppState.pendingViewChange = null;
  });
  DOM.btnModalConfirmExit.addEventListener('click', () => {
    closeModal(DOM.modalExitQuiz);
    const target = AppState.pendingViewChange || 'overview';
    AppState.activeQuiz = null;
    AppState.pendingViewChange = null;
    switchView(target, true);
  });

  // Results Actions
  DOM.btnTryAgain.addEventListener('click', () => {
    const quizId = DOM.btnTryAgain.dataset.quizId;
    if (quizId) startQuiz(quizId);
  });
  DOM.btnResultsOverview.addEventListener('click', () => switchView('overview'));

  // Creator Actions
  DOM.btnAddQuestion.addEventListener('click', handleAddQuestion);
  DOM.quizCreatorForm.addEventListener('submit', handleSaveCustomQuiz);
  DOM.btnResetForm.addEventListener('click', resetQuizCreatorForm);
  DOM.btnCancelCreate.addEventListener('click', () => switchView('overview'));

  // Delete Custom Quiz Modal Controls
  DOM.btnModalCancelDeleteQuiz.addEventListener('click', () => {
    closeModal(DOM.modalDeleteQuiz);
    AppState.quizToDeleteId = null;
  });
  DOM.btnModalConfirmDeleteQuiz.addEventListener('click', confirmDeleteQuiz);

  // History Actions
  DOM.btnClearHistory.addEventListener('click', () => openModal(DOM.modalClearHistory));
  DOM.btnModalCancelClear.addEventListener('click', () => closeModal(DOM.modalClearHistory));
  DOM.btnModalConfirmClear.addEventListener('click', clearAllHistory);
  DOM.btnHistoryExplore.addEventListener('click', () => switchView('overview'));

  // Keyboard accessibility: Escape closes any open modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [DOM.modalExitQuiz, DOM.modalClearHistory, DOM.modalDeleteQuiz].forEach(modal => {
        if (modal.classList.contains('active')) closeModal(modal);
      });
      if (DOM.sidebar.classList.contains('mobile-open')) closeMobileSidebar();
    }
  });
}

/* ----------------------------------------------------------------------------
   14. APPLICATION BOOTSTRAP & CLOUD SYNCHRONIZATION
   ---------------------------------------------------------------------------- */
async function initApp() {
  setupEventListeners();
  initQuizCreator();
  renderDashboard();

  // Connect to Neon Cloud Backend via QuickQuizAPI
  if (typeof window !== 'undefined' && window.QuickQuizAPI) {
    try {
      const health = await window.QuickQuizAPI.checkHealth();
      if (health && health.database && health.database.connected) {
        AppState.isCloudMode = true;
        updateCloudStatusBadge(true, 'Neon Cloud');
        await refreshCloudData();
      } else {
        updateCloudStatusBadge(false, 'Local Storage');
      }
    } catch (err) {
      console.log('[QuickQuiz] Operating in local storage mode:', err.message);
      updateCloudStatusBadge(false, 'Local Storage');
    }
  }
}

async function refreshCloudData() {
  if (!window.QuickQuizAPI) return;
  try {
    const [quizzes, attempts] = await Promise.all([
      window.QuickQuizAPI.getQuizzes(),
      window.QuickQuizAPI.getAttempts()
    ]);
    if (Array.isArray(quizzes) && quizzes.length > 0) {
      AppState.cloudQuizzes = quizzes;
    }
    if (Array.isArray(attempts)) {
      AppState.attempts = attempts;
      safeStorageSet(STORAGE_KEYS.ATTEMPTS, AppState.attempts);
    }
    renderDashboard();
    if (AppState.currentView === 'history') {
      renderHistoryView();
    }
  } catch (err) {
    console.warn('[QuickQuiz] Could not refresh cloud data:', err);
  }
}

function updateCloudStatusBadge(connected, label) {
  if (typeof document === 'undefined') return;
  const badge = document.getElementById('cloudStatusBadge');
  if (badge) {
    if (connected) {
      badge.textContent = `● ${label}`;
      badge.style.color = '#10B981';
      badge.title = 'Connected to Neon PostgreSQL Cloud Database';
    } else {
      badge.textContent = `○ ${label}`;
      badge.style.color = 'var(--text-muted)';
      badge.title = 'Operating in offline browser storage mode';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
