import axios from 'axios';

// Locally, Vite proxies /api -> localhost:8080 (see vite.config.js), so the
// relative path works with no env var needed.
// In production (Vercel), set VITE_API_URL to your Render backend URL, e.g.
// https://your-app.onrender.com
const API_ROOT = import.meta.env.VITE_API_URL || '';
const API_BASE = `${API_ROOT}/api/employees`;

// Centralizing API calls here keeps components focused on rendering,
// and makes it a single place to change base URL / add auth headers later.
export const employeeApi = {
  getAll: () => axios.get(API_BASE).then(res => res.data),

  getById: (id) => axios.get(`${API_BASE}/${id}`).then(res => res.data),

  create: (employee) => axios.post(API_BASE, employee).then(res => res.data),

  update: (id, employee) => axios.put(`${API_BASE}/${id}`, employee).then(res => res.data),

  remove: (id) => axios.delete(`${API_BASE}/${id}`),
};
