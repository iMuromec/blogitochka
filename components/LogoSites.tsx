import Image from "next/image";
import Link from "next/link";

import Skeleton from "@/ui/skeleton";
import useSite from "@/hooks/useSite";

export default function LogoSites() {
  const { site, loading } = useSite();

  if (loading) {
    return <LogoSites.Skeleton />;
  }

  return (
    <>
      <Link href="/" className="items-center space-x-2 flex">
        {site?.logo && (
          <div className="flex justify-center w-[45px] rounded-full">
            <Image
              src={site?.logo}
              className="object-cover w-auto rounded-none bg-transparent max-h-[45px] h-[45px]"
              alt={site?.name || ""}
              width={100}
              height={64}
            />
          </div>
        )}

        <span className="font-bold inline-block">{site?.name}</span>
      </Link>
    </>
  );
}

LogoSites.Skeleton = function LogoSitesSkeleton() {
  return (
    <div className="items-center space-x-2 flex">
      <Skeleton className="w-[45px] h-[45px] rounded-full" />
      <Skeleton className="w-[100px] h-[25px]" />
    </div>
  );
};
