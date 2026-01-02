# CodeGalaxy - MERN Stack Project

This project has been restructured into a monorepo-style layout.

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
