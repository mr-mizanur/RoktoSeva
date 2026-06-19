import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/blood-donation-request/:path*"],
};
