import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  console.log('User object:', user); // Log user object for debugging

  // Check if user is valid
  if (!user || !user.id) {
    return NextResponse.json({ error: "Account Identification Failed" }, { status: 401 });
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        email: user.email ?? "",
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        id: user.id,
        profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
      },
    });
    return NextResponse.redirect("http://localhost:3000/pages/RegEntPage");
  }

  return NextResponse.redirect("http://localhost:3000");
}

// app/api/auth/creation/route.ts
/* import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Your logic here
  const data = await request.json();

  // Example response
  if (data) {
    return NextResponse.json({ message: 'Success' });
  }

  return NextResponse.json({ error: 'No data provided' }, { status: 400 });
} */