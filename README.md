<img alt="Блог — и точка" src="https://blogitochka.ru/static/logo.png" width="130"/>

# Блог — и точка

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/iMuromec/blogitochka/blob/main/README.en.md)

Блог-платформа с поддоменом для каждого сайта. Можно использовать как SaaS приложение.

**[blogitochka.ru](https://blogitochka.ru/)**

> **Warning**
> Это демо проект, создан для ознакомления

<br />

## Пример

**[demo.blogitochka.ru](https://demo.blogitochka.ru/)**

## Fullstack приложение:

- [Next.js]
- [React.js]
- [Prisma]
- [Tailwind CSS]
- [NextAuth.js]
- [Node.js]
- [TypeScript]
- [PostgreSQL]
- [Yandex Cloud]
- [Editor.js]

## Планы

- [ ] Добавить тесты

## Установка и настройка

1. Установите зависимости с npm:

```bash
npm i
```

2. Скопируйте `.env.example` в `.env` и заполните переменные

```bash
cp .env.example .env
```

3. Измените или удалите Яндекс счётчик в `/pages/_document.tsx`

4. Настройка поддоменов

**Настройка поддоменов на Vercel:**

https://vercel.com/guides/nextjs-multi-tenant-application#5.-deploy-to-vercel

**Если вы работаете локально, то поддомены нужно добавить вручную:**

В:

- Mac/Linux - /etc/hosts
- Windows - C:\Windows\System32\Drivers\etc\hosts

Добавить:

- 127.0.0.1 localhost.site
- 127.0.0.1 test.localhost.site
- 127.0.0.1 test2.localhost.site

5. Запустите миграцию, чтобы создать бд с помощью Prisma Migrate:

https://www.prisma.io/docs/getting-started/quickstart

Можно настроить или внешнюю или локальную бд в `/prisma/schema.prisma`:

```javascript
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

Затем запустить миграцию:

```bash
npx prisma migrate dev
```

6. Запустить сервер:

```bash
npm run dev
```
