import type { Locale } from "./locales"

type Dict = Record<string, any>

/**
 * Content locale represents the folder name inside packages/translations/locales/.
 * IMPORTANT:
 * - Route locale "lb" represents Arabic (Lebanon) in the URL
 * - Translation source folder is "ar"
 */
export type ContentLocale = "en" | "fr" | "ar"

function localeFolder(locale: Locale | ContentLocale): ContentLocale {
  if (locale === "lb") return "ar"
  if (locale === "en" || locale === "fr" || locale === "ar") return locale
  return "en"
}

function get(obj: any, keyPath: string) {
  if (!obj || typeof keyPath !== "string" || !keyPath) return undefined
  return keyPath
    .split(".")
    .reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj)
}

/* =========================
   IN-MEMORY CACHE (client-safe)
========================= */
type Bundle = { common: Dict; seo: Dict; aria: Dict }
const CACHE = new Map<ContentLocale, Bundle>()

function ensureBundle(folder: ContentLocale): Bundle {
  const existing = CACHE.get(folder)
  if (existing) return existing
  const fresh: Bundle = { common: {}, seo: {}, aria: {} }
  CACHE.set(folder, fresh)
  return fresh
}

export function setCommon(locale: Locale | ContentLocale, dict: Dict) {
  ensureBundle(localeFolder(locale)).common = dict || {}
}
export function setSeo(locale: Locale | ContentLocale, dict: Dict) {
  ensureBundle(localeFolder(locale)).seo = dict || {}
}
export function setAria(locale: Locale | ContentLocale, dict: Dict) {
  ensureBundle(localeFolder(locale)).aria = dict || {}
}

/* =========================
   TRANSLATION HELPER
   Supported calls:
   1) t(locale, "common.hero.badge")      ✅ preferred (uses cache set by server props)
   2) t(dict, "hero.badge")              ✅ dict mode (best for client components)
========================= */
export function t(localeOrDict: Locale | ContentLocale | Dict, keyPath: string): string {
  if (!keyPath) return ""

  // Dict mode: t(dict, "x.y.z")
  if (typeof localeOrDict === "object" && localeOrDict !== null) {
    const v = get(localeOrDict, keyPath)
    return typeof v === "string" ? v : ""
  }

  // Locale mode: t(locale, "common.x.y") -> reads from cache (must be set via setCommon/setSeo/setAria)
  const folder = localeFolder(localeOrDict)
  const bundle = ensureBundle(folder)

  const parts = keyPath.split(".")
  const root = parts[0]
  const rest = parts.slice(1).join(".")

  let dict: Dict | undefined
  if (root === "common") dict = bundle.common
  else if (root === "seo") dict = bundle.seo
  else if (root === "aria") dict = bundle.aria
  else dict = bundle.common

  const lookupPath = root === "common" || root === "seo" || root === "aria" ? rest : keyPath
  const v = get(dict, lookupPath)
  return typeof v === "string" ? v : ""
}
