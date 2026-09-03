import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

/** Shared text input — matches ContactForm field styling. */
export function Input({ className, hasError, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-md border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-shadow",
        "placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring",
        hasError ? "border-danger" : "border-border",
        className,
      )}
      {...props}
    />
  );
}
