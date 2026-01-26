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

/** Dashboard header  to '/dashboard/[username] and 'logout' */
function DashboardHeader(props: DashboardHeaderProps): ReactElement {
  return (
    <div className="flex flex-row bg-foreground p-2 justify-between items-center border-b-5 border-foreground-lighter">
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

  if (!auth) {
    return <div>Loading...</div>;
  }

  if (auth.isLoading || !auth.user) {
    return <div>Loading...</div>;
  }

  function handleUserLogout(logout: () => void) {
    logout();
    router.push("/login");
  }

  return (
    <div>
      <DashboardHeader
        user={auth.user}
        logout={() => {
          handleUserLogout(auth.logout);
        }}
      />
      {children}
    </div>
  );
}
