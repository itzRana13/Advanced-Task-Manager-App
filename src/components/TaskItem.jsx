import { memo, useCallback } from 'react';
import { useTasks } from '../context/TaskContext';
import '../styles/TaskItem.css';

const TaskItem = memo(({ task, index, provided, snapshot, onEdit, onDelete }) => {
  const { toggleTask } = useTasks();

  const handleToggle = useCallback(() => {
    toggleTask(task.id);
  }, [task.id, toggleTask]);

  const handleDelete = useCallback(() => {
    if (onDelete) {
      onDelete(task);
    }
  }, [task, onDelete]);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  }, []);

  const cardColor = task.color || '#4a90e2';

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`task-card ${task.completed ? 'completed' : ''} ${snapshot.isDragging ? 'dragging' : ''}`}
      style={{
        ...provided.draggableProps.style,
        '--card-color': cardColor,
      }}
    >
      <div className="task-card-header">
        <div className="task-card-title-section">
          <input
            type="checkbox"
            className="task-checkbox"
            checked={task.completed}
            onChange={handleToggle}
            aria-label={`Mark task "${task.text}" as ${task.completed ? 'pending' : 'completed'}`}
          />
          <h3 className="task-title">{task.text}</h3>
        </div>
        <div className="task-card-actions">
          <button
            className="edit-button"
            onClick={() => onEdit && onEdit(task)}
            aria-label={`Edit task "${task.text}"`}
            title="Edit task"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.8125 2.25L15.75 6.1875L5.625 16.3125H1.6875V12.375L11.8125 2.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.125 3.9375L14.0625 7.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="delete-button"
            onClick={handleDelete}
            aria-label={`Delete task "${task.text}"`}
            title="Delete task"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      {task.description && (
        <div className="task-card-description">
          <p>{task.description}</p>
        </div>
      )}
      
      <div className="task-card-footer">
        <span className="task-date">
          {formatDate(task.createdAt)}
        </span>
        {task.completed && (
          <span className="task-status-badge completed-badge">
            Completed
          </span>
        )}
      </div>
    </div>
  );
});

TaskItem.displayName = 'TaskItem';

export default TaskItem;

