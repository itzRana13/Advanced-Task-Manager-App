import { memo } from 'react';
import { useTasks } from '../context/TaskContext';
import '../styles/TaskStats.css';

const TaskStats = memo(() => {
  const { taskStats } = useTasks();

  return (
    <div className="task-stats">
      <div className="stat-item">
        <span className="stat-label">Total</span>
        <span className="stat-value">{taskStats.total}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Pending</span>
        <span className="stat-value pending">{taskStats.pending}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Completed</span>
        <span className="stat-value completed">{taskStats.completed}</span>
      </div>
    </div>
  );
});

TaskStats.displayName = 'TaskStats';

export default TaskStats;

