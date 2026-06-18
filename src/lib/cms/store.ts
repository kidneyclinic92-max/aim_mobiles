import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import type { SiteContent } from "./types";
import { getDefaultContent } from "./defaults";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "site-content.json");

export async function getSiteContent(): Promise<SiteContent> {
  const defaults = getDefaultContent();
  try {
    const raw = await readFile(CONTENT_FILE, "utf-8");
    const saved = JSON.parse(raw) as Partial<SiteContent>;
    return deepMerge(defaults, saved) as SiteContent;
  } catch {
    return defaults;
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), "utf-8");
}

function deepMerge<T extends Record<string, unknown>>(
  base: T,
  override: Partial<T>
): T {
  const result = { ...base };
  for (const key of Object.keys(override) as (keyof T)[]) {
    const overrideVal = override[key];
    const baseVal = base[key];
    if (
      overrideVal !== undefined &&
      typeof overrideVal === "object" &&
      overrideVal !== null &&
      !Array.isArray(overrideVal) &&
      typeof baseVal === "object" &&
      baseVal !== null &&
      !Array.isArray(baseVal)
    ) {
      result[key] = deepMerge(
        baseVal as Record<string, unknown>,
        overrideVal as Record<string, unknown>
      ) as T[keyof T];
    } else if (overrideVal !== undefined) {
      result[key] = overrideVal as T[keyof T];
    }
  }
  return result;
}
