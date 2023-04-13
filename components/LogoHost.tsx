import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { hostSite } from "@/config/host";

import { HTMLAttributes } from "react";

export default function LogoHost({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <Logo className={className} {...props}>
      <Logo.Image />
      <Logo.Name />
    </Logo>
  );
}
export function Logo({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <Link
      href={hostSite?.url}
      className={cn("flex flex-col justify-center items-center", className)}
      {...props}
    />
  );
}

Logo.Image = function LogoImage({ className, ...props }: any) {
  return (
    <Image
      src={hostSite?.logoSrc}
      width={300}
      height={300}
      alt={hostSite?.name}
      className={cn("w-20", className)}
      {...props}
    />
  );
};

Logo.Name = function LogoName({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xl font-medium", className)} {...props}>
      {hostSite?.name}
    </p>
  );
};
