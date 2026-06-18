import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "new" | "sale" | "bestseller";
  className?: string;
};

const badgeStyle =
  "rounded-none bg-white/[0.06] text-white border border-white/10 backdrop-blur-md";

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
        badgeStyle,
        className
      )}
    >
      {children}
    </span>
  );
}
