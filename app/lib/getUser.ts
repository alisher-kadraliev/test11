// lib/getUser.ts

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getUserData() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return user;
}
