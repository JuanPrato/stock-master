"use client";

import { Button } from "@/components/shadcn/ui/button";
import { SessionPayload } from "@/lib/session";
import { clientLogOut } from "@/lib/api.utils";
import { useRouter } from "next/navigation";

interface Props {
  user?: SessionPayload;
}

export default function SessionButton({ user }: Props) {

  const router = useRouter();

  if (!user) {
    return null;
  }

  async function handleLogOut() {
    await clientLogOut();
    router.refresh();
  }

  return (
    <Button onClick={handleLogOut}>{user?.userName}</Button>
  )
}