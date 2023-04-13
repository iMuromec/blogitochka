import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/ui/button";
import { toast } from "@/ui/toast";

import { Icons } from "@/components/Icons";

export default function NewPostButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleClick() {
    setIsLoading(true);

    const res = await fetch(`/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsLoading(false);

    if (!res?.ok) {
      return toast({
        title: `Ошибка ${res.status} ${res.statusText}`,
        message: "Пожалуйста, попробуйте еще раз",
        type: "error",
      });
    }

    const post = await res.json();

    router.push(`/${post.slug}/edit`);
  }
  return (
    <Button onClick={handleClick} isLoading={isLoading}>
      <Icons.add className="mr-2 h-4 w-4" /> Добавить
    </Button>
  );
}
