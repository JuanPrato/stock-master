import { createSession, deleteSession } from "@/lib/session";

export async function POST(request: Request) {
  deleteSession();
  await createSession("juan@juan.com");

  return Response.json({});
}