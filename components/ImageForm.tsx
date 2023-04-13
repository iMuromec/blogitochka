import Image from "next/image";
import { useState } from "react";

import { uploadFile } from "@/lib/file/client";
import { cn } from "@/lib/utils";
import { toast } from "@/ui/toast";
import { Icons } from "@/components/Icons";

interface ImageFormProps {
  /** inputId: if the component occurs multiple times on the page */
  inputId: string;
  title: string;
  image: string;
  postSlug?: string;
  className?: string;
  setImage: (image: string) => void;
  updateDb?: (image: string) => Promise<any>;
}

export default function ImageForm({
  inputId,
  title,
  image,
  setImage,
  postSlug,
  updateDb,
  className,
}: ImageFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = async (e: any) => {
    if (!e.target.files.length) return;

    setIsLoading(true);

    const file = e.target.files[0];
    const data: any = await uploadFile({ file, postSlug, updateDb });

    setIsLoading(false);

    if (!data.fileUrl) {
      return toast({
        title: data?.error?.message || data?.error,
        message: "Не удалось сохранить фото, попробуйте ещё раз",
        type: "error",
      });
    }

    toast({
      title: "Фото успешно сохранено",
      message: "",
      type: "success",
    });

    setImage(data.fileUrl);
  };

  const handleDelete = async () => {
    if (!updateDb) return;

    setIsLoading(true);

    const res: any = await updateDb("");

    setIsLoading(false);

    if (!res?.ok) {
      return toast({
        title: `Ошибка ${res?.status} ${res?.statusText}`,
        message: "Не удалось удалить фото, попробуйте ещё раз",
        type: "error",
      });
    }

    toast({
      title: "Фото успешно удалено",
      message: "",
      type: "success",
    });

    setImage("");
  };

  return (
    <div className={cn("flex-col items-center justify-center flex", className)}>
      <label
        htmlFor={inputId}
        className="w-32 h-32 rounded-full flex-row items-center justify-center flex cursor-pointer"
      >
        {image && !isLoading ? (
          <Image
            width={128}
            height={128}
            src={image}
            className="w-32 h-32 object-cover rounded-full p-1"
            alt="preview"
          />
        ) : (
          <div className="w-32 h-32 text-center rounded-full flex-row items-center justify-center flex border border-gray-200 hover:bg-gray-300">
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <span>{title}</span>
            )}
          </div>
        )}
      </label>
      {image && (
        <div className="flex flex-row gap-1">
          <label
            htmlFor={inputId}
            className="underline decoration-dashed cursor-pointer"
          >
            Изменить
          </label>
          /
          <div
            onClick={handleDelete}
            className="underline decoration-dashed text-gray-500 cursor-pointer "
          >
            Удалить
          </div>
        </div>
      )}
      <input
        id={inputId}
        type="file"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
