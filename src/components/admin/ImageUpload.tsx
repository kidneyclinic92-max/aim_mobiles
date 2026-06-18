"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Link2, Loader2, Trash2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/cms/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Upload failed");
  return data.url as string;
}

type SingleImageUploadProps = {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
};

export function ImageUpload({ label, value, onChange, hint }: SingleImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUrl, setShowUrl] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      {label && <span className="text-sm font-medium text-zinc-300">{label}</span>}

      {value ? (
        <div className="relative inline-block">
          <div className="relative h-32 w-32 overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <Image src={value} alt="" fill className="object-cover" sizes="128px" unoptimized={value.startsWith("/uploads")} />
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600"
            aria-label="Remove image"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] px-6 py-8 transition-colors hover:border-cyan-500/40 hover:bg-white/[0.04]",
            uploading && "pointer-events-none opacity-60"
          )}
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
          ) : (
            <Upload className="h-8 w-8 text-zinc-500" />
          )}
          <span className="text-sm text-zinc-400">
            {uploading ? "Uploading…" : "Click or drag an image here"}
          </span>
          <span className="text-xs text-zinc-600">JPEG, PNG, WebP, GIF — max 5MB</span>
        </button>
      )}

      {value && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 text-sm text-cyan-400 hover:underline disabled:opacity-50"
        >
          <ImagePlus className="h-4 w-4" />
          Replace image
        </button>
      )}

      <button
        type="button"
        onClick={() => setShowUrl(!showUrl)}
        className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300"
      >
        <Link2 className="h-3 w-3" />
        {showUrl ? "Hide URL input" : "Or paste image URL"}
      </button>

      {showUrl && (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-500/50 focus:outline-none"
        />
      )}

      {hint && <p className="text-xs text-zinc-500">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}

type MultiImageUploadProps = {
  label?: string;
  value: string[];
  onChange: (urls: string[]) => void;
  hint?: string;
};

export function MultiImageUpload({ label, value, onChange, hint }: MultiImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUrl, setShowUrl] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;

    setUploading(true);
    setError(null);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        urls.push(await uploadFile(file));
      }
      onChange([...value, ...urls]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeAt = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const addUrl = () => {
    const url = urlInput.trim();
    if (!url) return;
    onChange([...value, url]);
    setUrlInput("");
  };

  return (
    <div className="space-y-3">
      {label && <span className="text-sm font-medium text-zinc-300">{label}</span>}

      {value.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {value.map((url, i) => (
            <div key={`${url}-${i}`} className="relative">
              <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <Image src={url} alt="" fill className="object-cover" sizes="96px" unoptimized={url.startsWith("/uploads")} />
              </div>
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600"
                aria-label={`Remove image ${i + 1}`}
              >
                <Trash2 className="h-3 w-3" />
              </button>
              {i === 0 && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded bg-cyan-500/20 px-1.5 py-0.5 text-[10px] text-cyan-400">
                  Main
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] px-6 py-6 transition-colors hover:border-cyan-500/40 hover:bg-white/[0.04]",
          uploading && "pointer-events-none opacity-60"
        )}
      >
        {uploading ? (
          <Loader2 className="h-7 w-7 animate-spin text-cyan-400" />
        ) : (
          <ImagePlus className="h-7 w-7 text-zinc-500" />
        )}
        <span className="text-sm text-zinc-400">
          {uploading ? "Uploading…" : "Upload product photos"}
        </span>
        <span className="text-xs text-zinc-600">Select multiple files or drag & drop</span>
      </button>

      <button
        type="button"
        onClick={() => setShowUrl(!showUrl)}
        className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300"
      >
        <Link2 className="h-3 w-3" />
        {showUrl ? "Hide URL input" : "Or paste image URL"}
      </button>

      {showUrl && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
            placeholder="https://example.com/image.jpg"
            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-500/50 focus:outline-none"
          />
          <button
            type="button"
            onClick={addUrl}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-300 hover:bg-white/5"
          >
            Add
          </button>
        </div>
      )}

      {hint && <p className="text-xs text-zinc-500">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
