import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { 
  CheckSquare, 
  PlusCircle, 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Shield,
  RotateCcw
} from 'lucide-react';
import './TasksPage.css';

const TasksPage = () => {
  const { tasks, toggleTaskStatus, deleteTask, resetToDefaults, stats } = useTasks();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === 'All' || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  return (
    <div className="tasks-page-container animate-fade-in">
      {/* Header */}
      <div className="tasks-page-header">
        <div>
          <div className="tasks-badge">
            <Shield size={14} className="icon-emerald" />
            <span>Assignment 6 Task Engine • Route Protected</span>
          </div>
          <h1 className="tasks-page-title">Guarded Task Manager</h1>
          <p className="tasks-page-desc">
            Assignment 6 task repository executed within Assignment 7 authentication boundaries.
          </p>
        </div>

        <div className="tasks-header-actions">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={resetToDefaults}
            title="Reset to default Assignment 6 sample tasks"
          >
            <RotateCcw size={14} />
            <span>Reset Defaults</span>
          </button>
          <Link to="/add-task" className="btn btn-primary btn-sm">
            <PlusCircle size={15} />
            <span>Create Task</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="tasks-filter-bar">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by ID, keyword, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-group">
          <div className="filter-select-wrapper">
            <Filter size={14} className="filter-icon" />
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses ({stats.total})</option>
              <option value="Completed">Completed ({stats.completed})</option>
              <option value="In Progress">In Progress ({stats.inProgress})</option>
              <option value="Pending">Pending ({stats.pending})</option>
            </select>
          </div>

          <div className="filter-select-wrapper">
            <select
              className="filter-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task Cards Grid */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state-box">
          <CheckSquare size={48} className="empty-icon" />
          <h3>No matching tasks found</h3>
          <p>Try refining your search terms or filters.</p>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('All');
              setPriorityFilter('All');
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-card-header">
                <span className="task-id-badge font-mono">{task.id}</span>
                <span
                  className={`badge badge-${
                    task.priority === 'Critical' || task.priority === 'High'
                      ? 'rose'
                      : task.priority === 'Medium'
                      ? 'amber'
                      : 'cyan'
                  }`}
                >
                  {task.priority} Priority
                </span>
              </div>

              <h3 className="task-card-title">{task.title}</h3>
              <p className="task-card-description">{task.description}</p>

              <div className="task-tags-row">
                {task.tags?.map((tag) => (
                  <span key={tag} className="task-tag">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="task-card-footer">
                <button
                  type="button"
                  className={`status-toggle-btn status-${task.status.toLowerCase().replace(' ', '-')}`}
                  onClick={() => toggleTaskStatus(task.id)}
                  title="Toggle status"
                >
                  {task.status === 'Completed' ? (
                    <CheckCircle2 size={13} />
                  ) : (
                    <Clock size={13} />
                  )}
                  <span>{task.status}</span>
                </button>

                <div className="task-card-actions">
                  <Link
                    to={`/tasks/${task.id}`}
                    className="btn btn-ghost btn-xs"
                    title="View dynamic URL route (/tasks/:taskId)"
                  >
                    <span>Details</span>
                    <ExternalLink size={12} />
                  </Link>

                  <button
                    type="button"
                    className="btn btn-ghost btn-xs text-rose"
                    onClick={() => {
                      if (window.confirm(`Delete task ${task.id}?`)) {
                        deleteTask(task.id);
                      }
                    }}
                    title="Delete task"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksPage;
