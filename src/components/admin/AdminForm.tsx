"use client";

import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  className?: string;
  hint?: string;
};

export function AdminField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  className,
  hint,
}: FieldProps) {
  return (
    <label className={cn("block space-y-1.5", className)}>
      <span className="text-sm font-medium text-zinc-300">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
      />
      {hint && <span className="text-xs text-zinc-500">{hint}</span>}
    </label>
  );
}

type TextAreaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  className?: string;
};

export function AdminTextarea({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
  className,
}: TextAreaProps) {
  return (
    <label className={cn("block space-y-1.5", className)}>
      <span className="text-sm font-medium text-zinc-300">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 resize-y"
      />
    </label>
  );
}

type NumberFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  className?: string;
};

export function AdminNumberField({
  label,
  value,
  onChange,
  step = 1,
  className,
}: NumberFieldProps) {
  return (
    <label className={cn("block space-y-1.5", className)}>
      <span className="text-sm font-medium text-zinc-300">{label}</span>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
      />
    </label>
  );
}

type SectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function AdminSection({ title, description, children }: SectionProps) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {description && <p className="mt-1 text-sm text-zinc-500">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

type SaveBarProps = {
  onSave: () => void;
  saving: boolean;
  saved?: boolean;
};

export function AdminSaveBar({ onSave, saving, saved }: SaveBarProps) {
  return (
    <div className="sticky bottom-0 -mx-6 mt-8 flex items-center justify-between border-t border-white/10 bg-[#0a0a0f]/95 px-6 py-4 backdrop-blur-xl">
      <p className="text-sm text-zinc-500">
        {saved ? "Changes saved successfully." : "Remember to save your changes."}
      </p>
      <button
        onClick={onSave}
        disabled={saving}
        className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </div>
  );
}
