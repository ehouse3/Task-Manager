"use client";

import React, { ReactElement, useEffect } from "react";
import { User } from "@/lib/types/user";
import { useAuth } from "../auth/AuthContext";
import { createProject } from "@/lib/api/projects";
import { CreateProjectDto, Project } from "@/lib/types/project";
import { getProjectsByUserId } from "@/lib/api/users";

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

  console.log(auth?.user);
  console.log(auth?.user?.projects);

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

  return (
    <div>
      <h1>Welcome {auth?.user?.nickname ?? auth?.user?.username}</h1>

      {/* Create new project */}
      <div>
      
      </div>
      
      {/* List and Navigate to projects */}
      <div>
        {auth?.user?.projects ? (
          <ProjectsNavigation projects={auth.user.projects} />
        ) : (
          <h2>No projects found</h2>
        )}
      </div>

      {/* Calendar? */}
      <div>

      </div>
    </div>
  );
}
