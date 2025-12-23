"use client";

import React, { use, useContext, useEffect, useState } from "react";
import { getAllUsers, getProjectByUserId } from "@/lib/api/users";
import { User } from "@/lib/types/user";
import { useAuth } from "../auth/AuthContext";
import { createProject, getProjectById } from "@/lib/api/projects";
import { CreateProjectDto, Project } from "@/lib/types/project";

export default function UserDashboard({ params }: { params: Promise<{ user: User }> }) {

  // const { user } = use(params);
  const auth = useAuth();
  console.log(auth);

  // Wait for auth to be initialized
  if (auth?.isLoading) { // improve
    return <div>Loading...</div>;
  }

  if (!auth || !auth.user) {
    throw new Error("Auth or user not present");
  }
  const user: User = auth.user;
  console.log(user);

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
