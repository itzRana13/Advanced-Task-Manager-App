import { useState, useCallback } from 'react';
import { useTasks } from '../context/TaskContext';
import '../styles/TaskForm.css';

function TaskForm() {
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const { addTask } = useTasks();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setError('');
    
    if (!input || input.trim() === '') {
      setError('Task title cannot be empty!');
      return;
    }

    const success = addTask(input, description);
    if (success) {
      setInput('');
      setDescription('');
      setError('');
    } else {
      setError('Failed to add task. Please try again.');
    }
  }, [input, description, addTask]);

  const handleTitleChange = useCallback((e) => {
    setInput(e.target.value);
    if (error) setError('');
  }, [error]);

  const handleDescriptionChange = useCallback((e) => {
    setDescription(e.target.value);
    if (error) setError('');
  }, [error]);

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="form-group">
          <input
            type="text"
            className={`task-input ${error ? 'error' : ''}`}
            placeholder="Task title..."
            value={input}
            onChange={handleTitleChange}
            aria-label="Task title"
          />
        </div>
        <div className="form-group">
          <textarea
            className="task-description-input"
            placeholder="Add description (optional)..."
            value={description}
            onChange={handleDescriptionChange}
            rows="3"
            aria-label="Task description"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="add-button" aria-label="Add task">
            Add Task
          </button>
        </div>
      </div>
      {error && <div className="error-message" role="alert">{error}</div>}
    </form>
  );
}

export default TaskForm;

