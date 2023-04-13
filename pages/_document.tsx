import { Html, Head, Main, NextScript } from "next/document";
import YandexMetrika from "@/components/YandexMetrika";

export default function Document() {
  return (
    <Html lang="ru">
      <Head />
      <body>
        <Main />
        <NextScript />
        <YandexMetrika yid="93195596" />
      </body>
    </Html>
  );
}
