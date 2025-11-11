import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export default withAuth(
  async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // ✅ Allow all public paths below (no login required)
    if (
      pathname === "/" ||
      pathname.startsWith("/create") || // ✅ Allow access to /create without login
      pathname.startsWith("/api/auth/health") ||
      pathname.startsWith("/api/generate-coloring") ||
      pathname.startsWith("/api/generate-tracing") ||
      pathname.startsWith("/api/analytics/track")
    ) {
      return NextResponse.next();
    }

    // ✅ Get authenticated user info from Kinde session
    const user = req.kindeAuth?.user;

    // 🔒 Not logged in → redirect to login page
    if (!user) {
      return NextResponse.redirect(new URL("/api/auth/login", req.url));
    }

    // ✅ Restrict admin-only routes
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

    // ✅ Allow access if all checks pass
    return NextResponse.next();
  },
  {
    isReturnToCurrentPage: true,
    publicPaths: [
      "/", // homepage
      "/create", // ✅ create page is now public
      "/api/auth/health",
      "/api/generate-coloring",
      "/api/generate-tracing",
      "/api/analytics/track",
    ],
    loginPage: "/api/auth/login",
  }
);

// ✅ Matcher config: don’t include /create
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    // ⚠️ removed "/create/:path*" so /create won’t be protected
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
