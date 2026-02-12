import "server-only"
import type { Locale } from "./locales"
import path from "path"
import { promises as fs } from "fs"

type Dict = Record<string, any>

export type ContentLocale = "en" | "fr" | "ar"

function repoRootFromFrontend() {
  return path.resolve(process.cwd(), "..")
}

function localeFolder(locale: Locale | ContentLocale): ContentLocale {
  if (locale === "lb") return "ar"
  if (locale === "en" || locale === "fr" || locale === "ar") return locale
  return "en"
}

async function readJson(absPath: string): Promise<Dict> {
  try {
    const raw = await fs.readFile(absPath, "utf8")
    const trimmed = raw.trim()

    if (!trimmed) return {}
    try {
      return JSON.parse(trimmed) as Dict
    } catch {
      return {}
    }
  } catch {
    return {}
  }
}

export async function loadCommon(locale: Locale | ContentLocale): Promise<Dict> {
  const folder = localeFolder(locale)
  const file = path.join(
    repoRootFromFrontend(),
    "packages",
    "translations",
    "locales",
    folder,
    "common.json"
  )
  return readJson(file)
}

export async function loadSeo(locale: Locale | ContentLocale): Promise<Dict> {
  const folder = localeFolder(locale)
  const file = path.join(
    repoRootFromFrontend(),
    "packages",
    "translations",
    "locales",
    folder,
    "seo.json"
  )
  return readJson(file)
}

export async function loadAria(locale: Locale | ContentLocale): Promise<Dict> {
  const folder = localeFolder(locale)
  const file = path.join(
    repoRootFromFrontend(),
    "packages",
    "translations",
    "locales",
    folder,
    "aria.json"
  )
  return readJson(file)
}
