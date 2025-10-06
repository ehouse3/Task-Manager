'use client';

import { useState, useEffect } from 'react';
import { userAPI, User } from '@/lib/api';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userAPI.getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      const newUser: User = {
        id: 3,
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };
      await userAPI.createUser(newUser);
      fetchUsers(); // Refresh the list
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Task Manager - Users</h1>
      
      <button
        onClick={handleCreateUser}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create Test User
      </button>

      <div className="space-y-4">
        {users.length === 0 ? (
          <p>No users found. Click the button to create one!</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="p-4 border rounded shadow">
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Created:</strong> {user.createdAt}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}