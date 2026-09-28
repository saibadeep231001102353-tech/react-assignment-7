import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import ProtectedDashboard from './pages/ProtectedDashboard';
import TasksPage from './pages/TasksPage';
import AddTaskPage from './pages/AddTaskPage';
import TaskDetailsPage from './pages/TaskDetailsPage';

import './App.css';

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main-content">
        <Routes>
          {/* Public Authentication Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes Guarded by Authentication & JWT Session */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProtectedDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TasksPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tasks/:taskId"
            element={
              <ProtectedRoute>
                <TaskDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-task"
            element={
              <ProtectedRoute>
                <AddTaskPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all Wildcard Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
