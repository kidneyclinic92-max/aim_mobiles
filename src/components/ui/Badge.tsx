import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "new" | "sale" | "bestseller";
  className?: string;
};

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "border-white/10 bg-white/[0.08] text-zinc-100",
  new: "border-cyan-400/30 bg-cyan-400/15 text-cyan-300",
  sale: "border-red-400/30 bg-red-500/15 text-red-300",
  bestseller: "border-amber-400/30 bg-amber-400/15 text-amber-300",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
