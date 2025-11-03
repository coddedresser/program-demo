import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export default withAuth(
  async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Allow all public paths defined below
    if (
      pathname === "/" ||
      pathname.startsWith("/api/auth/health") ||
      pathname.startsWith("/api/generate-coloring") ||
      pathname.startsWith("/api/generate-tracing") ||
      pathname.startsWith("/api/analytics/track")
    ) {
      return NextResponse.next();
    }

    // ✅ Get authenticated user info from Kinde session
    const user = req.kindeAuth?.user;

    // Not logged in → redirect to login
    if (!user) {
      return NextResponse.redirect(new URL("/api/auth/login", req.url));
    }

    // ✅ Check if user is admin when accessing /admin routes
    if (pathname.startsWith("/admin")) {
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        select: { isAdmin: true },
      });

      if (!dbUser?.isAdmin) {
        // Non-admins → redirect to home
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Continue if all checks pass
    return NextResponse.next();
  },
  {
    isReturnToCurrentPage: true,
    publicPaths: [
      "/",
      "/api/auth/health",
      "/api/generate-coloring",
      "/api/generate-tracing",
      "/api/analytics/track",
    ],
    loginPage: "/api/auth/login",
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/create/:path*",
    // Exclude Next.js internals and static assets
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
