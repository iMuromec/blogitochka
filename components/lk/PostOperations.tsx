import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { toast } from "@/ui/toast";
import { Icons } from "@/components/Icons";
import { Alert } from "@/ui/alert";

import { Post } from "@prisma/client";

interface PostOperationsProps {
  post: Post;
  refetchPosts: () => void;
}

export default function PostOperations({
  post,
  refetchPosts,
}: PostOperationsProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  async function deletePost() {
    setIsDeleteLoading(true);

    const response = await fetch(`/api/posts?postId=${post.id}`, {
      method: "DELETE",
    });

    setIsDeleteLoading(false);
    setShowDeleteAlert(false);

    if (!response?.ok) {
      return toast({
        title: "Что-то пошло не так",
        message: "Эту запись не удалось удалить, поробуйте ещё раз.",
        type: "error",
      });
    }

    refetchPosts();

    toast({
      title: "Запись удалена",
      message: "",
      type: "success",
    });
  }

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex h-8 w-8 items-center outline-0 justify-center rounded-md border transition-colors hover:bg-slate-50">
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">Открыть</span>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            className="overflow-hidden rounded-md border border-slate-50 bg-white shadow-md animate-in slide-in-from-top-1 md:w-32"
          >
            <Link
              href={`/${post.slug}`}
              target={"_blank"}
              className="flex w-full"
            >
              <DropdownMenu.Item className="flex w-full cursor-pointer select-none items-center py-2 px-3 text-sm text-slate-600 outline-none focus:bg-slate-50 focus:text-black">
                Посмотреть
              </DropdownMenu.Item>
            </Link>
            <DropdownMenu.Separator className="h-px bg-slate-200" />
            <Link href={`/${post.slug}/edit`} className="flex w-full">
              <DropdownMenu.Item className="flex w-full select-none items-center py-2 px-3 text-sm text-slate-600 outline-none focus:bg-slate-50 focus:text-black cursor-pointer">
                Редактировать
              </DropdownMenu.Item>
            </Link>
            <DropdownMenu.Separator className="h-px bg-slate-200" />
            <DropdownMenu.Item
              className="flex w-full select-none items-center py-2 px-3 text-sm outline-none  focus:text-black cursor-pointer text-red-600 focus:bg-red-50"
              onSelect={() => setShowDeleteAlert(true)}
            >
              Удалить
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <Alert open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <Alert.Content>
          <Alert.Header>
            <Alert.Title>
              <div className="flex gap-3 items-center">
                {post.image && (
                  <Image
                    src={post.image}
                    width={32}
                    height={32}
                    alt={post.title ?? ""}
                    className="rounded-md"
                  />
                )}
                <span className="font-semibold">{post.title}</span>
              </div>
            </Alert.Title>
            <Alert.Description>
              <b>Вы уверены, что хотите удалить эту запись?</b>
              <br />
              Запись нельзя будет восстановить
            </Alert.Description>
          </Alert.Header>
          <Alert.Footer>
            <Alert.Cancel>Отменить</Alert.Cancel>
            <Alert.Action onClick={deletePost}>
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Удалить</span>
            </Alert.Action>
          </Alert.Footer>
        </Alert.Content>
      </Alert>
    </>
  );
}
