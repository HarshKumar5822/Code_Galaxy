# 🌌 CodeGalaxy - MERN Stack Project
### A Gamified & Visual Way to Learn Programming

## 🚀 About CodeGalaxy

Programming is often hard for beginners because they cannot *see* what is happening behind the code.  
Concepts like loops, data structures, pointers, and algorithms feel confusing when learned only through textbooks or static examples.

**CodeGalaxy** solves this problem by providing a **visual, interactive, and game-based learning platform** where students write code and instantly see **step-by-step execution animations**.

It helps learners understand *how* code works, not just *what* to write.

## 🎮 What Makes CodeGalaxy Special?

- 🎯 **Gamified Learning** – Learn coding like playing a game with levels and challenges  
- 👀 **Live Code Visualization** – Watch loops, nodes, pointers, and algorithms work in real time  
- 🧠 **Strong Fundamentals** – Clear understanding of program flow and logic  
- 🌐 **Multi-Language Support** – Practice the same problem in **Java, Python, or JavaScript**  
- 📊 **Progress Tracking** – Track completed challenges and learning growth  
- 👶 **Beginner Friendly** – Simple UI, easy explanations, smooth animations  

## 🛠️ Tech Stack (MERN)

### Frontend
- React.js (Vite)
- HTML, CSS, JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- REST APIs

## 📁 Project Structure (Monorepo)


## Structure
- **`/frontend`**: React + Vite application (The User Interface).
- **`/backend`**: Node.js + Express + MongoDB application (The API).

## How to Run

You need to run **both** the frontend and backend servers simultaneously for the full application to work.

### 1. Start the Backend
The backend runs on `http://localhost:5000`.

1.  Open a terminal.
2.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
3.  Install dependencies (if new):
    ```bash
    npm install
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```

### 2. Start the Frontend
The frontend runs on `http://localhost:5173` (usually).

1.  Open a **new** terminal (keep the backend running).
2.  Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
3.  Install dependencies (if new):
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

## API Documentation
See `backend/server.js` and route files for API details.
- Auth: `/api/auth`
- Challenges: `/api/challenges`
- Progress: `/api/progress`

