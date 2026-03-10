"use client";

import { useAuth } from "../../../auth/AuthContext";
import React, { ReactElement, useEffect, useState } from "react";
import { Button } from "@/lib/components";
import { createTask, updateTask } from "@/lib/api/tasks";
import {
  updateProject,
  deleteProject,
  getProjectById,
} from "@/lib/api/projects";
import { CreateTaskDto, Task, UpdateTaskDto } from "@/lib/api/types/task";
import { Project, UpdateProjectDto } from "@/lib/api/types/project";
import { useRouter } from "next/navigation";

export default function Page({
  params,
}: {
  params: Promise<{
    username: string;
    projectId: number;
  }>;
}) {
  const auth = useAuth();
  const router = useRouter();
  const [result, setResult] = useState<string>(""); // Result of functions
  const [project, setProject] = useState<Project | null>(null); // Page's project

  /** Retrieve project name from params */
  useEffect(() => {
    params.then(async (param) => {
      setProject(await getProjectById(param.projectId));
    });
  }, [params]);

  // Wait for auth to be initialized
  if (!auth || auth.isLoading) {
    return <div>Loading...</div>;
  }

  async function handleUpdateProject() {
    try {
      if (!project) {
        setResult("Project not found!");
        return;
      }

      let newName: string | null = prompt(
        "New project name (leave empty to not change name):",
        project.name,
      );

      // Do not update string on empty case
      if (newName?.trim() === "") {
        newName = null;
      }

      const newDescription: string | null = prompt(
        "New project description (optional):",
      );

      const dto: UpdateProjectDto = {
        name: newName ?? undefined,
        description: newDescription ?? undefined,
      };

      if (Object.keys(dto).length === 0) {
        setResult("No changes to update");
        return;
      }

      setResult("Updating project...");

      await updateProject(project.id, dto);
      setResult("Project updated successfully!");

      await auth?.refreshUser();
      setProject(await getProjectById(project.id));
    } catch (error) {
      console.error("Error updating project:", error);
      setResult("Failed to update project. Please try again.");
    }
  }

  async function handleDeleteProject() {
    try {
      if (auth?.user?.id == undefined) {
        setResult("User Id is not present to delete the project!");
        return;
      }

      if (!project) {
        setResult("Project not found!");
        return;
      }

      const confirmed = confirm(
        `Delete project "${project.name}"? This action cannot be undone.`,
      );

      if (!confirmed) return;

      setResult("Deleting project...");
      await deleteProject(auth.user.id, project.id);

      setResult("Project deleted successfully");
      await auth.refreshUser();

      router.push(`/dashboard/${auth.user.username}`);
    } catch (error) {
      console.error("Error deleting project:", error);
      setResult("Failed to delete project. Please try again.");
    }
  }

  async function handleCreateTask() {
    try {
      if (!project) {
        setResult("Project not found!");
        return;
      }

      const title: string | null = prompt(
        "What should the new task be titled?",
      );

      if (title == null || title == "") {
        setResult("Title for new task cannot be empty");
        return;
      }

      // const description: string | null = prompt("Describe the project");

      // const dueDate: string | null = prompt(
      //   "When should the project be done by?",
      // );

      const dto: CreateTaskDto = {
        title: title,
        projectId: project.id,
      };
      let task: Task = await createTask(dto);
      setResult("Task created successfully!");

      // if (description) {
      //   const updateTaskDto: UpdateTaskDto = {
      //     description: description ?? undefined,
      //     dueDate: dueDate ?? undefined,
      //   };

      //   task = await updateTask(task.id, updateTaskDto);
      // }

      // Refresh project to update tasks
      setProject(await getProjectById(project.id));
      return task;
    } catch (error) {
      console.error("Error creating task:", error);
      setResult("Failed to create task. Please try again.");
    }
  }

  interface TasksListProps {
    tasks: Task[];
  }
  /** Component that renders the list of projects provided */
  function TasksList(props: TasksListProps): ReactElement {
    return (
      <ul className="flex flex-row flex-wrap justify-center">
        {props.tasks.map((task: Task) => (
          // Needs new colors
          <div key={task.id}>
            <li className="flex flex-col min-w-sm items-center m-2 text-text-dark bg-foreground-lighter rounded p-2 hover:bg-foreground-lighter-hover">
              <h2 className="">{task.title}</h2>
              <div className="min-h-12">
                <h3>{task.description ?? ""}</h3>
                <h3>Priority: {task.priority}</h3>
                <h3>{task.dueDate}</h3>
              </div>
            </li>
          </div>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h1 className="mt-20 text-center">Task Dashboard for {project?.name}</h1>

      <div className="flex flex-col items-center bg-foreground py-10">
        {/* Button Flexbox */}
        <div className="flex flex-row justify-center gap-2">
          <Button variant="medium" onClick={handleCreateTask}>
            Create New Task
          </Button>
          <Button variant="medium" onClick={handleUpdateProject}>
            Update Project
          </Button>
          <Button variant="medium" onClick={handleDeleteProject}>
            Delete Project
          </Button>
        </div>

        {/* Result message */}
        <div className="p-3 text-center">
          <h3 className="text-red-800">{result}</h3>
        </div>

        {/* Display project's tasks */}
        <div className="m-10">
          {project?.tasks != undefined && project?.tasks.length > 0 ? (
            <TasksList tasks={project?.tasks}></TasksList>
          ) : (
            <h2 className="">No tasks found</h2>
          )}
        </div>
      </div>
    </div>
  );
}
