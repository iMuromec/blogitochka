import { DefaultUser, TokenSet } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      /**
       * The user's email address
       */
      email?: string | null;

      /**
       * The user's unique id number
       */
      id?: string | null;

      /**
       * The users preferred avatar.
       * Usually provided by the user's OAuth provider of choice
       */
      image?: string | null;

      /**
       * The user's full name
       */
      name?: string | null;

      subdomain?: string | null | undefined;

      site?: string | null | undefined;
    };
  }

  interface User {
    /**
     * The user's email address
     */
    email?: string | null;

    /**
     * The user's unique id number
     */
    id: string;

    /**
     * The users preferred avatar.
     * Usually provided by the user's OAuth provider of choice
     */
    image?: string | null;

    /**
     * The user's full name
     */
    name?: string | null;

    subdomain?: string | null | undefined;

    site?: string | null | undefined;
  }
}
