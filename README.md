# Advanced Task Manager App

A modern, feature-rich Task Manager application built with React, featuring dark mode, drag-and-drop, and local storage persistence.

## 🌐 Live Demo

**Try it now:** [https://advanced-task-manager-nrzyx7d9v-itzrana13s-projects.vercel.app/](https://advanced-task-manager-nrzyx7d9v-itzrana13s-projects.vercel.app/)

## Features

### Basic Features
- ✅ Add tasks with validation
- ✅ Mark tasks as completed
- ✅ Delete tasks
- ✅ Filter tasks (All, Completed, Pending)
- ✅ Persist tasks using Local Storage

### React Advanced Features
- ✅ **Custom Hooks**: `useLocalStorage` hook for managing localStorage operations
- ✅ **Context API**: React Context for managing task data (no prop drilling)
- ✅ **Performance Optimization**: 
  - `React.memo` for component memoization
  - `useCallback` for function memoization
  - `useMemo` for computed values
- ✅ **Form Validation**: Prevents adding empty tasks with error messages

### CSS Advanced Features
- ✅ **Theming**: Dark Mode / Light Mode toggle with smooth transitions
- ✅ **Animations**: CSS transitions for adding/removing tasks
- ✅ **Responsive Design**: Mobile-first approach with breakpoints
- ✅ **Drag-and-Drop**: Task reordering using `react-beautiful-dnd`

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **react-beautiful-dnd** - Drag and drop functionality
- **CSS3** - Styling with CSS variables for theming

## 🚀 Deployment

- **Live URL**: [https://advanced-task-manager-nrzyx7d9v-itzrana13s-projects.vercel.app/](https://advanced-task-manager-nrzyx7d9v-itzrana13s-projects.vercel.app/)
- **Deployed on**: Vercel
- **Repository**: [GitHub](https://github.com/itzRana13/Advanced-Task-Manager-App.git)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd task-manager-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Project Structure

```
task-manager-app/
├── src/
│   ├── components/
│   │   ├── TaskForm.jsx       # Form for adding tasks
│   │   ├── TaskList.jsx       # List container with drag-drop
│   │   ├── TaskItem.jsx       # Individual task item
│   │   ├── FilterButtons.jsx  # Filter buttons component
│   │   └── ThemeToggle.jsx    # Theme switcher
│   ├── context/
│   │   ├── TaskContext.jsx    # Task state management
│   │   └── ThemeContext.jsx   # Theme state management
│   ├── hooks/
│   │   └── useLocalStorage.js # Custom localStorage hook
│   ├── styles/
│   │   ├── index.css          # Global styles & CSS variables
│   │   ├── App.css            # App layout styles
│   │   ├── TaskForm.css       # Form styles
│   │   ├── TaskList.css       # List styles
│   │   ├── TaskItem.css       # Task item styles & animations
│   │   ├── FilterButtons.css  # Filter button styles
│   │   └── ThemeToggle.css    # Theme toggle styles
│   ├── App.jsx                # Main app component
│   └── main.jsx               # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Usage

### Adding Tasks
1. Type your task in the input field
2. Click "Add Task" or press Enter
3. Empty tasks are prevented with validation

### Managing Tasks
- **Complete**: Click the checkbox next to a task
- **Delete**: Hover over a task and click the × button
- **Reorder**: Drag and drop tasks to reorder them

### Filtering Tasks
- Click "All" to see all tasks
- Click "Pending" to see incomplete tasks
- Click "Completed" to see completed tasks

### Theme Toggle
- Click the theme toggle button in the header to switch between light and dark modes
- Your preference is saved in localStorage

## Performance Optimizations

1. **React.memo**: `TaskItem` and `FilterButtons` are memoized to prevent unnecessary re-renders
2. **useCallback**: All event handlers are memoized to maintain referential equality
3. **useMemo**: Filtered task lists and context values are memoized to avoid recalculation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
