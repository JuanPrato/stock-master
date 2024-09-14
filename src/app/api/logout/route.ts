import { deleteSession } from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";

export function PUT(request: Request) {
  deleteSession();
  revalidateTag("user");

  return Response.json({});
}