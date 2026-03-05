"use client";

import { useAuth } from "../../../auth/AuthContext";
import React, { useEffect, useState } from "react";
import { Button } from "@/lib/components";
import { createTask } from "@/lib/api/tasks";
import { updateProject, deleteProject } from "@/lib/api/projects";
import { CreateTaskDto, Task } from "@/lib/api/types/task";
import { Project } from "@/lib/api/types/project";

export default function Page({
  params,
}: {
  params: Promise<{
    username: string;
    projectId: number;
  }>;
}) {
  const auth = useAuth();
  const router = require("next/navigation").useRouter();
  const [resultCreateTask, setResultCreateTask] = useState<string>(""); // Result of creating task
  const [projectId, setProjectId] = useState<number | null>(null); // Current page's selected project

  /** Retrieve project name from params */
  useEffect(() => {
    params.then((param) => {
      setProjectId(param.projectId);
    });
  }, [params]);

  // Wait for auth to be initialized
  if (!auth || auth.isLoading) {
    return <div>Loading...</div>;
  }

  async function handleUpdateProject() {
    try {
      if (!projectId) {
        setResultCreateTask("No project selected");
        return;
      }

      const project: Project | undefined = auth?.user.projects?.find(
        (project) => project.id === projectId,
      );

      if (!project) {
        setResultCreateTask("Project not found!");
        return;
      }

      const newName: string | null = prompt("New project name:", project.name);
      if (newName === null) return; // user cancelled
      if (newName.trim() === "") {
        setResultCreateTask("Project name cannot be empty");
        return;
      }

      const newDescription: string | null = prompt(
        "New project description (optional):",
        project.description ?? "",
      );

      const dto: Partial<Project> = {};
      if (newName !== project.name) dto.name = newName;
      if (newDescription !== project.description)
        dto.description = newDescription ?? undefined;

      if (Object.keys(dto).length === 0) {
        setResultCreateTask("No changes to update");
        return;
      }

      setResultCreateTask("Updating project...");
      await updateProject(project.id, dto as any);
      setResultCreateTask("Project updated successfully!");
      await auth?.refreshUser();
    } catch (error) {
      console.error("Error updating project:", error);
      setResultCreateTask("Failed to update project. Please try again.");
    }
  }

  async function handleDeleteProject() {
    try {
      if (!projectId) {
        setResultCreateTask("No project selected");
        return;
      }

      const project: Project | undefined = auth?.user.projects?.find(
        (project) => project.id == projectId, // TODO: projectId being interprepted as string
      );

      // console.log(
      //   "typeof project.id",
      //   typeof project?.id,
      //   "typeof page's state projectId",
      //   typeof projectId,
      // );

      if (!project) {
        setResultCreateTask("Project not found!");
        return;
      }

      const confirmed = confirm(
        `Delete project "${project.name}"? This action cannot be undone.`,
      );

      if (!confirmed) return;

      setResultCreateTask("Deleting project...");
      await deleteProject(project.id);
      setResultCreateTask("Project deleted successfully");
      await auth?.refreshUser();
      try {
        router.push(`/dashboard/${auth?.user.username}`);
      } catch (e) {}
    } catch (error) {
      console.error("Error deleting project:", error);
      setResultCreateTask("Failed to delete project. Please try again.");
    }
  }

  async function handleCreateTask() {
    try {
      const project: Project | undefined = auth?.user.projects?.find(
        (project) => {
          return project.id == projectId;
        },
      );

      if (!project) {
        setResultCreateTask("Project not found!");
        return;
      }

      const title: string | null = prompt(
        "What should the new task be titled?",
      );

      if (title == null || title == "") {
        setResultCreateTask("Title for new task cannot be empty");
        return;
      }

      const description: string | null = prompt(
        "Describe the task (optional):",
      );

      // Creating new task
      setResultCreateTask("Creating Task");
      const dto: CreateTaskDto = {
        title: title,
        projectId: project.id,
      };
      const task: Task = await createTask(dto);
      setResultCreateTask("Task created successfully!");

      // Refresh user to update projects/tasks
      auth?.refreshUser();
      return task;
    } catch (error) {
      console.error("Error creating task:", error);
      setResultCreateTask("Failed to create task. Please try again.");
    }
  }

  return (
    <div className="flex flex-row justify-center gap-2 bg-foreground py-10 mt-20">
      <Button variant="medium" onClick={handleCreateTask}>
        Create New Task
      </Button>
      <Button variant="medium" onClick={handleUpdateProject}>
        Update Project
      </Button>
      <Button variant="medium" onClick={handleDeleteProject}>
        Delete Project
      </Button>
      {/* Result message */}
      <div className="mt-3 text-center">
        <h3 className="text-red-800">{resultCreateTask}</h3>
      </div>
    </div>
  );
}
