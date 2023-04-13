import { signOut } from "next-auth/react";

import ServicePage from "@/components/ServicePage";
import Button from "@/ui/button";

export default function SignOutPage() {
  return (
    <ServicePage meta={{ title: "Выйти" }}>
      <Button
        className="w-full justify-center"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Выйти
      </Button>
    </ServicePage>
  );
}
