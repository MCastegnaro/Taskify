import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("token")?.value || request.headers.get("authorization");

  const isAuthenticated = !!token;

  const isPublicRoute = ["/login", "/register"].includes(
    request.nextUrl.pathname,
  );

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/tasks", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tasks", "/login", "/register"],
};
