"use client";

import React, { ReactElement, useState } from "react";
import { User } from "@/lib/types/user";
import { useAuth } from "../auth/AuthContext";
import { createProject } from "@/lib/api/projects";
import { CreateProjectDto, Project } from "@/lib/types/project";
import { Button } from "@/lib/components";
import { useRouter } from "next/router";

export default function UserDashboard({
  params,
}: {
  params: Promise<{ user: User }>;
}) {
  const [resultCreateProject, setResultCreateProject] = useState<string>(""); // Result of creating user
  // const router = useRouter();

  const auth = useAuth();
  // const projects

  // Wait for auth to be initialized
  if (auth?.isLoading) {
    // improve
    return <div>Loading...</div>;
  }

  interface ProjectsNavigationProps {
    projects: Project[];
  }
  /** Component that renders the list of projects provided */
  function ProjectsNavigation(props: ProjectsNavigationProps): ReactElement {
    return (
      <ul className="flex flex-row">
        {props.projects.map((project: Project) => (
          // Needs new colors
          <li
            className="border-1 m-5 bg-button text-text-light p-2"
            key={project.id}
          >
            <h2>{project.name}</h2>
            <h3>{project.description ?? ""}</h3>
          </li>
        ))}
      </ul>
    );
  }

  async function handleCreateProject() {
    try {
      if (auth?.user?.id == undefined) {
        setResultCreateProject(
          "User Id is not present to create a new project!"
        );
        return;
      }

      const name: string | null = prompt(
        "What should the new project be named?"
      );

      if (name == undefined || name == "") {
        setResultCreateProject("Name for new project can not be empty");
        return;
      }

      // Creating new project
      setResultCreateProject("");
      const dto: CreateProjectDto = {
        userId: auth.user.id,
        name: name,
      };
      const project: Project = await createProject(dto);
      setResultCreateProject("Project created successfully!");

      auth.refreshUser(); // Refetch user to display newly created project
      return project;
    } catch (error) {
      console.error("Error creating project:", error);
      setResultCreateProject("Failed to create project. Please try again.");
    }
  }

  return (
    <div>
      <h1 className="mt-20 text-center">
        Welcome {auth?.user?.nickname ?? auth?.user?.username}!
      </h1>
      <div className="flex flex-col items-center bg-foreground py-10">
        {/* Create new project button */}
        <div className="border-1">
          <Button
            variant="small"
            onClick={() => {
              handleCreateProject();
            }}
          >
            Create New Project
          </Button>
        </div>

        {/* Result message */}
        {resultCreateProject && (
          <div className="mt-3 text-center">
            <h3 className="text-red-800">{resultCreateProject}</h3>
          </div>
        )}

        {/* List and Navigate to projects */}
        <div className="flex flex-row my-10 border-1">
          {auth?.user?.projects != null && auth?.user?.projects?.length > 0 ? (
            <ProjectsNavigation projects={auth.user.projects} />
          ) : (
            <h2>No projects found</h2>
          )}
        </div>

        {/* Calendar? */}
        <div></div>
      </div>
    </div>
  );
}
