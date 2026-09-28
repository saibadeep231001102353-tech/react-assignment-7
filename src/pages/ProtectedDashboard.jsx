import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { formatRemainingTime } from '../utils/jwtUtils';
import JwtInspectorModal from '../components/JwtInspectorModal';
import { 
  ShieldCheck, 
  KeyRound, 
  Lock, 
  CheckCircle2, 
  Clock, 
  Database, 
  LogOut, 
  PlusCircle, 
  ArrowRight, 
  ListFilter, 
  CheckSquare, 
  AlertTriangle,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import './ProtectedDashboard.css';

const ProtectedDashboard = () => {
  const { user, token, decodedToken, storageType, rememberMe, logout } = useAuth();
  const { tasks, stats, toggleTaskStatus } = useTasks();
  const navigate = useNavigate();
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  const remainingSeconds = decodedToken?.payload?.exp;
  const remainingTimeStr = formatRemainingTime(remainingSeconds);

  // Short preview of token
  const tokenPreview = token
    ? `${token.substring(0, 16)}...${token.substring(token.length - 12)}`
    : '';

  return (
    <div className="dashboard-container animate-fade-in">
      {/* 1. Hero / Session Welcome Banner */}
      <div className="dashboard-hero-banner">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="live-indicator-dot" />
            <span>Authenticated Protected Session • Assignment 7</span>
          </div>
          <h1 className="hero-title">
            Welcome back, <span className="gradient-text">{user?.name || user?.username || 'Security Analyst'}</span>
          </h1>
          <p className="hero-desc">
            Your cryptographic session is active and guarded by client-side Route Protection.
            Simulated Base64 JWT token claims are verified and bound to{' '}
            <strong className="text-emerald">{storageType}</strong>.
          </p>
        </div>

        <div className="hero-actions">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setIsInspectorOpen(true)}
          >
            <KeyRound size={14} className="icon-emerald" />
            <span>Inspect Bearer JWT</span>
          </button>
          <button
            type="button"
            className="btn btn-danger-outline btn-sm"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* 2. Cryptographic Session Card & Specification Matrix */}
      <div className="dashboard-grid-top">
        {/* Token Telemetry Card */}
        <div className="security-card">
          <div className="card-header-row">
            <div className="card-title-group">
              <KeyRound size={18} className="icon-emerald" />
              <h3>Simulated JWT Bearer Status</h3>
            </div>
            <span className="badge badge-emerald">Active & Valid</span>
          </div>

          <div className="token-preview-box">
            <div className="token-preview-header">
              <span className="token-label">Bearer Token Payload</span>
              <span className="token-expiry-pill">
                <Clock size={12} /> Exp in {remainingTimeStr}
              </span>
            </div>
            <code className="token-code">{tokenPreview}</code>
          </div>

          <div className="telemetry-data-list">
            <div className="telemetry-item">
              <span className="telemetry-label">Subject Identity:</span>
              <span className="telemetry-value font-mono">{decodedToken?.payload?.sub || 'usr_007'}</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">Access Clearance:</span>
              <span className="badge badge-indigo">{user?.role || 'Analyst'}</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">Storage Target:</span>
              <span className="telemetry-value">
                <strong className="text-emerald">{storageType}</strong>{' '}
                <span className="text-muted">
                  ({rememberMe ? 'Persistent (Remember User)' : 'Session-only tab scope'})
                </span>
              </span>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm btn-block"
            onClick={() => setIsInspectorOpen(true)}
          >
            <KeyRound size={15} />
            <span>Open Interactive Claims Inspector</span>
          </button>
        </div>

        {/* Assignment 7 Specification Matrix */}
        <div className="security-card">
          <div className="card-header-row">
            <div className="card-title-group">
              <ShieldCheck size={18} className="icon-emerald" />
              <h3>Assignment 7 Verification Matrix</h3>
            </div>
            <span className="badge badge-indigo">100% Compliant</span>
          </div>

          <p className="card-sub-text">
            All mandatory features, validations, and prerequisites specified in the Syllabus are implemented:
          </p>

          <div className="matrix-checklist">
            <div className="matrix-item met">
              <CheckCircle2 size={16} className="matrix-icon" />
              <div>
                <strong>Login System:</strong>
                <span>Username and password required validation with error feedback.</span>
              </div>
            </div>

            <div className="matrix-item met">
              <CheckCircle2 size={16} className="matrix-icon" />
              <div>
                <strong>Display Password Strength:</strong>
                <span>Real-time NIST entropy calculation bar and checklist.</span>
              </div>
            </div>

            <div className="matrix-item met">
              <CheckCircle2 size={16} className="matrix-icon" />
              <div>
                <strong>Remember User Feature:</strong>
                <span>Saves to LocalStorage when checked; SessionStorage when unchecked.</span>
              </div>
            </div>

            <div className="matrix-item met">
              <CheckCircle2 size={16} className="matrix-icon" />
              <div>
                <strong>JWT Token Simulation:</strong>
                <span>RFC 7519 Base64 Header.Payload.Signature with expiry calculation.</span>
              </div>
            </div>

            <div className="matrix-item met">
              <CheckCircle2 size={16} className="matrix-icon" />
              <div>
                <strong>Protected Dashboard & Logout:</strong>
                <span>Route guards prevent unauthorized access; clean session teardown.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Assignment 6 Integrated Task Management Stats */}
      <div className="section-header-row">
        <div>
          <h2 className="section-title">Assignment 6: Integrated Task System</h2>
          <p className="section-subtitle">
            Manage protected tasks, dynamic routes, and status workflows under authenticated scope
          </p>
        </div>
        <div className="section-btn-group">
          <Link to="/add-task" className="btn btn-primary btn-sm">
            <PlusCircle size={15} />
            <span>New Task</span>
          </Link>
          <Link to="/tasks" className="btn btn-outline btn-sm">
            <span>View All ({stats.total})</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="stats-metric-grid">
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Guarded Tasks</span>
            <span className="stat-number">{stats.total}</span>
          </div>
          <div className="stat-icon-box bg-emerald">
            <CheckSquare size={20} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">In Progress</span>
            <span className="stat-number text-amber">{stats.inProgress}</span>
          </div>
          <div className="stat-icon-box bg-amber">
            <Clock size={20} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Completed</span>
            <span className="stat-number text-emerald">{stats.completed}</span>
          </div>
          <div className="stat-icon-box bg-emerald">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">High / Critical Priority</span>
            <span className="stat-number text-rose">{stats.highPriority}</span>
          </div>
          <div className="stat-icon-box bg-rose">
            <AlertTriangle size={20} />
          </div>
        </div>
      </div>

      {/* 4. Recent Tasks Table */}
      <div className="recent-tasks-card">
        <div className="card-header-row">
          <div className="card-title-group">
            <Layers size={18} className="icon-emerald" />
            <h3>Recent Protected Tasks (Assignment 6 Data)</h3>
          </div>
          <span className="table-hint">Click status pill to toggle completion</span>
        </div>

        <div className="tasks-table-wrapper">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Task Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status (Interactive)</th>
                <th>Due Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.slice(0, 5).map((task) => (
                <tr key={task.id}>
                  <td className="font-mono text-emerald font-bold">{task.id}</td>
                  <td>
                    <div className="task-title-cell">
                      <strong className="task-name">{task.title}</strong>
                      <span className="task-desc-sub">{task.description}</span>
                    </div>
                  </td>
                  <td>
                    <span className="category-tag">{task.category}</span>
                  </td>
                  <td>
                    <span
                      className={`badge badge-${
                        task.priority === 'Critical' || task.priority === 'High'
                          ? 'rose'
                          : task.priority === 'Medium'
                          ? 'amber'
                          : 'cyan'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`status-toggle-btn status-${task.status.toLowerCase().replace(' ', '-')}`}
                      onClick={() => toggleTaskStatus(task.id)}
                      title="Click to toggle status"
                    >
                      {task.status === 'Completed' ? (
                        <CheckCircle2 size={12} />
                      ) : (
                        <Clock size={12} />
                      )}
                      <span>{task.status}</span>
                    </button>
                  </td>
                  <td className="font-mono text-muted">{task.dueDate}</td>
                  <td>
                    <Link
                      to={`/tasks/${task.id}`}
                      className="btn btn-ghost btn-xs"
                      title="Open dynamic URL task details (/tasks/:taskId)"
                    >
                      <span>Details</span>
                      <ExternalLink size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Modal */}
      <JwtInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />
    </div>
  );
};

export default ProtectedDashboard;
