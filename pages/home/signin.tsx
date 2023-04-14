import { useState } from "react";
import { getServerSession } from "next-auth/next";
import { signIn, getCsrfToken, getProviders } from "next-auth/react";

import { YandexIcon, GoogleIcon } from "@/components/Icons";
import ServicePage from "@/components/ServicePage";
import Button from "@/ui/button";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

export default function SignInPage({
  csrfToken,
  providers,
  error: errorQuery,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleSubmit = (e: any) => {
    if (!email || !email.includes("@")) {
      e.preventDefault();
      setError("Пожалуйста, укажите Email");
    } else {
      setError("");
    }
  };

  const handleEmail = (e: any) => {
    setError("");
    setEmail(e.target.value);
  };

  return (
    <ServicePage meta={{ title: "Войти" }}>
      <h1 className="text-4xl font-semibold text-center">Войти</h1>

      {errorQuery && (
        <p className="text-md font-normal border rounded-md p-3 border-red-500 text-center w-full text-red-500">
          Ошибка входа, попробуйте ещё раз
        </p>
      )}

      <div className="flex flex-row gap-2 my-2 ">
        {providers &&
          Object.values(providers).map((provider) => {
            if (provider.id == "email") return;

            return (
              <button
                key={provider.name}
                className="w-full text-sm rounded-md text-white border border-[#2e2e2e] p-3 flex flex-row justify-center content-center gap-2"
                onClick={() => signIn(provider.id)}
              >
                {provider.id == "yandex" && <YandexIcon />}
                {provider.id == "google" && <GoogleIcon />}
              </button>
            );
          })}
      </div>

      <hr className="border-[#2e2e2e] w-full" />
      {showEmailForm ? (
        <div className="flex flex-col space-y-4">
          <form
            onSubmit={handleSubmit}
            method="post"
            action="/api/auth/signin/email"
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div>
              <input
                type="email"
                name="email"
                onChange={handleEmail}
                placeholder="Ваш Email"
                autoComplete="email"
                className={`w-full border ${
                  error && "border-red-500"
                } text-black outline-none rounded-md text-sm placeholder-[#a9a9a9] border-[#3e3e3e] py-3 px-4`}
                value={email}
              />
              <p className="text-sm text-red-500 mt-1">{error}</p>
            </div>
            <Button className="w-full mt-5 py-6 justify-center" type="submit">
              Войти по Email
            </Button>
            <p className="text-gray-500 mt-3 text-sm w-full justify-center flex">
              На почту придёт ссылка для входа
            </p>
          </form>
        </div>
      ) : (
        <button
          className="w-full underline decoration-dashed text-md"
          onClick={() => setShowEmailForm(true)}
        >
          Войти по Email
        </button>
      )}
    </ServicePage>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    try {
      const redirectUrl = session?.user?.site
        ? `${session?.user?.site}/lk`
        : "/";

      const url = new URL(`${process.env.NEXTAUTH_URL}${context.req.url}`);
      const callbackUrl = url?.searchParams?.get("callbackUrl");

      const destination = callbackUrl || redirectUrl;

      console.log(
        url,
        callbackUrl,
        destination,
        context.query,
        context.req.url
      );

      return { redirect: { destination, permanent: false } };
    } catch (error) {
      console.log(error);
    }
  }

  const url = new URL(context.req.url || "/", process.env.NEXTAUTH_URL);
  const error = url.searchParams.get("error");

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      providers,
      csrfToken,
      error,
    },
  };
}
