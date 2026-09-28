/**
 * Initial Tasks Data for Assignment 6 Integration
 * React Assignment 7: Authentication System with Protected Route Guarding
 * Author: Saibadeep Mullick (BCA 4th Year)
 */

export const INITIAL_TASKS = [
  {
    id: 'SEC-101',
    title: 'Audit JWT Bearer Token Expiration Interceptor',
    description: 'Verify client-side token validation and ensure route guards reject expired sessions gracefully without security leaks.',
    priority: 'High',
    status: 'In Progress',
    category: 'Security',
    dueDate: '2026-09-28',
    assignedTo: 'Saibadeep Mullick',
    tags: ['JWT', 'Route Guard', 'Storage'],
    createdAt: '2026-09-26'
  },
  {
    id: 'SEC-102',
    title: 'Sanitize Username and Password Form Inputs',
    description: 'Ensure username and password inputs prevent XSS injections and meet the strict Assignment 7 validation rules.',
    priority: 'Critical',
    status: 'Completed',
    category: 'Authentication',
    dueDate: '2026-09-27',
    assignedTo: 'Saibadeep Mullick',
    tags: ['Validation', 'Security', 'Forms'],
    createdAt: '2026-09-26'
  },
  {
    id: 'SEC-103',
    title: 'Implement Real-Time Password Entropy Algorithm',
    description: 'Render visual feedback bars and rule checklists for length, uppercase, numbers, and symbols according to NIST standards.',
    priority: 'High',
    status: 'Completed',
    category: 'UI/UX',
    dueDate: '2026-09-29',
    assignedTo: 'Saibadeep Mullick',
    tags: ['Password Strength', 'State', 'RegEx'],
    createdAt: '2026-09-26'
  },
  {
    id: 'SEC-104',
    title: 'Test SessionStorage vs LocalStorage Remember-Me Sync',
    description: 'Validate that "Remember User" checkbox saves tokens into localStorage across browser restarts, while default saves in sessionStorage.',
    priority: 'Medium',
    status: 'In Progress',
    category: 'Storage',
    dueDate: '2026-09-30',
    assignedTo: 'Saibadeep Mullick',
    tags: ['LocalStorage', 'SessionStorage', 'Persistence'],
    createdAt: '2026-09-26'
  },
  {
    id: 'SEC-105',
    title: 'Configure Dynamic URL Route Parameters for Task Details',
    description: 'Link protected task detail pages via /tasks/:taskId and verify URL param decoding inside ProtectedRoute boundaries.',
    priority: 'Low',
    status: 'Pending',
    category: 'Routing',
    dueDate: '2026-10-02',
    assignedTo: 'Saibadeep Mullick',
    tags: ['React Router', 'useParams', 'Assignment 6'],
    createdAt: '2026-09-26'
  }
];
