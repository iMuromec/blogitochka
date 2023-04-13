import Link from "next/link";
import { useState } from "react";
import { signOut, signIn, useSession } from "next-auth/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import UserAvatar from "@/components/UserAvatar";
import { Icons } from "@/components/Icons";

import { createUrl } from "@/lib/utils";
import { menuItems } from "@/config/lk";

const AccountMenu = () => {
  const { data: session, status } = useSession();

  const [showAccountMenu, setShowAccountMenu] = useState(false);

  if (status === "loading") {
    return <UserAvatar.Skeleton />;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex outline-0 items-center gap-2  focus-visible:outline-none">
        <div
          className="flex items-center space-x-2"
          onClick={() =>
            session ? setShowAccountMenu(!showAccountMenu) : signIn()
          }
        >
          {session ? (
            <UserAvatar session={session} />
          ) : (
            <Icons.logIn className="h-4 w-4" />
          )}
        </div>
      </DropdownMenu.Trigger>
      {session && (
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="absolute z-50 right-0 rounded-md border border-slate-50 bg-white shadow-md animate-in slide-in-from-top-1 md:w-[240px]"
            align="end"
          >
            <div className="flex items-center justify-start gap-2 p-4">
              <div className="flex flex-col space-y-1 leading-none">
                {session?.user?.name && (
                  <p className="font-medium">{session?.user?.name}</p>
                )}
                {session?.user?.email && (
                  <p className="w-[200px] truncate text-sm text-slate-600">
                    {session?.user?.email}
                  </p>
                )}
              </div>
            </div>
            <DropdownMenu.Separator className="h-px bg-slate-200" />
            {session?.user?.site ? (
              menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={`${session?.user?.site || ""}${item.href}`}
                  className="w-full"
                >
                  <DropdownMenu.Item className="flex select-none items-center py-2 px-3 text-sm outline-none focus:bg-slate-50 focus:text-black cursor-pointer">
                    {item.title}
                  </DropdownMenu.Item>
                </Link>
              ))
            ) : (
              <Link
                href={createUrl(`/new-site`)}
                className="w-full font-normal"
              >
                <DropdownMenu.Item className="flex select-none items-center py-2 px-3 text-sm outline-none focus:bg-slate-50 focus:text-black cursor-pointer">
                  Создать блог
                </DropdownMenu.Item>
              </Link>
            )}
            <DropdownMenu.Separator className="h-px bg-slate-200" />
            <DropdownMenu.Item
              className="flex select-none items-center py-2 px-3 text-sm outline-none focus:bg-slate-50 focus:text-black cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Выйти
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      )}
    </DropdownMenu.Root>
  );
};

export default AccountMenu;
