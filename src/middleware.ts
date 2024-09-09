import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function middleware(request: NextRequest) {

  const pathname = request.nextUrl.pathname;

  if (privateRoutes.includes(pathname)) {
    const session = await getSession();
    console.log("session", session);
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}

const privateRoutes = ["/", "/inventario", "/ordenes"];