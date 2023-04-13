import { Logo as LogoHost } from "@/components/LogoHost";

export default function Footer() {
  return (
    <footer className="mt-8 px-6 w-full">
      <div className="flex h-16 w-full items-center justify-center gap-3 py-4 border-t border-t-slate-200">
        <LogoHost className="flex flex-row gap-2">
          <LogoHost.Image className="w-[20px] grayscale" />
          <LogoHost.Name className="text-sm font-light" />
        </LogoHost>
        <div>|</div>
        <p className="text-center text-sm md:text-left">
          Исходный код на{" "}
          <a
            href="https://github.com/iMuromec/blogitochka"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
