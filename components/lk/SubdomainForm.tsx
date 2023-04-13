import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Button from "@/ui/button";
import { Card } from "@/ui/card";
import { toast } from "@/ui/toast";

import ImageForm from "@/components/ImageForm";

import useSite from "@/hooks/useSite";

import { cn, createUrl } from "@/lib/utils";
import { updateSite } from "@/lib/file/client";

export default function SubdomainForm({
  host = "",
  newSite = false,
  ...props
}) {
  const [siteName, setSiteName] = useState("");
  const [siteDesc, setSiteDesc] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [currentSubdomain, setCurrentSubdomain] = useState("");
  const [siteLogo, setSiteLogo] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkSubdomain, setCheckSubdomain] = useState({
    message: "Только латинские буквы, числа и знак (-)",
    success: true,
  });

  const router = useRouter();
  const { site, loading: isSiteLoading } = useSite();

  useEffect(() => {
    if (site) {
      setSiteName(site?.name || "");
      setSiteDesc(site?.description || "");
      setSiteLogo(site?.logo || "");
      setSubdomain(site?.subdomain || "");
      setCurrentSubdomain(site?.subdomain || "");
    }
  }, [site]);

  async function handleSave() {
    if (!subdomain) {
      setCheckSubdomain({
        message: "Пожалуйста, укажите поддомен",
        success: false,
      });
      return;
    }

    if (!checkSubdomain.success) return;

    setIsLoading(true);

    const res = await fetch("/api/site", {
      method: newSite ? "POST" : "PUT",
      body: JSON.stringify({
        subdomain,
        name: siteName,
        description: siteDesc,
      }),
    });

    setIsLoading(false);

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

    if (currentSubdomain !== subdomain) {
      // Redirect to new site
      const newUrl = createUrl("/lk", subdomain);
      router.push(newUrl);
    }
  }

  async function handleCheck(e: any) {
    const sub = e.target.value.trim();
    setSubdomain(sub);

    if (sub === subdomain || sub === currentSubdomain) {
      setCheckSubdomain({
        message: "",
        success: true,
      });
      return;
    }

    const regexAllowedChar = /^[a-zA-Z0-9-]+$/;

    if (!sub) {
      setCheckSubdomain({
        message: "Пожалуйста, укажите хоть что-то",
        success: false,
      });
      return;
    } else if (!regexAllowedChar.test(sub)) {
      setCheckSubdomain({
        message:
          "Поддомен может содержать только латинские буквы, числа и знак (-)",
        success: false,
      });

      return;
    } else {
      setCheckSubdomain({
        message: "",
        success: true,
      });
    }

    const res = await fetch(`/api/site?subdomain=${sub}`);

    if (res.ok) {
      setCheckSubdomain({ message: "Поддомен уже занят", success: false });
    } else {
      setCheckSubdomain({ message: "Поддомен свободен", success: true });
    }
  }

  if (isSiteLoading && !newSite) {
    return <Card.Skeleton />;
  }

  return (
    <Card {...props}>
      <Card.Header
        className={cn("justify-start items-start", {
          hidden: newSite,
        })}
      >
        <Card.Title>Сайт</Card.Title>
      </Card.Header>
      <Card.Content
        className={cn("flex flex-col gap-7", {
          "pt-6": newSite,
        })}
      >
        <ImageForm
          inputId="siteLogo"
          image={siteLogo}
          setImage={setSiteLogo}
          updateDb={(logo: string) => updateSite({ logo })}
          title="Добавить лого"
          className={cn("justify-start items-start", {
            hidden: newSite,
          })}
        />

        <div className="flex flex-col gap-3">
          <div
            className={cn("", {
              hidden: newSite,
            })}
          >
            <Card.Input
              id="siteName"
              label="Название"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
          </div>
          <div
            className={cn("", {
              hidden: newSite,
            })}
          >
            <Card.Textarea
              id="siteDesc"
              label="Описание"
              value={siteDesc}
              onChange={(e) => setSiteDesc(e.target.value)}
            />
            <p className="text-sm pb-3 text-gray-400">
              Можно использовать{" "}
              <a
                className="underline"
                target="_blank"
                rel="noreferrer"
                href="https://docs.github.com/ru/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
              >
                Markdown
              </a>{" "}
              разметку
            </p>
          </div>

          <div>
            <div className="flex justify-between max-w-[350px]">
              <Card.Input
                id="subdomain"
                label="Поддомен"
                value={subdomain}
                onChange={handleCheck}
                className="rounded-l-lg rounded-r-none border-r-0"
              />
              <div className="host-site text-left self-end bg-gray-100 border rounded-r-lg py-2 mb-2 pr-3 text-sm h-9 text-gray-900 border-slate-300 font-normal">
                {`.${host}`}
              </div>
            </div>
            <div
              className={cn("text-sm h-5 text-red-400", {
                "text-green-500": checkSubdomain.success,
              })}
            >
              {checkSubdomain.message}
            </div>
          </div>
        </div>
      </Card.Content>

      <Card.Footer>
        <Button
          isLoading={isLoading}
          onClick={handleSave}
          className={
            !subdomain || !checkSubdomain.success ? "cursor-not-allowed" : ""
          }
        >
          <span>{newSite ? "Создать" : "Сохранить"}</span>
        </Button>
      </Card.Footer>
    </Card>
  );
}
