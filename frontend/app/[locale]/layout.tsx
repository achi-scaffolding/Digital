import type { Metadata } from "next"
import type { ReactNode } from "react"

import SiteHeader from "../../src/components/header/SiteHeader"
import { loadAria, loadCommon, loadSeo } from "../../src/i18n/loadTranslations.server"
import { t as tt } from "../../src/i18n/loadTranslations"
import { dirForLocale, isLocale, type Locale } from "../../src/i18n/locales"

type ContentLocale = "en" | "fr" | "ar"

function contentLocaleFor(locale: Locale): ContentLocale {
  if (locale === "lb") return "ar"
  if (locale === "fr") return "fr"
  return "en"
}

function canonicalFor(locale: Locale): string {
  if (locale === "fr") return "/fr/"
  if (locale === "lb") return "/lb/"
  return "/en/"
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale
  const contentLocale = contentLocaleFor(locale)

  const seo = await loadSeo(contentLocale)

  const title = tt(seo, "home.title")
  const description = tt(seo, "home.description")

  return {
    title,
    description,
    alternates: {
      canonical: canonicalFor(locale),
      languages: {
        en: "/en/",
        fr: "/fr/",
        "ar-LB": "/lb/",
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale

  const dir = dirForLocale(locale)
  const contentLocale = contentLocaleFor(locale)

  const common = await loadCommon(contentLocale)
  const aria = await loadAria(contentLocale)

  const headerText = {
    brand: {
      name: tt(common, "header.brand"),
      logoAlt: tt(aria, "header.brandHome"),
    },
    nav: {
      home: tt(common, "header.nav.home"),
      about: tt(common, "header.nav.about"),
      services: tt(common, "header.nav.services"),
      blog: tt(common, "header.nav.blog"),
      contact: tt(common, "header.nav.contact"),
    },
    servicesDropdown: {
      viewAll: tt(common, "header.servicesDropdown.viewAll"),
      items: {
        aiWebsiteDevelopment: tt(common, "header.servicesDropdown.items.aiWebsiteDevelopment"),
        seoAiVisibility: tt(common, "header.servicesDropdown.items.seoAiVisibility"),
        uxuiDesign: tt(common, "header.servicesDropdown.items.uxuiDesign"),
        performanceOptimization: tt(common, "header.servicesDropdown.items.performanceOptimization"),
      },
    },
    cta: tt(common, "header.cta"),
    lang: {
      en: tt(common, "header.lang.en"),
      fr: tt(common, "header.lang.fr"),
      ar: tt(common, "header.lang.ar"),
    },
  }

  const headerAria = {
    mainNav: tt(aria, "header.mainNav"),
    openMenu: tt(aria, "header.openMenu"),
    closeMenu: tt(aria, "header.closeMenu"),
    openServices: tt(aria, "header.openServices"),
    closeServices: tt(aria, "header.closeServices"),
    languageSwitcher: tt(aria, "header.languageSwitcher"),
    brandHome: tt(aria, "header.brandHome"),
  }

  const lang = contentLocale === "ar" ? "ar-LB" : contentLocale

  return (
    <div lang={lang} dir={dir} data-locale={locale} className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-slate-900 focus:shadow"
      >
        Skip to content
      </a>

      <SiteHeader locale={locale} text={headerText} aria={headerAria} />

      <main id="main" className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  )
}
