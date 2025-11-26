import { useState, useCallback, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import '../styles/TaskModal.css';

const CARD_COLORS = [
  { name: 'Blue', value: '#4a90e2', class: 'blue' },
  { name: 'Green', value: '#52c41a', class: 'green' },
  { name: 'Purple', value: '#9254de', class: 'purple' },
  { name: 'Orange', value: '#fa8c16', class: 'orange' },
  { name: 'Pink', value: '#eb2f96', class: 'pink' },
  { name: 'Cyan', value: '#13c2c2', class: 'cyan' },
  { name: 'Red', value: '#ff4d4f', class: 'red' },
  { name: 'Yellow', value: '#fadb14', class: 'yellow' },
];

function TaskModal({ isOpen, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(CARD_COLORS[0].value);
  const [error, setError] = useState('');
  const { addTask } = useTasks();

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setSelectedColor(CARD_COLORS[0].value);
      setError('');
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setError('');

    if (!title || title.trim() === '') {
      setError('Task title cannot be empty!');
      return;
    }

    const success = addTask(title, description, selectedColor);
    if (success) {
      onClose();
    } else {
      setError('Failed to add task. Please try again.');
    }
  }, [title, description, selectedColor, addTask, onClose]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Create New Task</h2>
          <button
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="task-title" className="form-label">
              Task Title <span className="required">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              className={`form-input ${error ? 'error' : ''}`}
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              autoFocus
            />
          </div>

          <div className="form-field">
            <label htmlFor="task-description" className="form-label">
              Description
            </label>
            <textarea
              id="task-description"
              className="form-textarea"
              placeholder="Add a description (optional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            />
          </div>

          <div className="form-field">
            <label className="form-label">Card Color</label>
            <div className="color-picker">
              {CARD_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  className={`color-option ${selectedColor === color.value ? 'selected' : ''}`}
                  style={{ '--color': color.value }}
                  onClick={() => setSelectedColor(color.value)}
                  aria-label={`Select ${color.name} color`}
                  title={color.name}
                >
                  <div className="color-preview" style={{ backgroundColor: color.value }}></div>
                  {selectedColor === color.value && (
                    <svg className="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;

