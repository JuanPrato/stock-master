"use client"

import Link from "next/link";
import { Button } from "../shadcn/ui/button";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BackButton() {

  const pathname = usePathname();

  if (pathname === "/") {
    return undefined;
  }

  return (
    <Link href="/">
      <Button>
        <ArrowLeft className="mr-2 h-4 max-w-4" />
        Volver al Dashboard
      </Button>
    </Link>
  );
}