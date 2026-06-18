import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

const borderedStyle =
  "bg-white/[0.06] text-white border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-md";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-none font-semibold transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            [borderedStyle]: variant === "primary" || variant === "secondary" || variant === "outline",
            "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10":
              variant === "ghost",
            "px-5 py-2 text-sm": size === "sm",
            "px-7 py-3 text-sm": size === "md",
            "px-9 py-4 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
