// frontend/app/[locale]/page.tsx
import type { Locale } from "../../src/i18n/locales"
import { isLocale } from "../../src/i18n/locales"

import Hero from "../../src/features/landing/sections/Hero"
import About from "../../src/features/landing/sections/About"
import Services from "../../src/features/landing/sections/Services"
import ProcessTimeline from "../../src/features/landing/sections/ProcessTimeline"
import FAQ from "../../src/features/landing/sections/FAQ"
import { Contact } from "../../src/features/landing/sections/Contact"

import { loadCommon, loadAria, loadSeo } from "../../src/i18n/loadTranslations.server"

const STATIC_LOCALES: Locale[] = ["en", "fr", "lb"]

export async function generateStaticParams(): Promise<Array<{ locale: Locale }>> {
  return STATIC_LOCALES.map((locale) => ({ locale }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale

  const [common, aria, seo] = await Promise.all([
    loadCommon(locale),
    loadAria(locale),
    loadSeo(locale),
  ])

  return (
    <main>
      <Hero locale={locale} common={common} aria={aria} seo={seo} />
      <About locale={locale} common={common} aria={aria} seo={seo} />
      <Services locale={locale} common={common} aria={aria} seo={seo} />
      <ProcessTimeline locale={locale} common={common} aria={aria} seo={seo} />
      <FAQ locale={locale} common={common} aria={aria} seo={seo} />
      <Contact locale={locale} common={common} aria={aria} seo={seo} />
    </main>
  )
}
