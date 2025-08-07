import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../api/users';

export default function UserList({ onSelectUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(res => setUsers(res.data.users));
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter(u => u._id !== id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-green-100 text-green-700">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-b hover:bg-green-50">
              <td className="py-2 px-4">{u.name}</td>
              <td className="py-2 px-4">{u.email}</td>
              <td className="py-2 px-4 capitalize">{u.role}</td>
              <td className="py-2 px-4 flex gap-2">
                <button
                  onClick={() => onSelectUser(u._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-sm"
                >
                  Attendance
                </button>
                <button
                  onClick={() => handleDelete(u._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}