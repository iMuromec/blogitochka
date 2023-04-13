import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Button from "@/ui/button";
import { Card } from "@/ui/card";
import { toast } from "@/ui/toast";
import { updateUser } from "@/lib/file/client";
import ImageForm from "@/components/ImageForm";

export default function UsernameForm() {
  const { data: session, status } = useSession();

  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (session) {
      setUserName(session.user?.name || "");
      setUserAvatar(session.user?.image || "");
    }
  }, [session]);

  async function handleSave() {
    setIsLoading(true);

    const res: any = await updateUser({
      name: userName,
    });

    if (!res?.ok) {
      return toast({
        title: `Ошибка ${res.status} ${res.statusText}`,
        message: "Не удалось сохранить изменения, попробуйте ещё раз",
        type: "error",
      });
    }

    toast({
      title: "Изменения успешно сохранены",
      message: "",
      type: "success",
    });

    setIsLoading(false);
  }

  if (status == "loading") {
    return <Card.Skeleton />;
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>Профиль</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-col gap-7">
        <ImageForm
          inputId="userImage"
          title="Добавить аватар"
          image={userAvatar}
          setImage={setUserAvatar}
          updateDb={(image: string) => updateUser({ image })}
          className="justify-start items-start"
        />
        <Card.Input
          id="name"
          label="Имя"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </Card.Content>
      <Card.Footer>
        <Button isLoading={isLoading} onClick={handleSave}>
          <span>Сохранить</span>
        </Button>
      </Card.Footer>
    </Card>
  );
}
