"use client";

import React, { ReactElement, useEffect } from "react";
import { User } from "@/lib/types/user";
import { useAuth } from "../auth/AuthContext";
import { createProject } from "@/lib/api/projects";
import { CreateProjectDto, Project } from "@/lib/types/project";
import { getProjectsByUserId } from "@/lib/api/users";
import { Button } from "@/lib/components";

export default function UserDashboard({
  params,
}: {
  params: Promise<{ user: User }>;
}) {
  // const { user } = use(params); // dont need params because user is defined in auth context
  const auth = useAuth();

  // Wait for auth to be initialized
  if (auth?.isLoading) {
    // improve
    return <div>Loading...</div>;
  }

  // console.log(auth?.user);
  // console.log(auth?.user?.projects);

  interface ProjectsNavigationProps {
    projects: Project[];
  }
  function ProjectsNavigation(props: ProjectsNavigationProps): ReactElement {
    return (
      <div>
        <ul>
          {props.projects.map((project: Project) => (
            <li key={project.id}>
              <h2>{project.name}</h2>
              <h3>{project.description ?? ""}</h3>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  async function handleCreateProject(name?: string) {
    if (auth?.user?.id == undefined) {
      return;
    }
    if (name == undefined) {
      return;
    }

    const dto: CreateProjectDto = {
      userId: auth.user.id,
      name: name,
    };
    const project: Project = await createProject(dto);
    return project;
  }

  return (
    <div>
      <h1 className="mt-20 text-center">
        Welcome {auth?.user?.nickname ?? auth?.user?.username}
      </h1>
      <div className="flex flex-col items-center bg-foreground">
        {/* Create new project button */}
        <div className="border-1">
          <Button onClick={handleCreateProject}>
            <div className="px-4 py-2">Create New Project</div>
          </Button>
        </div>

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
