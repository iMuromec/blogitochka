import Link from "next/link";
import Image from "next/image";

import Skeleton from "@/ui/skeleton";

import PostOperations from "@/components/lk/PostOperations";

import { formatDate } from "@/lib/utils";

import { Post } from "@prisma/client";

interface PostItemProps {
  post: Post;
  refetchPosts: () => void;
}

export default function PostItem({ post, refetchPosts }: PostItemProps) {
  return (
    <div className="flex justify-between p-4">
      <div>
        <div className="col-span-9 flex gap-3">
          <Link href={`/${post.slug}/edit`} className="col-span-1 ">
            {post.image && (
              <Image
                alt={post.title ?? ""}
                src={post.image}
                width={32}
                height={32}
                className="rounded-md"
              />
            )}
          </Link>
          <div className="grid gap-1">
            <Link
              href={`/${post.slug}/edit`}
              className="font-semibold hover:underline"
            >
              {post.title || (
                <span className="text-gray-500 font-normal italic">
                  Без названия
                </span>
              )}
            </Link>
            <div>
              <p className="text-sm text-slate-600">
                {formatDate(post.createdAt.toString())}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="hidden md:flex col-span-2 items-center">
          {post.published ? "Опубликована" : "Черновик"}
        </div>
        <div className="ml-auto col-span-1 flex items-center">
          <PostOperations post={post} refetchPosts={refetchPosts} />
        </div>
      </div>
    </div>
  );
}

PostItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-5 w-2/5" />
      </div>
    </div>
  );
};
