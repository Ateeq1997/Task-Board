# 🧠 Real-Time Collaborative Task Board

A Trello-style real-time task board built with **Next.js**, **Socket.io**, and **React Context API**. Multiple users can collaboratively create, move, and edit cards across columns — updates appear in real-time across all connected clients.

---

## 🚀 Features

- 📝 Create, edit, and move cards between columns
- 🔄 Real-time sync across multiple clients (WebSocket-based)
- ⚡ Optimistic UI updates with rollback on failure
- ⚙️ Server-side rendering (SSR) for fast initial load
- 🧩 Dynamic import of socket logic for better performance
- 📦 In-memory persistent storage (shared state on server)
- 🧠 Modular architecture with React Context and custom hooks
- 🎨 Clean UI using Tailwind CSS
- 💡 Component-based design: `Board`, `Column`, `Card`, `Modal`

---

## 📁 Tech Stack

- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Next.js API Routes, Socket.io (WebSocket)
- **State Management:** React Context API + custom `useSocket` hook
- **Storage:** In-memory (via shared Node.js module)

---
📂 Folder Structure

├── components/

│   ├── Board.js

│   ├── Column.js

│   ├── Modal.js

├── context/

│   └── BoardContext.js

├── hooks/

│   └── useSocket.js

├── lib/

│   └── storage.js

├── pages/

│   ├── api/

│   │   └── socket.js

│   ├── index.js

│   └── _app.js

├── public/

├── styles/

│   └── globals.css

├── README.md

## 🏗️ Architecture & Decisions

### Component Decomposition
- `Board` → Manages the full layout
- `Column` → Handles each status column (To Do, In Progress, Done)
- `Card` → Represented with editable modal (instead of `<prompt>`)
- `Modal` → For creating/editing cards (replaces native prompt)

### Data & Socket Separation
- UI logic and state handled with clean separation:
  - `context/BoardContext.js` → global board state
  - `hooks/useSocket.js` → WebSocket logic
  - `lib/storage.js` → shared persistent memory

### Performance Decisions
- `useSocket` is dynamically imported (`next/dynamic`) to reduce bundle size.
- Server-Side Rendering (`getServerSideProps`) ensures fast initial load with up-to-date board state.

### Trade-offs
- Used in-memory data (`lib/storage.js`) for persistence — fast but not persistent across restarts.
- Native modals replaced with a custom component, not a 3rd-party UI library (to keep it light).
- Drag-and-drop was not included to keep the core logic focused and simple.

---

## 🛠️ Getting Started

```bash
git clone [https://github.com/yourusername/realtime-task-board.git](https://github.com/Ateeq1997/Task-Board.git)
cd realtime-task-board
npm install
npm run dev

📧 Author
Ateeq Ur Rehman
