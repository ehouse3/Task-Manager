"use client";

import React, { useEffect } from "react";
import { User } from "@/lib/types/user";
import { useAuth } from "../auth/AuthContext";
import { createProject } from "@/lib/api/projects";
import { CreateProjectDto, Project } from "@/lib/types/project";

export default function UserDashboard({ params }: { params: Promise<{ user: User }> }) {

  // const { user } = use(params); // dont need params because user is defined in auth context
  const auth = useAuth();

  useEffect(() => {
    if (!auth || !auth.user) {
      return;
    }
    fetchProjects(auth.user.id);
  });

  // Wait for auth to be initialized
  if (auth?.isLoading) { // improve
    return <div>Loading...</div>;
  }

  // if (!auth || !auth.user) {
  //   throw new Error("Auth or user not present");
  // }
  // const user: User = auth.user;

  function fetchProjects(userId: number) {
    console.log("Fetching projects for user", userId);
    return;
  }
  // const [users, setUsers] = useState<User[] | null>(null);
  // useEffect(() => {
  //   async function fetchData() {
  //     const response: User[] = await getAllUsers();

  //     setUsers(response);
  //   }
  //   fetchData();
  // }, []);

  return (
    <div>
      {/* <h1>Hello {user.nickname ?? user.username}</h1> */}
      <div>

      </div>
      <div>
        <ul>
          {}
        </ul>
      </div>
      <ul>
        {/* {users?.map((user: User) => (
          <div key={user.id}>
            <li>username: {user.username}</li>
            <li>password: {user.email}</li>
          </div>
        ))} */}
      </ul>
    </div>
  );
}
