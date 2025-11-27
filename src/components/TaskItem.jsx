import { memo, useCallback, useRef } from 'react';
import { useTasks } from '../context/TaskContext';
import '../styles/TaskItem.css';

const TaskItem = memo(({ task, index, provided, snapshot, onEdit, onDelete, onView }) => {
  const { toggleTask } = useTasks();
  const dragStartPos = useRef({ x: 0, y: 0 });

  const handleToggle = useCallback((e) => {
    e.stopPropagation();
    toggleTask(task.id);
  }, [task.id, toggleTask]);

  const handleDelete = useCallback((e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(task);
    }
  }, [task, onDelete]);

  const handleEdit = useCallback((e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(task);
    }
  }, [task, onEdit]);

  const handleMouseDown = useCallback((e) => {
    // Don't track if clicking on interactive elements
    if (e.target.closest('button, input[type="checkbox"]')) {
      return;
    }
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleCardClick = useCallback((e) => {
    // Don't open view if clicking on interactive elements
    if (e.target.closest('button, input[type="checkbox"]')) {
      return;
    }
    // Don't open if this was a drag (mouse moved more than 5px)
    const deltaX = Math.abs(e.clientX - dragStartPos.current.x);
    const deltaY = Math.abs(e.clientY - dragStartPos.current.y);
    if (deltaX > 5 || deltaY > 5) {
      return;
    }
    // Don't open if currently dragging
    if (snapshot.isDragging) {
      return;
    }
    if (onView) {
      onView(task);
    }
  }, [task, onView, snapshot.isDragging]);

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
      onMouseDown={handleMouseDown}
      onClick={handleCardClick}
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
            onClick={handleEdit}
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
        <div className="task-dates">
          <span className="task-date" title={`Created: ${formatDate(task.createdAt)}`}>
            📅 {formatDate(task.createdAt)}
          </span>
          {task.updatedAt && task.updatedAt !== task.createdAt && (
            <span className="task-updated" title={`Last updated: ${formatDate(task.updatedAt)}`}>
              ✏️ Updated {formatDate(task.updatedAt)}
            </span>
          )}
        </div>
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

