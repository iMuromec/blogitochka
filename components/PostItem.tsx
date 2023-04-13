import Link from "next/link";
import Image from "next/image";

import Skeleton from "@/ui/skeleton";
import { formatDate } from "@/lib/utils";

import { Post } from "@prisma/client";

interface PostItemProps {
  post: Post;
  index: number;
}

export default function PostItem({ post, index }: PostItemProps) {
  return (
    <article
      key={post.slug}
      className="relative mb-4 article break-inside-avoid"
    >
      {post.image ? (
        <Image
          src={post.image}
          alt={post.title || ""}
          width={804}
          height={452}
          className="w-full  rounded"
          priority={index <= 1}
        />
      ) : (
        <div className="max-w-[800px] h-[300px] transition-colors"></div>
      )}
      <div className="absolute inset-0 p-4 text-white flex flex-col">
        <div className="relative">
          {post.title && (
            <h2 className="text-2xl leading-tight mb-3 bg-white bg-opacity-60 py-1 px-4 rounded text-black">
              {post.title}
            </h2>
          )}
          <span className="bg-white bg-opacity-60 py-1 px-4 rounded text-black">
            {formatDate(post.createdAt)}
          </span>
        </div>
      </div>
      <Link href={`/${post.slug}`} className="absolute inset-0"></Link>
    </article>
  );
}

PostItem.Skeleton = function PostItemSkeleton() {
  return <Skeleton className="w-full h-[300px] mb-4 break-inside-avoid" />;
};
