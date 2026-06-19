import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const publicOnlyRoutes = ["/login", "/register"];
const privateRoutes = ["/dashboard", "/blood-donation-request"];

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const isPublicOnly = publicOnlyRoutes.some((r) => pathname.startsWith(r));
  const isPrivate = privateRoutes.some((r) => pathname.startsWith(r));

  if (isPublicOnly && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isPrivate && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/blood-donation-request/:path*",
    "/login",
    "/register",
  ],
};
