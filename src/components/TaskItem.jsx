import { memo, useCallback } from 'react';
import { useTasks } from '../context/TaskContext';
import '../styles/TaskItem.css';

const TaskItem = memo(({ task, index, provided, snapshot }) => {
  const { toggleTask, deleteTask } = useTasks();

  const handleToggle = useCallback(() => {
    toggleTask(task.id);
  }, [task.id, toggleTask]);

  const handleDelete = useCallback(() => {
    deleteTask(task.id);
  }, [task.id, deleteTask]);

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`task-item ${task.completed ? 'completed' : ''} ${snapshot.isDragging ? 'dragging' : ''}`}
      style={{
        ...provided.draggableProps.style,
      }}
    >
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={handleToggle}
        aria-label={`Mark task "${task.text}" as ${task.completed ? 'pending' : 'completed'}`}
      />
      <span className="task-text">{task.text}</span>
      <button
        className="delete-button"
        onClick={handleDelete}
        aria-label={`Delete task "${task.text}"`}
      >
        ×
      </button>
    </div>
  );
});

TaskItem.displayName = 'TaskItem';

export default TaskItem;

