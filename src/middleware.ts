import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const url = request.nextUrl;

  // If the user is not authenticated
  if (!session?.user) {
    // Allow unauthenticated users to access only "home", "signin", and "signup"
    if (
      url.pathname.startsWith("/signin") ||
      url.pathname.startsWith("/signup") ||
      url.pathname === "/"
    ) {
      return NextResponse.next();
    }

    // Redirect unauthenticated users trying to access other routes
    const redirectUrl = new URL("/signin", request.url);
    redirectUrl.searchParams.set(
      "message",
      "Please login first to access this page."
    );
    return NextResponse.redirect(redirectUrl);
  } else {
    // If the user is authenticated
    if (
      url.pathname.startsWith("/signin") ||
      url.pathname.startsWith("/signup")
    ) {
      return NextResponse.redirect(new URL("/", request.url)); // Redirect authenticated users away from signin/signup
    }

    // Handle route access based on user role
    if (session.user.role === "user") {
      if (url.pathname.startsWith("/dashbord")) {
        return NextResponse.redirect(new URL("/profile", request.url)); // Users should be redirected to "profile" if trying to access "dashboard"
      }
    } else if (session.user.role === "admin") {
      // Admins have access to all routes except "signin" and "signup"
      return NextResponse.next();
    }
  }

  // Allow the request to proceed for all other cases
  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup", "/dashbord", "/profile", "/"], // Match the required routes
};
