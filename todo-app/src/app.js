import { useEffect, useState } from 'react';
import { Controls, TaskItem } from '../components';
import { useTodo } from '../context';
import { FRESH_TASK_ID } from '../constants';
import styles from './app.module.css';

export const App = () => {
  const {
    taskList,
    loading,
    error,
    addTask,
    saveTask,
    startEditing,
    updateTitle,
    toggleStatus,
    deleteTask,
    changeFilter,
    toggleSort,
  } = useTodo();

  if (loading) return <div className={styles.appContainer}>Загрузка...</div>;
  if (error) return <div className={styles.appContainer}>Ошибка: {error}</div>;

  return (
    <div className={styles.appContainer}>
      <Controls
        onAddTask={addTask}
        onFilterChange={changeFilter}
        onSortToggle={toggleSort}
      />
      <div className={styles.tasksArea}>
        {taskList.length > 0 ? (
          taskList.map(({ id, title, completed, isEditing = false }) => (
            <TaskItem
              key={id}
              identifier={id}
              title={title}
              completed={completed}
              isEditing={isEditing}
              onEditRequest={() => startEditing(id)}
              onTitleUpdate={(newTitle) => updateTitle(id, newTitle)}
              onStatusChange={(newStatus) => toggleStatus(id, newStatus)}
              onSaveRequest={() => saveTask(id)}
              onDeleteRequest={() => deleteTask(id)}
            />
          ))
        ) : (
          <div className={styles.tasksArea}>Нет задач</div>
        )}
      </div>
    </div>
  );
};