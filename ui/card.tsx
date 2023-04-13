import { cn } from "@/lib/utils";
import Skeleton from "@/ui/skeleton";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("overflow-hidden rounded-lg border w-full", className)}
      {...props}
    />
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

Card.Header = function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn("grid gap-1 p-6", className)} {...props} />;
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

Card.Content = function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("px-6 pb-4", className)} {...props} />;
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

Card.Footer = function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn("border-t bg-slate-50 px-6 py-4", className)}
      {...props}
    />
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

Card.Title = function CardTitle({ className, ...props }: CardTitleProps) {
  return <h4 className={cn("text-lg font-medium", className)} {...props} />;
};

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

Card.Description = function CardDescription({
  className,
  ...props
}: CardDescriptionProps) {
  return <p className={cn("text-sm text-gray-600", className)} {...props} />;
};

interface CardInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

Card.Input = function CardInput({
  id,
  label,
  className,
  ...props
}: CardInputProps) {
  return (
    <div className="grid gap-1">
      <label className="text-sm font-normal" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        size={32}
        className={cn(
          `my-0 mb-2 block h-9 max-w-[350px] w-full rounded-md border border-slate-300 py-2 px-3 text-sm placeholder:text-slate-400 outline-0`,
          className
        )}
        {...props}
      />
    </div>
  );
};

interface CardTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

Card.Textarea = function CardTextarea({
  id,
  label,
  className,
  ...props
}: CardTextareaProps) {
  return (
    <div className="grid gap-1">
      <label className="text-sm font-normal" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        className={cn(
          `resize rounded-md min-h-[80px] my-0 mb-2 block max-w-[350px] w-full border border-slate-300 py-2 px-3 text-sm placeholder:text-slate-400 outline-0`,
          className
        )}
        {...props}
      ></textarea>
    </div>
  );
};

Card.Skeleton = function CardSeleton() {
  return (
    <Card className="w-full">
      <Card.Header className="gap-2">
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-4 w-4/5" />
      </Card.Header>
      <Card.Content className="h-10" />
      <Card.Footer>
        <Skeleton className="h-8 w-[120px] bg-slate-200" />
      </Card.Footer>
    </Card>
  );
};
