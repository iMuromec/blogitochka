import Image from "next/image";
import { Session } from "next-auth";

import { Icons } from "@/components/Icons";
import Skeleton from "@/ui/skeleton";

export default function UserAvatar({ session }: { session: Session }) {
  return (
    <div className="flex h-[32px] w-[32px] items-center max-h-[32px] justify-center overflow-hidden rounded-full bg-slate-100">
      {session.user?.image ? (
        <Image
          src={session.user.image}
          className="object-cover"
          alt={session.user.name || ""}
          width={32}
          height={32}
        />
      ) : (
        <>
          <span className="sr-only">{session.user?.name}</span>
          <Icons.user className="h-4 w-4" />
        </>
      )}
    </div>
  );
}

UserAvatar.Skeleton = function UserAvatarSkeleton() {
  return <Skeleton className="h-[32px] w-[32px] rounded-full" />;
};
