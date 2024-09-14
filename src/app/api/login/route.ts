import { createSession, deleteSession } from "@/lib/session";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  deleteSession();
  await createSession({ email: "juan@juan.com", userName: "JuanPrato" });
  revalidateTag("user");

  return Response.json({});
}