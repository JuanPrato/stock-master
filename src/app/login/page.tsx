"use client";

import { Button } from "@/components/shadcn/ui/button";
import { logIn } from "@/lib/api.utils";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  async function handleLogin() {
    await logIn();
    router.push("/");
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <Button onClick={() => handleLogin()}>LOGIN</Button>
    </div>
  );
}