import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define a route matcher for protected routes
// These routes will require authentication
const isProtectedRoute = createRouteMatcher(["/generate-program", "/profile"]);

// Clerk middleware to handle authentication
export default clerkMiddleware(async (auth, req) => {
  // If the request matches a protected route, enforce authentication
  if (isProtectedRoute(req)) await auth.protect();
});

// Configuration for the middleware
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    // This ensures the middleware doesn't interfere with static asset loading
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    // This ensures API routes are processed by the middleware
    "/(api|trpc)(.*)",
  ],
};
