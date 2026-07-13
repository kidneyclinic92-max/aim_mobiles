import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-gradient-to-r from-cyan-400 to-blue-500 text-zinc-950 shadow-[0_4px_20px_rgba(34,211,238,0.25)] hover:shadow-[0_6px_28px_rgba(34,211,238,0.4)] hover:brightness-110":
              variant === "primary",
            "border border-white/10 bg-white/[0.06] text-white backdrop-blur-md hover:border-white/25 hover:bg-white/10":
              variant === "secondary" || variant === "outline",
            "border border-transparent text-zinc-300 hover:bg-white/5 hover:text-white":
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
