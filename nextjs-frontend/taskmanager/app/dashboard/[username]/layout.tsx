"use client";

import { ReactElement, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Navigate } from "@/lib/components";
import { User } from "@/lib/api/types/user";
import { useAuth } from "../../auth/AuthContext";

interface DashboardHeaderProps {
  children?: ReactNode;
  user: User;
  logout: () => void;
}

function DashboardHeader(props: DashboardHeaderProps): ReactElement {
  return (
    <div className="flex flex-row bg-foreground p-2 justify-between items-center">
      <Navigate variant="medium" href={`/dashboard/${props.user.username}`}>
        {props.user.nickname} Profile
      </Navigate>
      <h1 className="">Task Manager</h1>
      <Button variant="medium" onClick={props.logout}>
        Logout
      </Button>
    </div>
  );
}

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = useAuth();
  const router = useRouter();

  if (auth.isLoading || !auth.user) {
    return <div>Loading...</div>;
  }

  function handleUserLogout() {
    auth.logout();
    console.debug("logged out and routing to home");
    router.push("/register");
  }

  return (
    <div>
      <DashboardHeader user={auth.user} logout={handleUserLogout} />
      {children}
    </div>
  );
}
