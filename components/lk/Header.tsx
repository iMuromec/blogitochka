interface HeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export default function Header({ heading, text, children }: HeaderProps) {
  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row md:justify-between py-2">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-wide text-slate-900">
            {heading}
          </h1>
          {text && <p className="text-neutral-500">{text}</p>}
        </div>
        {children}
      </div>
    </>
  );
}
