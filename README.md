<h1 align="center">Task Board</h1>

<p align="center">
  <b>Collaborative Kanban-style task management app</b><br/>
  Built with React, TypeScript, Vite, Zustand, Tailwind CSS, and more.
</p>

---

## Live Demo

[View Demo](https://staskboard.netlify.app)

## Overview

Task Board is a modern, full-featured Kanban board for managing tasks, assignments, and collaboration. It supports user authentication, task assignment, tagging, blocking users, and multi-language support (English, Russian, Uzbek).

## Features

- User authentication (register, login, change password)
- Kanban board with drag-and-drop (dnd-kit)
- Task creation, editing, filtering, and tagging
- Assign tasks to users, approve/reject assignments
- Block/unblock users
- Multi-language UI (i18n)
- Responsive design (mobile & desktop)
- Toast notifications for feedback
- Persistent state with Zustand

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Forms & Validation:** React Hook Form, Zod
- **Drag & Drop:** dnd-kit
- **Routing:** React Router v7
- **API:** Axios
- **i18n:** react-i18next
- **UI Components:** Custom + Lucide Icons
- **Linting:** ESLint

## 📁 Folder Structure

```
src/
  api/         # API request modules
  assets/      # Static assets
  components/  # Reusable UI and feature
  constants/   # App-wide constants
  features/    # Domain logic (auth, task, tag, block, user)
  hooks/       # Custom React hooks
  i18n/        # Internationalization config & translations
  layouts/     # Layout components (Main, Auth)
  mapper/      # Data mapping utilities
  pages/       # Route pages (Board, Auth, BlockedUsers, etc.)
  router/      # Routing setup & guards
  store/       # Zustand stores
  types/       # TypeScript types
  utils/       # Utility functions
public/
  favicon.svg  # App icon
index.html     # App entry point
vite.config.ts # Vite config
```

## Environment Variables

Create a `.env` file in the root with:

```
VITE_API_URL=<your-backend-api-url>
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file as described above.

### 3. Run the development server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 4. Build for production

```bash
npm run build
```

### 5. Preview production build

```bash
npm run preview
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
