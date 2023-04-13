import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import YandexProvider from "next-auth/providers/yandex";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

import prisma from "@/lib/prisma";
import sendVerificationRequest from "@/lib/email";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions);
export default authHandler;

export const authOptions: NextAuthOptions = {
  providers: [
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID,
      clientSecret: process.env.YANDEX_CLIENT_SECRET,
      name: "Яндекс",
      authorization:
        "https://oauth.yandex.ru/authorize?scope=login:email+login:info&force_confirm=yes", // каждый раз предлагает выбор учётной записи
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: `${process.env.NEXTAUTH_URL}/signin`,
    signOut: `${process.env.NEXTAUTH_URL}/auth/signout`,
    verifyRequest: `${process.env.NEXTAUTH_URL}/auth/verify-request`, // (used for check email message)
    error: `${process.env.NEXTAUTH_URL}/error`, // Error code passed in query string as ?error=
  },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",

        // By design, domain names must have at least two dots; otherwise the browser will consider them invalid (https://stackoverflow.com/a/1188145).

        // When working on localhost Run: npx next dev -H localhost.site
        domain: `.${process?.env?.HOST?.replace(":3000", "")}`,

        // or
        // The cookie domain must be omitted entirely:
        // domain: !VERCEL_DEPLOYMENT && undefined,

        secure: VERCEL_DEPLOYMENT,
      },
    },
  },

  callbacks: {
    session: async ({ session, user }) => {
      let site = null;
      if (user?.subdomain) {
        const url = new URL(process.env.NEXTAUTH_URL);
        site = url.origin.replace("://", `://${user.subdomain}.`);
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          email: user.email,
          name: user.name,
          subdomain: user.subdomain,
          image: user.image,
          site,
        },
      };
    },
  },
};
