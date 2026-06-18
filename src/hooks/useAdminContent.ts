"use client";

import { useCallback, useEffect, useState } from "react";
import type { SiteContent } from "@/lib/cms/types";
import { getDefaultContent } from "@/lib/cms/defaults";

export function useAdminContent() {
  const [content, setContent] = useState<SiteContent>(getDefaultContent());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/cms");
      if (!res.ok) throw new Error("Failed to load content");
      const data = (await res.json()) as SiteContent;
      setContent(data);
    } catch {
      setError("Could not load site content.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = useCallback(async () => {
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      const res = await fetch("/api/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSaved(true);
      window.dispatchEvent(new Event("cms-updated"));
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Failed to save changes. Make sure you are logged in.");
    } finally {
      setSaving(false);
    }
  }, [content]);

  const update = useCallback((updater: (prev: SiteContent) => SiteContent) => {
    setContent(updater);
    setSaved(false);
  }, []);

  return { content, setContent, update, loading, saving, saved, error, save, reload: load };
}
