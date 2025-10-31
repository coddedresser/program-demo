import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
    // Optional: Add any custom middleware logic here
    console.log("Kinde Auth middleware running for:", req.nextUrl.pathname);
  },
  {
    isReturnToCurrentPage: true,
    publicPaths: [
      "/", 
      "/api/auth/health",
      "/api/generate-coloring",
      "/api/generate-tracing",
      "/api/analytics/track"
    ], // Allow public access to home page, health check, and image generation APIs
    loginPage: "/api/auth/login", // Custom login page
  }
);

export const config = {
  matcher: [
    // Run on everything but Next internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ]
};
