import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { getTasks, addNewTask, modifyTask, removeTask } from '../api/api';
import { insertTaskIntoList, updateTaskInList, removeTodoInTodos, locateTask } from '../utils';
import { FRESH_TASK_ID } from '../constants';
import { delay } from '../components/search/utils/debounce';

// Создаем контекст
const TodoContext = createContext();

// Хук для использования контекста
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within TodoProvider');
  }
  return context;
};

// Провайдер
export const TodoProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [sortAlphabetically, setSortAlphabetically] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Для debounce фильтрации
  const delayedFilter = useRef(delay(loadTasks, 500)).current;

  // Загрузка задач
  function loadTasks(searchText = filterText, sort = sortAlphabetically) {
    setLoading(true);
    setError(null);
    
    getTasks(searchText, sort)
      .then((loadedTasks) => {
        const tasksArray = Array.isArray(loadedTasks) ? loadedTasks : [];
        setTaskList(tasksArray);
      })
      .catch((err) => {
        console.error('Ошибка загрузки:', err);
        setError('Не удалось загрузить задачи');
        setTaskList([]);
      })
      .finally(() => setLoading(false));
  }

  // Загрузка при изменении фильтра/сортировки
  useEffect(() => {
    loadTasks();
  }, [filterText, sortAlphabetically]);

  // Добавление новой задачи
  const addTask = useCallback(() => {
    setTaskList(prev => insertTaskIntoList(prev));
  }, []);

  // Сохранение задачи
  const saveTask = useCallback((taskId) => {
    const task = locateTask(taskList, taskId);
    if (!task) return;

    const { title, completed } = task;

    if (taskId === FRESH_TASK_ID) {
      addNewTask({ title, completed }).then((savedTask) => {
        setTaskList(prev => {
          let updated = updateTaskInList(prev, { id: FRESH_TASK_ID, isEditing: false });
          updated = removeTodoInTodos(updated, FRESH_TASK_ID);
          return insertTaskIntoList(updated, savedTask);
        });
      });
    } else {
      modifyTask({ id: taskId, title }).then(() => {
        setTaskList(prev => updateTaskInList(prev, { id: taskId, isEditing: false }));
      });
    }
  }, [taskList]);

  // Редактирование задачи
  const startEditing = useCallback((id) => {
    setTaskList(prev => updateTaskInList(prev, { id, isEditing: true }));
  }, []);

  // Изменение заголовка
  const updateTitle = useCallback((id, newTitle) => {
    setTaskList(prev => updateTaskInList(prev, { id, title: newTitle }));
  }, []);

  // Переключение статуса
  const toggleStatus = useCallback((id, newStatus) => {
    modifyTask({ id, completed: newStatus }).then(() => {
      setTaskList(prev => updateTaskInList(prev, { id, completed: newStatus }));
    });
  }, []);

  // Удаление задачи
  const deleteTask = useCallback((id) => {
    removeTask(id).then(() => {
      setTaskList(prev => removeTodoInTodos(prev, id));
    });
  }, []);

  // Изменение фильтра с debounce
  const changeFilter = useCallback((text) => {
    setFilterText(text);
    delayedFilter(text);
  }, [delayedFilter]);

  // Переключение сортировки
  const toggleSort = useCallback((value) => {
    setSortAlphabetically(value);
  }, []);

  // Значение контекста
  const contextValue = {
    taskList,
    loading,
    error,
    filterText,
    sortAlphabetically,
    addTask,
    saveTask,
    startEditing,
    updateTitle,
    toggleStatus,
    deleteTask,
    changeFilter,
    toggleSort,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};