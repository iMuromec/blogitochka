import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import TextareaAutosize from "react-textarea-autosize";

import { Icons } from "@/components/Icons";
import ImageForm from "@/components/ImageForm";
import { updatePost } from "@/lib/file/client";

import Button from "@/ui/button";
import { toast } from "@/ui/toast";

import { Post } from "@prisma/client";

const CustomEditor = dynamic(() => import("./CustomEditor"), {
  ssr: false,
});

export default function Editor({ post }: { post: Post }) {
  const [isSaving, setIsSaving] = useState("");
  const [title, setTitle] = useState(post.title);
  const [poster, setPoster] = useState(post.image);
  const [published, setPublished] = useState(post.published);
  const [content, setContent] = useState(post.content);

  async function handleSave(e: any) {
    setIsSaving(e.target.id);

    const postContent = content || {};

    const res = await fetch(`/api/posts`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: post.id,
        title,
        content: JSON.stringify(postContent),
        published: e.target.id == "publish" ? !published : published,
        image: poster,
      }),
    });

    setIsSaving("");

    if (!res?.ok) {
      return toast({
        title: `Ошибка ${res.status} ${res.statusText}`,
        message: "Не удалось сохранить изменения, попробуйте ещё раз",
        type: "error",
      });
    }

    let successMessage = "Изменения успешно сохранены";

    if (e.target.id == "publish") {
      setPublished(!published);

      successMessage = !published
        ? "Запись опубликована"
        : "Запись перенесена в черновик";
    }

    toast({
      title: successMessage,
      message: "",
      type: "success",
    });
  }

  return (
    <div className="grid w-full gap-5">
      <div className="grid grid-cols-1 md:grid-cols-3 w-full items-center  justify-between px-6 gap-5">
        <div className="flex items-center justify-between md:justify-normal space-x-10">
          <Link
            href="/lk"
            className="inline-flex outline-0 items-center rounded-lg border border-transparent bg-transparent py-2 pl-3 pr-5 text-sm font-medium text-slate-900 hover:border-slate-200 hover:bg-slate-100  dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            <>
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Назад
            </>
          </Link>
          <p className="text-sm text-slate-600 ">
            <Link
              href={`/${post.slug}`}
              target="_blank"
              className="flex gap-1 justify-center border-b border-gray-500 items-center border-dotted "
            >
              {published ? "Опубликована" : "Черновик"}{" "}
              <Icons.externalLink className="w-3" />
            </Link>
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <ImageForm
            inputId="poster"
            image={poster as string}
            setImage={setPoster}
            postSlug={post.slug}
            updateDb={(image: string) => updatePost({ id: post.id, image })}
            className="rounded-md m-auto"
            title="+ добавить обложку"
          />
        </div>
        <div className="flex gap-5 flex-col md:flex-row md:justify-end">
          <Button
            id="save"
            onClick={handleSave}
            isLoading={isSaving}
            className="text-slate-900 h-auto justify-center border-slate-200 bg-slate-100 hover:bg-slate-200"
          >
            Сохранить
          </Button>
          <Button
            id="publish"
            className="h-auto justify-center"
            onClick={handleSave}
            isLoading={isSaving}
          >
            {published ? "В черновик" : "Опубликовать"}
          </Button>
        </div>
      </div>
      <div className="w-full pt-5">
        <TextareaAutosize
          autoFocus
          name="title"
          id="title"
          defaultValue={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок"
          className="resize-none flex justify-center items-center pb-5 text-center appearance-none w-full text-5xl font-normal focus:outline-none"
        />

        <CustomEditor
          data={content}
          onChange={setContent}
          postSlug={post.slug}
          holder="editorjs-container"
        />
        <p className="editor-area text-sm text-gray-500 w-[650px] mx-auto">
          Нажмите{" "}
          <kbd className="rounded-md border bg-slate-50 px-1 text-xs uppercase">
            Tab
          </kbd>
          , чтобы открыть меню
        </p>
      </div>
    </div>
  );
}
