// frontend/src/features/landing/sections/Services.tsx
"use client"

import {
  Globe,
  Palette,
  Search,
  Megaphone,
  Smartphone,
  Bot,
  LineChart,
  Shield,
} from "lucide-react"

import { useScrollReveal } from "../../../hooks/useScrollReveal"
import { cn } from "../../../lib/utils"

import type { Locale } from "../../../i18n/locales"
import { t as tt } from "../../../i18n/loadTranslations"

type Dict = Record<string, any>

const servicesConfig = [
  {
    icon: Globe,
    titleKey: "services.items.0.title",
    descKey: "services.items.0.description",
    badgeKey: "services.items.0.badge",
    featured: true,
  },
  {
    icon: Palette,
    titleKey: "services.items.1.title",
    descKey: "services.items.1.description",
    badgeKey: "",
    featured: false,
  },
  {
    icon: Search,
    titleKey: "services.items.2.title",
    descKey: "services.items.2.description",
    badgeKey: "",
    featured: false,
  },
  {
    icon: Megaphone,
    titleKey: "services.items.3.title",
    descKey: "services.items.3.description",
    badgeKey: "",
    featured: false,
  },
  {
    icon: Smartphone,
    titleKey: "services.items.4.title",
    descKey: "services.items.4.description",
    badgeKey: "services.items.4.badge",
    featured: false,
  },
  {
    icon: Bot,
    titleKey: "services.items.5.title",
    descKey: "services.items.5.description",
    badgeKey: "services.items.5.badge",
    featured: true,
  },
  {
    icon: LineChart,
    titleKey: "services.items.6.title",
    descKey: "services.items.6.description",
    badgeKey: "",
    featured: false,
  },
  {
    icon: Shield,
    titleKey: "services.items.7.title",
    descKey: "services.items.7.description",
    badgeKey: "",
    featured: false,
  },
] as const

export default function Services({
  locale,
  common,
  aria,
  seo,
}: {
  locale: Locale
  common: Dict
  aria: Dict
  seo: Dict
}) {
  const t = (key: string) => tt(common, key)

  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="absolute top-0 left-0 w-full h-px section-separator" />
      <div
        className="absolute -left-40 bottom-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6">
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700",
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            {t("services.kicker")}
          </span>
          <h2 id="services-heading" className="text-display-md md:text-display-lg mt-4 mb-6">
            {t("services.heading.prefix")}{" "}
            <span className="gradient-text">{t("services.heading.highlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("services.intro")}</p>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children",
            sectionVisible && "visible"
          )}
        >
          {servicesConfig.map((service, index) => {
            const title = t(service.titleKey)
            const badge = service.badgeKey ? t(service.badgeKey) : ""

            return (
              <article
                key={service.titleKey}
                className={cn(
                  "glass-panel rounded-2xl p-6 card-depth group relative overflow-hidden tilt-hover glow-border",
                  service.featured && "lg:col-span-2 lg:row-span-1"
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {badge ? (
                  <span
                    className={cn(
                      "absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded-full",
                      badge === t("services.badges.popular") && "bg-primary text-primary-foreground",
                      badge === t("services.badges.new") && "bg-accent text-accent-foreground badge-pulse",
                      badge === t("services.badges.beta") && "bg-neon-purple text-white"
                    )}
                  >
                    {badge}
                  </span>
                ) : null}

                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-muted-foreground mb-4">{t(service.descKey)}</p>

                <a
                  href="#contact"
                  className="animated-underline text-sm font-medium text-primary inline-flex items-center gap-1"
                  aria-label={t("services.learnMoreAria").replace("{service}", title)}
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.querySelector("#contact")
                    if (el) el.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {t("services.learnMore")}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>

                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </article>
            )
          })}
        </div>

        <div
          className={cn(
            "text-center mt-12 transition-all duration-700 delay-500",
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-muted-foreground mb-4">{t("services.cta.text")}</p>
          <a
            href="#contact"
            className="animated-underline text-lg font-semibold text-primary"
            onClick={(e) => {
              e.preventDefault()
              const el = document.querySelector("#contact")
              if (el) el.scrollIntoView({ behavior: "smooth" })
            }}
          >
            {t("services.cta.link")} →
          </a>
        </div>
      </div>
    </section>
  )
}
