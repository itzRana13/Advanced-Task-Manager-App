import { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const TaskContext = createContext();

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  // Memoized filter functions
  const allTasks = useMemo(() => tasks, [tasks]);
  const completedTasks = useMemo(() => tasks.filter(task => task.completed), [tasks]);
  const pendingTasks = useMemo(() => tasks.filter(task => !task.completed), [tasks]);

  // Add task with validation
  const addTask = useCallback((text, description = '', color = '#4a90e2') => {
    if (!text || text.trim() === '') {
      return false; // Validation failed
    }
    const newTask = {
      id: Date.now().toString(),
      text: text.trim(),
      description: description.trim(),
      color: color,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    return true;
  }, [setTasks]);

  // Toggle task completion
  const toggleTask = useCallback((id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  // Delete task
  const deleteTask = useCallback((id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, [setTasks]);

  // Update task
  const updateTask = useCallback((id, updates) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  }, [setTasks]);

  // Reorder tasks (for drag and drop)
  const reorderTasks = useCallback((startIndex, endIndex) => {
    setTasks(prevTasks => {
      const result = Array.from(prevTasks);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, [setTasks]);

  // Task statistics
  const taskStats = useMemo(() => ({
    total: tasks.length,
    completed: completedTasks.length,
    pending: pendingTasks.length,
  }), [tasks.length, completedTasks.length, pendingTasks.length]);

  const value = useMemo(() => ({
    tasks,
    allTasks,
    completedTasks,
    pendingTasks,
    taskStats,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    reorderTasks,
  }), [tasks, allTasks, completedTasks, pendingTasks, taskStats, addTask, toggleTask, deleteTask, updateTask, reorderTasks]);

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

