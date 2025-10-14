"use client";

import { useState, useEffect } from "react";
import { CreateUserDto, User, createUser, getAllUsers } from "@/lib/api/users";
import { Project, CreateProjectDto, createProject, getAllProjects } from "@/lib/api/projects";
import { Task, CreateTaskDto, createTask, getAllTasks } from "@/lib/api/tasks";

import { Button } from "@/lib/components";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

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
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users");
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
      fetchUsers();
    } catch (err) {
      console.error("Failed to create user:", err);
    }
  };

  const handleCreateProject = async () => {
    try {
      const name: string | null = prompt("New Project:","project") ?? "project";
      const description: string | null = prompt("Description:","description") ?? "description";
      const ownerId: number | null = Number(prompt("OwnerId:","1")) ?? 1;
      const taskId: number | null = Number(prompt("TaskId","1")) ?? 1;

      const newProject: CreateProjectDto = {
        name: name,
        description: description,
        ownerId: ownerId,
        taskId: taskId
      }
      await createProject(newProject);
      fetchProjects();
    } catch (err) {
      console.error("Failed to create project:", err);
    }
  };

  const handleCreateTask = async () => {
    try {
      const title: string | null = prompt("New Project:");
      const description: string | null = prompt("New Project:");
      const projectId: number | null = Number(prompt("ProjectId:"));
      
      const newTask: CreateTaskDto = {
        title: title ?? "task",
        description: description ?? "description",
        projectId: projectId ?? 0
      }

      await createTask(newTask);
      fetchTasks();
    } catch (err) {
      console.error("Failed to create task", err);
    }
  };
  

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Task Manager - Users</h1>

      <Button onClick={handleCreateUser} buttonText="Create Test User" />
      <Button onClick={handleCreateProject} buttonText="Create Test Project" />
      <Button onClick={handleCreateTask} buttonText="Create Test Task" />

      <div className="space-y-4">
        {users.length === 0 ? (
          <p>No users found. Click the button to create one!</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="p-2 border rounded shadow">
              <p>
                <strong>ID:</strong> {user.id}
              </p>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <p>No projects found. Click the button to create one!</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="p-2 border rounded shadow">
              <p>
                <strong>ID:</strong> {project.id}
              </p>
              <p>
                <strong>name:</strong> {project.name}
              </p>
              <p>
                <strong>description:</strong> {project.description}
              </p>
              <p>
                <strong>OwnerId:</strong> {project.ownerId}
              </p>
              <p>
                <strong>taskId:</strong> {project.taskId}
              </p>
              
            </div>
          ))
        )}
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p>No Tasks found. Click the button to create one!</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="p-2 border rounded shadow">
              <p>
                <strong>ID:</strong> {task.id}
              </p>
              <p>
                <strong>title:</strong> {task.title}
              </p>
              <p>
                <strong>description:</strong> {task.description}
              </p>
              <p>
                <strong>projectId:</strong> {task.projectId}
              </p>
              
            </div>
          ))
        )}
      </div>
    </main>
  );
}
