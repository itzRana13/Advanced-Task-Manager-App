import { useState, useCallback } from 'react';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import ThemeToggle from './components/ThemeToggle';
import './styles/App.css';

function App() {
  const [filter, setFilter] = useState('all');

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
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
            <TaskForm />
            <FilterButtons activeFilter={filter} onFilterChange={handleFilterChange} />
            <TaskList filter={filter} />
          </main>
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;

