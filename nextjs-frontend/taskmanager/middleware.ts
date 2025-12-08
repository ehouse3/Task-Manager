import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Activating middleware for:", request.nextUrl.pathname);

  // Public endpoints (token not required)
  if (request.nextUrl.pathname.startsWith("/login")) {
    // '/login'
    const response: NextResponse = NextResponse.next();
    return response;
  }
  if (request.nextUrl.pathname.startsWith("/register")) {
    // '/register'
    const response: NextResponse = NextResponse.next();
    return response;
  }
  if (
    request.nextUrl.pathname.startsWith("/") &&
    request.nextUrl.pathname.endsWith("/")
  ) {
    // '/'
    const response: NextResponse = NextResponse.next();
    return response;
  }

  const token: RequestCookie | undefined = request.cookies.get("token");
  console.log(token);
  if (token == undefined || token.value == "") {
    console.log("redirecting to '/login' page because token was invalid");
    const response: NextResponse = NextResponse.redirect(
      new URL("/login", request.url)
    );
    return response;
  }

  // JWT filter will authenticate token on api requests
  const response: NextResponse = NextResponse.next();
  return response;
}

export const config = {
  // Matcher to apply middleware onto
  matcher: ["/login", "/register", "/dashboard", "/"],
};
