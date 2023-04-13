import Link from "next/link";
import { usePathname } from "next/navigation";

import Skeleton from "@/ui/skeleton";
import { Icons } from "@/components/Icons";
import { menuItems } from "@/config/lk";

export default function Sidebar() {
  const path = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {menuItems.map((item: any, index: number) => {
        const Icon = Icons[item.icon];
        return (
          <Link key={index} href={item.disabled ? "/" : item.href}>
            <span
              className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 
                ${path === item.href ? "bg-slate-200" : "transparent"}
                ${item?.disabled ? "cursor-not-allowed opacity-80" : ""}`}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

Sidebar.Skeleton = function SidebarSkeleton() {
  return (
    <nav className="grid items-start gap-2">
      <Skeleton className="rounded-md px-3 py-2 bg-slate-200 w-full h-8" />
      <Skeleton className="rounded-md px-3 py-2 bg-slate-200 w-full h-8" />
    </nav>
  );
};
