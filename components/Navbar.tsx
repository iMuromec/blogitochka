import Skeleton from "@/ui/skeleton";

import LogoSites from "@/components/LogoSites";
import AccountMenu from "@/components/AccountMenu";

export default function Navbar() {
  return (
    <nav className="flex gap-6 md:gap-10 px-6 mb-6">
      <div className="flex h-16 w-full items-center justify-between py-4 border-b border-b-slate-200">
        <LogoSites />
        <AccountMenu />
      </div>
    </nav>
  );
}

Navbar.Skeleton = function NavbarSkeleton() {
  return (
    <nav className="flex gap-6 md:gap-10 px-6">
      <div className="flex h-16 w-full items-center justify-between py-4 border-b border-b-slate-200">
        <Skeleton className="rounded-full h-[45px] w-[45px]" />
        <Skeleton className="rounded-full h-[35px] w-[35px]" />
      </div>
    </nav>
  );
};
