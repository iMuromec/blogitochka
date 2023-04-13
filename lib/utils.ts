import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  input: string | number | Date,
  withTime = false
): string {
  const date = new Date(input);
  const localeDate = date.toLocaleDateString("ru-RU", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  const localeTime = date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return withTime ? `${localeDate}, ${localeTime}` : localeDate;
}

export function cleanHtml(str: string) {
  return str.replaceAll(/(<\/?(?:a|u|i|b)[^>]*>)|<[^>]+>/gi, "$1");
}

export function getSigninUrl(url = "/", host?: string) {
  const newUrl = new URL(url, process.env.NEXTAUTH_URL);
  const callbackUrl = newUrl.href.replace(newUrl.host, host || newUrl.host);
  const destinationUrl = `${
    process.env.NEXTAUTH_URL
  }/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  return destinationUrl;
}

export function createUrl(path = "/", subdomain?: string) {
  const url = new URL(path, process.env.NEXTAUTH_URL || location.href);
  const regexp = new RegExp("://([a-zA-Z0-9/-]+).", "i");
  const hasSubdomain = url.host.split(".").length > 2;

  if (subdomain) {
    if (hasSubdomain) {
      return url.href?.replace(regexp, `://${subdomain}.`);
    }

    return url.href?.replace("://", `://${subdomain}.`);
  }

  if (hasSubdomain) {
    return url.href?.replace(regexp, `://`);
  }
  return url.href;
}
