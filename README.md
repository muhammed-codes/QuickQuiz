# QuickQuiz — Modern SaaS Quiz Platform

QuickQuiz is a polished, production-grade educational quiz application designed with a modern SaaS aesthetic. It allows users to challenge their knowledge through curated decks, build custom interactive multiple-choice quizzes, review granular answer explanations, and track learning analytics over time.

Built strictly using vanilla **HTML5**, **CSS3**, and **JavaScript (ES6+)**, QuickQuiz requires no build tools, no external frameworks, and no backend server. All state and records persist seamlessly across sessions using the browser's native `localStorage` API.

---

## 🌟 Key Features

### 1. Modern SaaS Interface & Dashboard
- **Brand Identity**: Refined purple palette (`#635BDB`) paired with subtle lavender surfaces (`#F8F9FD`, `#F0EEFC`) and crisp typography (`DM Sans` & `Plus Jakarta Sans`).
- **Real-Time Analytics**:
  - **Available Quizzes**: Total count of active default and custom quiz decks.
  - **Completed Quizzes**: Live counter of completed quiz attempts.
  - **Average Score**: Calculated percentage accuracy aggregated across all attempts.
- **Category Filtering**: Quickly filter decks by *All*, *Web Development*, *General Knowledge*, *Science*, or *Custom*.

### 2. Interactive Quiz Engine
- **Single Question Focus**: Displays one question at a time with clean, accessible option cards (A, B, C, D).
- **Progress Tracking**: Real-time progress bar and counter (`Question X of Y`).
- **Unbiased Assessment Flow**:
  - Selecting an option highlights your choice with a clean active state without prematurely revealing answers during the test.
  - Users can change their selection before moving to the next question.
  - The "Next Question" button advances through questions and changes to "Finish Quiz" on the final question.
- **Accurate State Storage**: Preserves all answer choices in runtime state before finalizing results.
- **Exit Protection**: Confirmation modal prevents accidental loss of in-progress quiz attempts.

### 3. Rich Results & Review Suite
- **Circular Score Meter**: Animated SVG ring indicating exact percentage and fractional score (e.g. `4 of 5 correct`).
- **Dynamic Performance Assessment**: Contextual accolades based on score tiers (*Mastery Achieved*, *Outstanding Performance*, *Good Effort*, *Keep Practicing*).
- **Granular Answer Review**: Complete question-by-question breakdown showing:
  - Original question prompt.
  - User's selected choice.
  - Correct answer.
  - Full explanatory notes.
- **Quick Actions**: One-click "Try Again" to retake the current quiz or "Back to Overview".

### 4. Custom Quiz Creator
- **Custom Authoring**: Create personalized decks with 1 to 10 questions.
- **Configurable Metadata**: Title, Category, Difficulty (*Easy*, *Medium*, *Hard*), and description.
- **Intuitive Question Builder**:
  - Add/remove questions dynamically.
  - 4 answer options per question with single-select radio button designating the correct choice.
  - Optional custom explanation field.
- **Robust Client Validation**: Real-time validation checks for missing prompts, blank options, or unassigned correct answers with helpful toast alerts.
- **Immediate Availability**: Newly authored quizzes immediately appear on the dashboard with a "Custom" badge and can be deleted at any time.

### 5. Historical Performance Tracking ("My Results")
- **Persistent Attempt Log**: Chronological list of completed quizzes with date/time, score fraction, and percentage pills.
- **One-Click Retake**: Retake any previously attempted quiz directly from the history table.
- **Clear History**: Safely erase historical records with an explicit confirmation dialog, automatically updating dashboard statistics.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Markup** | HTML5 | Semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`), ARIA attributes |
| **Styling** | CSS3 | Custom CSS properties (variables), Flexbox, CSS Grid, smooth transitions, zero frameworks |
| **Scripting** | Vanilla JavaScript | ES6+ syntax, modular function structure, state management, zero dependencies |
| **Persistence** | Browser `localStorage` | Fault-tolerant JSON serialization with `try/catch` fallbacks |
| **Typography** | Google Fonts | `DM Sans` (body text) and `Plus Jakarta Sans` (headings and badges) |

---

## 📦 Project Structure

```text
QuickQuiz/
├── index.html        # Semantic HTML layout and view containers
├── style.css         # Modern SaaS CSS design system & responsive layout
├── script.js         # State management, quiz engine, creator, and storage logic
└── README.md         # Documentation, architecture, and deployment guide
```

---

## 🚀 How to Run Locally

Because QuickQuiz has zero dependencies and requires no compilation step, you can run it using any of the following methods:

### Method 1: Direct File Execution (Simplest)
1. Navigate to the project directory:
   ```bash
   cd c:\Users\bomao\Desktop\QuickQuiz
   ```
2. Double-click `index.html` or open it with your favorite web browser (Chrome, Edge, Firefox, Safari, Brave):
   ```bash
   start index.html
   ```

### Method 2: VS Code Live Server
1. Open the `QuickQuiz` folder in Visual Studio Code.
2. Install the **Live Server** extension by Ritwick Dey (if not already installed).
3. Right-click `index.html` and select **"Open with Live Server"**.
4. The application will launch at `http://127.0.0.1:5500/index.html` with hot-reloading.

