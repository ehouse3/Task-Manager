"use client";

import { ReactElement, ReactNode } from "react";
import { Button, Navigate } from "@/lib/components";
import { User } from "@/lib/api/types/user";
import { useAuth } from "../../auth/AuthContext";

interface UserHeaderProps {
  children?: ReactNode;
  user: User;
  logout: () => void;
}

function UserHeader(props: UserHeaderProps): ReactElement {
  return (
    <div className="flex flex-row">
      <Button onClick={props.logout}>Logout</Button>
      <Navigate href={`/dashboard/${props.user.username}`}>
        {props.user.nickname} Profile
      </Navigate>
    </div>
  );
}

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = useAuth();

  if (auth.isLoading) {
    return;
  }

  if (!auth.user) {
    console.debug("Auth user not present!");
    return;
  }

  return (
    <div>
      <UserHeader user={auth.user} logout={auth.logout} />
      {children}
    </div>
  );
}
