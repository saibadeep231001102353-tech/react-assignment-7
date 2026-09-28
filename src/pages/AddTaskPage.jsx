import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import './AddTaskPage.css';

const AddTaskPage = () => {
  const { addTask } = useTasks();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Security',
    priority: 'High',
    dueDate: new Date().toISOString().split('T')[0],
    tags: 'Auth, Guard, Token'
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Task Title is required');
      return;
    }

    const tagsArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    addTask({
      title: formData.title.trim(),
      description: formData.description.trim() || 'No description provided.',
      category: formData.category,
      priority: formData.priority,
      dueDate: formData.dueDate,
      assignedTo: user?.name || user?.username || 'Saibadeep Mullick',
      tags: tagsArray
    });

    navigate('/tasks');
  };

  return (
    <div className="add-task-container animate-fade-in">
      <div className="add-task-card">
        <div className="add-task-header">
          <button
            type="button"
            className="btn btn-outline btn-xs"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>
          <h2>Create Guarded Task</h2>
          <p>Add a new cybersecurity task under your authenticated session.</p>
        </div>

        {error && (
          <div className="alert-banner alert-banner-danger animate-fade-in">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="add-task-form">
          <div className="form-group">
            <label className="form-label">
              <span>Task Title</span>
              <span className="required-star">* Required</span>
            </label>
            <input
              type="text"
              name="title"
              className="form-input"
              placeholder="e.g. Audit Route Guard Interceptors"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-textarea"
              rows={3}
              placeholder="Detailed description of the task objective and acceptance criteria..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Security">Security</option>
                <option value="Authentication">Authentication</option>
                <option value="Routing">Routing</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Storage">Storage</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                name="priority"
                className="form-select"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                name="dueDate"
                className="form-input"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                className="form-input"
                placeholder="JWT, Route, Session"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions-row">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/tasks')}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <PlusCircle size={16} />
              <span>Save & Publish Task</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPage;
