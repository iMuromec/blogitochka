import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import ServicePage from "@/components/ServicePage";
import Button from "@/ui/button";

import { GetServerSideProps } from "next";

export default function ErrorPage({
  error,
}: {
  error: string | null | undefined;
}) {
  const { data: session } = useSession();

  let errorMessage;

  switch (error) {
    case "Configuration":
      errorMessage = errorMessage = {
        title: "Ошибка сервера",
      };
      break;
    case "AccessDenied":
      errorMessage = {
        title: "Доступ запрещён",
        text: "У вас недостаточно прав для входа.",
      };
      break;
    case "Verification":
      errorMessage = errorMessage = {
        title: "Ссылка устарела",
        text: "Ссылка для входа больше не действительна. Возможно, она уже была использована или срок её действия истек.",
      };
      break;

    default:
      errorMessage = errorMessage = {
        title: "Ошибка",
      };
      break;
  }

  return (
    <ServicePage meta={{ title: errorMessage?.title }}>
      <div className="text-center p-6 border border-black rounded-md">
        {errorMessage?.title && (
          <h1 className="text-3xl font-bold">{errorMessage?.title}</h1>
        )}
        {errorMessage?.text && <p>{errorMessage?.text}</p>}
      </div>

      <div className="flex flex-col gap-2 text-center">
        <Link href="/" className="w-full">
          <Button className="w-full justify-center">На главную</Button>
        </Link>
        {session ? (
          <Button
            className="w-full justify-center"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Выйти
          </Button>
        ) : (
          <Button
            className="w-full justify-center"
            onClick={() => signIn(undefined, { callbackUrl: "/" })}
          >
            Войти
          </Button>
        )}
      </div>
    </ServicePage>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const url = new URL(req.url || "/", process.env.NEXTAUTH_URL);
  const error = url.searchParams.get("error");

  return {
    props: { error },
  };
};
