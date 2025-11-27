import { memo, useCallback, useEffect } from 'react';
import '../styles/TaskViewModal.css';

const TaskViewModal = memo(({ isOpen, task, onClose, onEdit, onDelete }) => {
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

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  if (!isOpen || !task) return null;

  const cardColor = task.color || '#4a90e2';

  return (
    <div className="task-view-overlay" onClick={handleOverlayClick}>
      <div className="task-view-container" onClick={(e) => e.stopPropagation()}>
        <div 
          className="task-view-header"
          style={{ '--card-color': cardColor }}
        >
          <div className="task-view-title-section">
            <div className={`task-status-indicator ${task.completed ? 'completed' : 'pending'}`}>
              {task.completed ? '✓' : '○'}
            </div>
            <h2 className="task-view-title">{task.text}</h2>
          </div>
          <button
            className="task-view-close-button"
            onClick={onClose}
            aria-label="Close view"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="task-view-content">
          {task.description && (
            <div className="task-view-description">
              <h3 className="task-view-section-title">Description</h3>
              <p>{task.description}</p>
            </div>
          )}

          <div className="task-view-details">
            <div className="task-view-detail-item">
              <span className="detail-label">Status:</span>
              <span className={`detail-value ${task.completed ? 'completed' : 'pending'}`}>
                {task.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
            <div className="task-view-detail-item">
              <span className="detail-label">Created:</span>
              <span className="detail-value">{formatDate(task.createdAt)}</span>
            </div>
            {task.updatedAt && task.updatedAt !== task.createdAt && (
              <div className="task-view-detail-item">
                <span className="detail-label">Last Updated:</span>
                <span className="detail-value">{formatDate(task.updatedAt)}</span>
              </div>
            )}
            <div className="task-view-detail-item">
              <span className="detail-label">Color:</span>
              <div className="color-indicator" style={{ backgroundColor: cardColor }}></div>
            </div>
          </div>
        </div>

        <div className="task-view-actions">
          <button
            className="task-view-button edit"
            onClick={() => {
              onClose();
              onEdit(task);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.8125 2.25L15.75 6.1875L5.625 16.3125H1.6875V12.375L11.8125 2.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.125 3.9375L14.0625 7.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Edit Task
          </button>
          <button
            className="task-view-button delete"
            onClick={() => {
              onClose();
              onDelete(task);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
});

TaskViewModal.displayName = 'TaskViewModal';

export default TaskViewModal;

