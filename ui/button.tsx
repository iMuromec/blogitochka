import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isLoading?: string | boolean;
}

export default function Button({
  onClick,
  isLoading = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    typeof isLoading == "boolean"
      ? setLoading(isLoading)
      : setLoading(isLoading === props.id);
  }, [isLoading]);

  return (
    <button
      onClick={onClick}
      className={cn(
        `relative outline-0 inline-flex h-9 items-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white focus:outline-none hover:bg-gray-700 focus:outline-0 ${
          loading && "cursor-not-allowed opacity-60"
        }`,
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
