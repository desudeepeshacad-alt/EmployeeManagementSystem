export default function EmployeeList({ employees, onEdit, onDelete }) {
  if (employees.length === 0) {
    return <p className="empty-state">No employees yet — add one above.</p>;
  }

  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>${emp.salary?.toLocaleString()}</td>
            <td>
              <button onClick={() => onEdit(emp)}>Edit</button>
              <button onClick={() => onDelete(emp.id)} className="danger">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
