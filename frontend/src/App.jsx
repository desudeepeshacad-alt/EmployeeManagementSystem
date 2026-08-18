import { useState, useEffect } from 'react';
import EmployeeList from './components/EmployeeList.jsx';
import EmployeeForm from './components/EmployeeForm.jsx';
import { employeeApi } from './api/employeeApi.js';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [error, setError] = useState(null);

  const loadEmployees = async () => {
    try {
      const data = await employeeApi.getAll();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError('Could not reach the backend. Is the Spring Boot server running on :8080?');
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleSave = async (employee) => {
    try {
      if (editingEmployee) {
        await employeeApi.update(editingEmployee.id, employee);
      } else {
        await employeeApi.create(employee);
      }
      setEditingEmployee(null);
      await loadEmployees();
    } catch (err) {
      setError('Save failed — check the form values and try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this employee?')) return;
    await employeeApi.remove(id);
    await loadEmployees();
  };

  return (
    <div className="app-container">
      <h1>Employee Management System</h1>
      <p className="subtitle">Spring Boot REST API + React frontend</p>

      {error && <p className="error-banner">{error}</p>}

      <EmployeeForm
        editingEmployee={editingEmployee}
        onSave={handleSave}
        onCancel={() => setEditingEmployee(null)}
      />

      <EmployeeList
        employees={employees}
        onEdit={setEditingEmployee}
        onDelete={handleDelete}
      />
    </div>
  );
}
