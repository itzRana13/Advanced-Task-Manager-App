import { useState, useCallback } from 'react';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import TaskModal from './components/TaskModal';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import ThemeToggle from './components/ThemeToggle';
import './styles/App.css';

function App() {
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

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
            </div>
            <FilterButtons activeFilter={filter} onFilterChange={handleFilterChange} />
            <TaskList filter={filter} />
            <TaskModal isOpen={isModalOpen} onClose={closeModal} />
          </main>
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;

