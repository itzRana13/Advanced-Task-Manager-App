import { useCallback, useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskList from './TaskList';
import ConfirmDialog from './ConfirmDialog';

function TaskListWrapper({ filter, searchQuery, onEditTask, onViewTask }) {
  const { deleteTask } = useTasks();
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleDeleteClick = useCallback((task) => {
    setTaskToDelete(task);
  }, []);

  const handleViewTask = useCallback((task) => {
    // Pass through to parent
    if (onViewTask) {
      onViewTask(task);
    }
  }, [onViewTask]);

  const handleConfirmDelete = useCallback(() => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
  }, [taskToDelete, deleteTask]);

  const handleCancelDelete = useCallback(() => {
    setTaskToDelete(null);
  }, []);

  return (
    <>
      <TaskList 
        filter={filter} 
        searchQuery={searchQuery} 
        onEditTask={onEditTask}
        onDeleteTask={handleDeleteClick}
        onViewTask={handleViewTask}
      />
      <ConfirmDialog
        isOpen={!!taskToDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.text}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}

export default TaskListWrapper;

