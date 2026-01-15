"use client";

import { useAuth } from "@/app/auth/AuthContext";
import React, { useEffect, useState } from "react";
import { Button } from "@/lib/components";
import { createTask } from "@/lib/api/tasks";
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
  const [resultCreateTask, setResultCreateTask] = useState<string>(""); // Result of creating task
  const [projectId, setProjectId] = useState<number | null>(null);

  /** Retrieve project name from params */
  useEffect(() => {
    params.then((param) => {
      setProjectId(param.projectId);
    });
  }, [params]);

  // Wait for auth to be initialized
  if (auth?.isLoading) {
    return <div>Loading...</div>;
  }

  async function handleCreateTask() {
    try {
      if (auth?.user?.id == undefined) {
        setResultCreateTask("User Id is not present to create a new task!");
        return;
      }

      const project: Project | undefined = auth.user.projects?.find(
        (project) => {
          return project.id === projectId;
        }
      );

      if (!project) {
        setResultCreateTask("Project not found!");
        return;
      }

      const title: string | null = prompt(
        "What should the new task be titled?"
      );

      if (title == undefined || title == "") {
        setResultCreateTask("Title for new task cannot be empty");
        return;
      }

      const description: string | null = prompt(
        "Describe the task (optional):"
      );

      // Creating new task
      setResultCreateTask("");
      const dto: CreateTaskDto = {
        title: title,
        description: description || undefined,
        projectId: project.id,
      };
      const task: Task = await createTask(dto);
      setResultCreateTask("Task created successfully!");

      // Refresh user to update projects/tasks
      auth.refreshUser();
      return task;
    } catch (error) {
      console.error("Error creating task:", error);
      setResultCreateTask("Failed to create task. Please try again.");
    }
  }

  return (
    <div>
      <Button onClick={handleCreateTask}>Create New Task</Button>
      {/* Result message */}
      {resultCreateTask && (
        <div className="mt-3 text-center">
          <h3 className="text-red-800">{resultCreateTask}</h3>
        </div>
      )}
    </div>
  );
}
