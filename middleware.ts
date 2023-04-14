import { NextMiddleware, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|static/|favicons/|[\\w-]+\\.\\w+).*)",
  ],
};

const middleware: NextMiddleware = (req) => {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost.site:3000)
  const hostname = req.headers.get("host");

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname;

  // rewrite root application to `/home` folder
  if (hostname === process.env.HOST || hostname === process.env?.VERCEL_URL) {
    return NextResponse.rewrite(new URL(`/home${path}`, req.url));
  }

  /*  You have to replace ".vercel.pub" with your own domain if you deploy this example under your domain.
      You can also use wildcard subdomains on .vercel.app links that are associated with your Vercel team slug
      Do note that you'll still need to add "*.vercel.app" as a wildcard domain on your Vercel dashboard.
      
      if you run on localhost add subdomains manually: 
      Mac/Linux - /etc/hosts, 
      Windows - C:\Windows\System32\Drivers\etc\hosts

      127.0.0.1 localhost.site
      127.0.0.1 test.localhost.site
      127.0.0.1 test2.localhost.site
      */

  const currentHost = (hostname ?? "")
    .replace(`.${process.env?.VERCEL_URL?.split(".").slice(-2).join(".")}`, "") // remove subdomain
    .replace(`.${process.env.VERCEL_URL}`, "")
    .replace(`.${process.env.HOST}`, "");

  req.headers.set("currentHost", currentHost);

  // rewrite everything else to `/_sites/[subdomain] dynamic route
  return NextResponse.rewrite(
    new URL(`/_sites/${currentHost}${path}`, req.url)
  );
};

export default middleware;
