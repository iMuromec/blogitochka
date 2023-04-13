export default function EmptyPlaceholder({ search }: { search?: string }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 my-4">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center text-3xl">
        {search ? "Увы, но ничего не нашлось" : "Пока нет записей"}
      </div>
    </div>
  );
}
