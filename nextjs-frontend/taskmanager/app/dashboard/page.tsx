"use client";

import React, { useEffect, useState } from "react";
import { getAllUsers } from "@/lib/api/users";
import { User } from "@/lib/types/user";

export default function UserDashboard() {
  const [users, setUsers] = useState<User[] | null>(null);
  useEffect(() => {
    async function fetchData() {
      const response: User[] = await getAllUsers();

      setUsers(response);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>

      <ul>
        {users?.map((user: User) => (
          <div key={user.id}>
            <li>username: {user.username}</li>
            <li>password: {user.email}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}
