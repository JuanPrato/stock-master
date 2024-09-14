import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { ROUTES } from "@/lib/constants";

export async function middleware(request: NextRequest) {

  const pathname = request.nextUrl.pathname;

  if (routes.includes(pathname)) {
    const session = await getSession();

    const isLogin = pathname === ROUTES.LOGIN;

    if (!session && !isLogin) {
      return NextResponse.redirect(new URL('/login', request.url));
    } else if (session && isLogin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

const routes = ["/", "/inventario", "/ordenes", "/login"];

export const config = {
  matcher: routes
}
