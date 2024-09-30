// pages/api/roleselection.ts

import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      console.error("Account Identification Failed: User or User ID is missing");
      throw new Error("Account Identification Failed");
    }

    const { roleName } = await request.json();

    if (!roleName || (roleName !== 'FREELANCER' && roleName !== 'CLIENT')) {
      return NextResponse.json({ error: 'Invalid Role' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        roleName,
      },
    });

    console.log(`User ${updatedUser.id} role updated to ${roleName}`);

    if (roleName === "FREELANCER") {
      // Create Freelancer entry if user selects FREELANCER role
      await prisma.freelancer.create({
        data: {
          userId: updatedUser.id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          // Add other fields as needed
        },
      });
    } else if (roleName === "CLIENT") {
      // Create Client entry if user selects CLIENT role
      await prisma.client.create({
        data: {
          userId: updatedUser.id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          // Add other fields as needed
        },
      });
    }

    const redirectUrl = roleName === "FREELANCER"
      ? `${new URL(request.url).origin}/pages/dashboard/freelancer`
      : `${new URL(request.url).origin}/pages/dashboard/client`;

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in role selection POST route:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unexpected error in role selection POST route:", error);
      return NextResponse.json({ error: "Unexpected error occurred" }, { status: 500 });
    }
  }
}
