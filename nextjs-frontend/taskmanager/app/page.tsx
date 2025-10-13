'use client';

import { useState, useEffect } from 'react';
import { CreateUserDto, User, createUser, getAllUsers } from '@/lib/api/users';
import { Button } from '@/lib/components';

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
      const data = await getAllUsers();
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
      const username: string | null = prompt("New Username:");
      const email: string | null = prompt("New Email:");
      const password: string | null = prompt("New Password:");

      const newUser: CreateUserDto = {
        username: username ?? "username",
        email: email ?? "email",
        password: password ?? "password",
      };
      await createUser(newUser);
      fetchUsers(); // Refresh the list
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  const handleCreateTask = async () => {
    
    
  }

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Task Manager - Users</h1>
      
      <Button onClick={handleCreateUser} buttonText='Create Test User'/>
      

      <div className="space-y-4">
        {users.length === 0 ? (
          <p>No users found. Click the button to create one!</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="p-2 border rounded shadow">
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}