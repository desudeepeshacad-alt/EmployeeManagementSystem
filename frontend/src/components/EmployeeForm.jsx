import { useState, useEffect } from 'react';

const emptyForm = { name: '', email: '', department: '', salary: '' };

export default function EmployeeForm({ editingEmployee, onSave, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  // When the user clicks "Edit" on a row, pre-fill the form with that employee's data.
  useEffect(() => {
    setForm(editingEmployee ? { ...editingEmployee } : emptyForm);
  }, [editingEmployee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, salary: Number(form.salary) });
    setForm(emptyForm);
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
      <input name="salary" type="number" placeholder="Salary" value={form.salary} onChange={handleChange} required />
      <button type="submit">{editingEmployee ? 'Update' : 'Add'} Employee</button>
      {editingEmployee && (
        <button type="button" onClick={onCancel}>Cancel</button>
      )}
    </form>
  );
}
