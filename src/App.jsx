import { useState, useCallback, useEffect } from 'react';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import TaskModal from './components/TaskModal';
import TaskListWrapper from './components/TaskListWrapper';
import FilterButtons from './components/FilterButtons';
import ThemeToggle from './components/ThemeToggle';
import TaskStats from './components/TaskStats';
import SearchBar from './components/SearchBar';
import './styles/App.css';

function App() {
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  const openModal = useCallback(() => {
    setEditingTask(null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingTask(null);
  }, []);

  const handleEditTask = useCallback((task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }, []);

  // Keyboard shortcut: Ctrl+K or Cmd+K to open modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openModal]);

  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="app">
          <header className="app-header">
            <h1 className="app-title">Task Manager</h1>
            <ThemeToggle />
          </header>
          <main className="app-main">
            <div className="action-section">
              <button className="add-task-button" onClick={openModal} aria-label="Add new task">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Add New Task</span>
              </button>
              <span className="keyboard-hint">Press Ctrl+K</span>
            </div>
            <TaskStats />
            <SearchBar onSearchChange={setSearchQuery} />
            <FilterButtons activeFilter={filter} onFilterChange={handleFilterChange} />
            <TaskListWrapper filter={filter} searchQuery={searchQuery} onEditTask={handleEditTask} />
            <TaskModal isOpen={isModalOpen} onClose={closeModal} editingTask={editingTask} />
          </main>
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;

