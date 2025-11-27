import { useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

function TaskList({ filter, searchQuery, onEditTask, onDeleteTask, onViewTask }) {
  const { tasks, reorderTasks, allTasks, completedTasks, pendingTasks } = useTasks();

  const filteredTasks = useMemo(() => {
    let tasks = [];
    switch (filter) {
      case 'completed':
        tasks = completedTasks;
        break;
      case 'pending':
        tasks = pendingTasks;
        break;
      default:
        tasks = allTasks;
    }

    // Apply search filter
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      tasks = tasks.filter(task => 
        task.text.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query))
      );
    }

    return tasks;
  }, [filter, allTasks, completedTasks, pendingTasks, searchQuery]);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    // Find the actual indices in the full tasks array
    const sourceTask = filteredTasks[result.source.index];
    const destTask = filteredTasks[result.destination.index];
    
    const sourceIndex = tasks.findIndex(t => t.id === sourceTask.id);
    const destIndex = tasks.findIndex(t => t.id === destTask.id);

    reorderTasks(sourceIndex, destIndex);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="task-list">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`task-list ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
          >
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <p>No {filter === 'all' ? '' : filter} tasks yet.</p>
                <p className="empty-hint">Add a task to get started!</p>
              </div>
            ) : (
              filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <TaskItem
                      task={task}
                      index={index}
                      provided={provided}
                      snapshot={snapshot}
                      onEdit={onEditTask}
                      onDelete={onDeleteTask}
                      onView={onViewTask}
                    />
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TaskList;

