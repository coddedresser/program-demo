import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }

    const dbUser = await prisma.user.upsert({
      where: { kindeId: user.id },
      update: {
        email: user.email!,
        name: user.given_name || user.family_name || "Guest",
      },
      create: {
        kindeId: user.id,
        email: user.email!,
        name: user.given_name || user.family_name || "Guest",
        image: user.picture || null,
      },
    });

    return new Response(JSON.stringify(dbUser), { status: 200 });
  } catch (error) {
    console.error("Error syncing user:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
