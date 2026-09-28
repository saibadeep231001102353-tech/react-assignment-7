import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TASKS } from '../data/initialTasks';

const TaskContext = createContext(null);
const TASKS_STORAGE_KEY = 'authguard_assignment6_tasks';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(TASKS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch (e) {
      return INITIAL_TASKS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to sync tasks to localStorage:', e);
    }
  }, [tasks]);

  const addTask = (newTask) => {
    const created = {
      ...newTask,
      id: `SEC-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: newTask.status || 'Pending'
    };
    setTasks((prev) => [created, ...prev]);
    return created;
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const nextStatus =
          t.status === 'Completed'
            ? 'In Progress'
            : t.status === 'In Progress'
            ? 'Completed'
            : 'In Progress';
        return { ...t, status: nextStatus };
      })
    );
  };

  const getTaskById = (id) => {
    return tasks.find((t) => t.id === id);
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'Completed').length,
    inProgress: tasks.filter((t) => t.status === 'In Progress').length,
    pending: tasks.filter((t) => t.status === 'Pending').length,
    highPriority: tasks.filter((t) => t.priority === 'High' || t.priority === 'Critical').length
  };

  const resetToDefaults = () => {
    setTasks(INITIAL_TASKS);
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    getTaskById,
    stats,
    resetToDefaults
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
