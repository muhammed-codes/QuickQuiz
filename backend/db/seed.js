/**
 * ============================================================================
 * QuickQuiz — Database Seeder Script
 * Seeds the 3 default curriculum quizzes into Neon PostgreSQL
 * ============================================================================
 */

const { query, getClient } = require('../config/db');

const SEED_QUIZZES = [
  {
    id: 'quiz_web_dev_basics',
    title: 'Web Development Basics',
    category: 'Web Development',
    difficulty: 'Easy',
    description: 'Master the fundamental building blocks of modern web engineering: HTML, CSS, JavaScript, and protocols.',
    is_default: true,
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
    is_default: true,
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
    is_default: true,
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

async function seedDatabase() {
  console.log('[QuickQuiz Seed] Seeding default curriculum into Neon...');
  const client = await getClient();

  try {
    await client.query('BEGIN');

    for (const quiz of SEED_QUIZZES) {
      // Check if quiz already exists
      const existing = await client.query('SELECT id FROM quizzes WHERE id = $1', [quiz.id]);
      if (existing.rowCount > 0) {
        console.log(`[QuickQuiz Seed] Quiz "${quiz.title}" already exists, skipping.`);
        continue;
      }

      await client.query(
        `INSERT INTO quizzes (id, title, category, difficulty, description, is_default)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [quiz.id, quiz.title, quiz.category, quiz.difficulty, quiz.description, true]
      );

      for (let i = 0; i < quiz.questions.length; i++) {
        const q = quiz.questions[i];
        await client.query(
          `INSERT INTO questions (quiz_id, question_text, options, correct_answer, explanation, question_order)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [quiz.id, q.prompt, JSON.stringify(q.options), q.correctAnswer, q.explanation, i + 1]
        );
      }
      console.log(`[QuickQuiz Seed] Seeded: "${quiz.title}" (${quiz.questions.length} questions).`);
    }

    await client.query('COMMIT');
    console.log('[QuickQuiz Seed] Seeding completed successfully.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[QuickQuiz Seed] Error during seeding:', err.message);
    throw err;
  } finally {
    client.release();
  }
}

if (require.main === module) {
  seedDatabase().then(() => process.exit(0)).catch(() => process.exit(1));
}

module.exports = { seedDatabase, SEED_QUIZZES };
