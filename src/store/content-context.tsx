"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { SiteContent } from "@/lib/cms/types";
import { getDefaultContent } from "@/lib/cms/defaults";
import { setContentCache } from "@/lib/cms/content-access";

type ContentContextValue = {
  content: SiteContent;
  loading: boolean;
  refresh: () => Promise<void>;
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(getDefaultContent());
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/cms");
      if (res.ok) {
        const data = (await res.json()) as SiteContent;
        setContent(data);
        setContentCache(data);
      }
    } catch {
      setContentCache(getDefaultContent());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const onUpdate = () => refresh();
    window.addEventListener("cms-updated", onUpdate);
    return () => window.removeEventListener("cms-updated", onUpdate);
  }, [refresh]);

  useEffect(() => {
    setContentCache(content);
  }, [content]);

  return (
    <ContentContext.Provider value={{ content, loading, refresh }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useSiteContent must be used within ContentProvider");
  return ctx;
}