### Method 3: Python Built-In HTTP Server
If Python is installed on your machine:
```bash
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

### Method 4: Node.js HTTP Server
If Node.js is installed:
```bash
npx serve .
```
Or start a simple Node server:
```bash
node -e "const http=require('http'),fs=require('fs');http.createServer((req,res)=>{const p=req.url==='/'?'/index.html':req.url;fs.readFile('.'+p,(err,d)=>{if(err){res.writeHead(404);res.end();}else{res.writeHead(200);res.end(d);}})}).listen(3000,()=>console.log('http://localhost:3000'));"
```

---

## 💾 How Data Persistence (localStorage) Works

QuickQuiz uses the browser's native `window.localStorage` to store data locally on the user's device. No data is ever transmitted to an external server.

### Storage Keys

1. **`quickquiz_custom_quizzes`**:
   - Stores user-created custom quizzes as a JSON array of quiz objects.
   - Example schema:
     ```json
     [
       {
         "id": "quiz_custom_1700000000_abc12",
         "title": "Modern JavaScript ES6+",
         "category": "Technology",
         "difficulty": "Medium",
         "description": "Deep dive into arrow functions, destructuring, and promises.",
         "isDefault": false,
         "questions": [
           {
             "prompt": "What does Promise.all() do?",
             "options": ["Rejects all promises", "Resolves when all promises resolve", "Runs sequentially", "Times out"],
             "correctAnswer": 1,
             "explanation": "Promise.all fulfills when every promise in the iterable fulfills."
           }
         ]
       }
     ]
     ```

2. **`quickquiz_attempts`**:
   - Stores completed quiz attempts in reverse-chronological order (newest first).
   - Example schema:
     ```json
     [
       {
         "id": "attempt_1700000000_xyz89",
         "quizId": "quiz_web_dev_basics",
         "quizTitle": "Web Development Basics",
         "category": "Web Development",
         "difficulty": "Easy",
         "totalQuestions": 5,
         "correctCount": 4,
         "percentage": 80,
         "completedAt": "2026-11-23T20:07:00.000Z",
         "userAnswers": [ ... ]
       }
     ]
     ```

### Safe Persistence Guarantee
- **No Overwriting**: Default sample quizzes are maintained in code and combined with stored custom quizzes at runtime.
- **No Duplication**: Default quizzes are never redundantly written into `localStorage`.
- **Error Handling**: All `localStorage.getItem` and `localStorage.setItem` calls are wrapped in `try/catch` routines to handle storage quotas, private browsing mode restrictions, or corrupted JSON gracefully.

---

## 🌐 Deployment Instructions

QuickQuiz is 100% static and can be deployed in seconds to any static hosting provider.

### Deploying to Netlify

#### Option A: Drag-and-Drop (Fastest, No Git required)
1. Log in to [Netlify](https://app.netlify.com/).
2. Go to the **"Sites"** tab.
3. Drag and drop the `QuickQuiz` directory into the drop target area labeled **"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"**.
4. Netlify will instantly provide a live production URL (e.g., `https://zen-quickquiz-12345.netlify.app`).

#### Option B: GitHub + Netlify Git Integration
1. Push the project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of QuickQuiz application"
   git remote add origin https://github.com/your-username/quickquiz.git
   git push -u origin main
   ```
2. In Netlify, click **"Add new site" > "Import an existing project"**.
3. Select **GitHub** and authorize your repository.
4. Leave the **Build command** empty and set the **Publish directory** to `.` (root).
5. Click **"Deploy Site"**. Any future commits to `main` will automatically trigger continuous deployments.

### Deploying to GitHub Pages
1. Push your repository to GitHub.
2. In your repository settings, go to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **Deploy from a branch**.
4. Set the branch to `main` and folder to `/ (root)`.
5. Click **Save**. Within 1–2 minutes, your site will be live at `https://your-username.github.io/quickquiz/`.

---

## ⚠️ Known Limitations

1. **Client-Side Storage**: Quiz history and custom quizzes are bound to the specific browser and device where they were created. They do not synchronize across different devices or browsers.
2. **Private/Incognito Browsing**: In private browsing mode, some browsers purge `localStorage` when the window or tab is closed.
3. **No Multi-User Authentication**: The application does not require user accounts; it operates as an instant, zero-friction single-user local tool.

---

## 📄 License
MIT License. Free to use, modify, and distribute for educational and commercial purposes.
