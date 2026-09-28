# Assignment 7: Enterprise Task Management & Authentication Portal

An enterprise-grade React web application demonstrating production authentication flows, protected route guards, multi-context architecture, and comprehensive task lifecycle workflows.

---

## 📌 Features & Highlights

- **Authentication System & JWT Simulation**:
  - Token-based authentication simulation in `AuthContext`
  - Login / Logout state management
  - Route guards using `<ProtectedRoute>` wrapper
- **Context-Driven Task Architecture**: Centralized task state in `TaskContext` with filtering, status toggles, deletion, and additions.
- **Client-Side Routing & Dynamic Routes**:
  - `/` - Protected dashboard with metrics, progress overview, and quick links
  - `/tasks` - Filterable task directory
  - `/tasks/:taskId` - Deep-linked task details page
  - `/add-task` - Validated task creation workflow
  - `/login` - Interactive login page
- **Static Hosting Compatible**: Configured with `HashRouter` ensuring seamless navigation and hard refresh on GitHub Pages without 404 errors.
- **GitHub Actions Deployment**: Automatic CI/CD pipeline building and publishing to GitHub Pages on every push.

---

## 🛠️ Tech Stack

- **React 19**
- **React Router DOM v6**
- **Vite**
- **Lucide React Icons**
- **Custom Modular CSS & Design Tokens**

---

## ⚡ Getting Started Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```
