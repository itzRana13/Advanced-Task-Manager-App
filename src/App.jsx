import { useState, useCallback, useEffect } from 'react';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import TaskModal from './components/TaskModal';
import TaskListWrapper from './components/TaskListWrapper';
import FilterButtons from './components/FilterButtons';
import ThemeToggle from './components/ThemeToggle';
import TaskStats from './components/TaskStats';
import SearchBar from './components/SearchBar';
import TaskViewModal from './components/TaskViewModal';
import './styles/App.css';

function App() {
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
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

  const handleViewTask = useCallback((task) => {
    setViewingTask(task);
    setIsViewModalOpen(true);
  }, []);

  const closeViewModal = useCallback(() => {
    setIsViewModalOpen(false);
    setViewingTask(null);
  }, []);

  const handleDeleteFromView = useCallback((task) => {
    // This will be handled by TaskListWrapper's delete confirmation
    // We just need to close the view modal
    setIsViewModalOpen(false);
    setViewingTask(null);
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
              <TaskStats />
              <button className="add-task-button" onClick={openModal} aria-label="Add new task" title="Add New Task (Ctrl+K)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                <span>Add New Task</span>
              </button>
            </div>
            <SearchBar onSearchChange={setSearchQuery} />
            <FilterButtons activeFilter={filter} onFilterChange={handleFilterChange} />
            <TaskListWrapper 
              filter={filter} 
              searchQuery={searchQuery} 
              onEditTask={handleEditTask}
              onViewTask={handleViewTask}
            />
            <TaskModal isOpen={isModalOpen} onClose={closeModal} editingTask={editingTask} />
            <TaskViewModal 
              isOpen={isViewModalOpen} 
              task={viewingTask}
              onClose={closeViewModal}
              onEdit={handleEditTask}
              onDelete={handleDeleteFromView}
            />
          </main>
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;

