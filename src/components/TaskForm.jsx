import { useState, useCallback } from 'react';
import { useTasks } from '../context/TaskContext';
import '../styles/TaskForm.css';

function TaskForm() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const { addTask } = useTasks();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setError('');
    
    if (!input || input.trim() === '') {
      setError('Task cannot be empty!');
      return;
    }

    const success = addTask(input);
    if (success) {
      setInput('');
      setError('');
    } else {
      setError('Failed to add task. Please try again.');
    }
  }, [input, addTask]);

  const handleChange = useCallback((e) => {
    setInput(e.target.value);
    if (error) setError('');
  }, [error]);

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className={`task-input ${error ? 'error' : ''}`}
          placeholder="Add a new task..."
          value={input}
          onChange={handleChange}
          aria-label="Task input"
        />
        <button type="submit" className="add-button" aria-label="Add task">
          Add Task
        </button>
      </div>
      {error && <div className="error-message" role="alert">{error}</div>}
    </form>
  );
}

export default TaskForm;

