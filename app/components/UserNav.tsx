import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import prisma from "@/app/lib/db"; // Import Prisma client
import Image from "next/image";

export async function UserNav() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let dashboardUrl = "/pages/dashboard";
  
  if (user) {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        freelancer: true,
        client: true,
      },
    });

    if (dbUser) {
      if (dbUser.roleName === 'FREELANCER' && dbUser.freelancer) {
        dashboardUrl = `/pages/freelancer/${dbUser.freelancer.id}/profile`;
      } else if (dbUser.roleName === 'CLIENT' && dbUser.client) {
        dashboardUrl = `/pages/client/${dbUser.client.id}/profile`;
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3 bg-yellow-400">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
          <Image
            src={
              user?.picture ??
              "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            alt="Image of the user"
            className="rounded-full h-8 w-8 hidden lg:block"
            width={32}
            height={32}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {user ? (
          <>
            <DropdownMenuItem>
              <LogoutLink className="w-full">Logout</LogoutLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={dashboardUrl} className="w-full">Dashboard</Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <RegisterLink className="w-full">Sign Up</RegisterLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LoginLink className="w-full">Login</LoginLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
