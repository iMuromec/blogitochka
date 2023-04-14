import { Html, Head, Main, NextScript } from "next/document";
import YandexMetrika from "@/components/YandexMetrika";
import { hostSite } from "@/config/host";

export default function Document() {
  return (
    <Html lang="ru">
      <Head />
      <body>
        <Main />
        <NextScript />
        <YandexMetrika yid={hostSite.YandexMetrikaId} />
      </body>
    </Html>
  );
}
