import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Calendar, 
  User, 
  Tag, 
  ShieldCheck, 
  Lock 
} from 'lucide-react';
import './TaskDetailsPage.css';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { getTaskById, toggleTaskStatus, deleteTask } = useTasks();

  const task = getTaskById(taskId);

  if (!task) {
    return (
      <div className="task-not-found-container animate-fade-in">
        <Lock size={48} className="icon-emerald" />
        <h2>Guarded Task Not Found</h2>
        <p>No task matches the identifier <code>{taskId}</code> in this authenticated session.</p>
        <Link to="/tasks" className="btn btn-primary btn-sm">
          Return to Tasks List
        </Link>
      </div>
    );
  }

  return (
    <div className="task-details-container animate-fade-in">
      <div className="task-details-card">
        {/* Navigation & Header */}
        <div className="details-header">
          <button
            type="button"
            className="btn btn-outline btn-xs"
            onClick={() => navigate('/tasks')}
          >
            <ArrowLeft size={14} />
            <span>Back to Tasks</span>
          </button>

          <div className="details-header-meta">
            <span className="font-mono text-emerald font-bold">Route Param: /tasks/{taskId}</span>
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
        </div>

        {/* Title & Status */}
        <div className="details-title-row">
          <div>
            <span className="details-task-id font-mono">{task.id}</span>
            <h1 className="details-title">{task.title}</h1>
          </div>

          <button
            type="button"
            className={`status-toggle-btn status-${task.status.toLowerCase().replace(' ', '-')}`}
            onClick={() => toggleTaskStatus(task.id)}
            title="Click to toggle status"
          >
            {task.status === 'Completed' ? (
              <CheckCircle2 size={14} />
            ) : (
              <Clock size={14} />
            )}
            <span>{task.status}</span>
          </button>
        </div>

        {/* Description */}
        <div className="details-section">
          <h3>Task Objective & Specification</h3>
          <p className="details-desc-text">{task.description}</p>
        </div>

        {/* Metadata Grid */}
        <div className="details-meta-grid">
          <div className="meta-box">
            <Calendar size={16} className="meta-icon" />
            <div>
              <span className="meta-label">Due Date</span>
              <strong className="meta-val font-mono">{task.dueDate}</strong>
            </div>
          </div>

          <div className="meta-box">
            <User size={16} className="meta-icon" />
            <div>
              <span className="meta-label">Guarded Assignee</span>
              <strong className="meta-val">{task.assignedTo || 'Saibadeep Mullick'}</strong>
            </div>
          </div>

          <div className="meta-box">
            <ShieldCheck size={16} className="meta-icon" />
            <div>
              <span className="meta-label">Category</span>
              <strong className="meta-val">{task.category}</strong>
            </div>
          </div>
        </div>

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="details-section">
            <div className="details-tag-header">
              <Tag size={14} />
              <span>Applied Security Tags</span>
            </div>
            <div className="details-tags-list">
              {task.tags.map((tag) => (
                <span key={tag} className="tag-pill font-mono">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Card Actions */}
        <div className="details-footer">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => toggleTaskStatus(task.id)}
          >
            <span>Mark as {task.status === 'Completed' ? 'In Progress' : 'Completed'}</span>
          </button>

          <button
            type="button"
            className="btn btn-danger-outline btn-sm"
            onClick={() => {
              if (window.confirm(`Delete task ${task.id}?`)) {
                deleteTask(task.id);
                navigate('/tasks');
              }
            }}
          >
            <Trash2 size={14} />
            <span>Delete Task</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
