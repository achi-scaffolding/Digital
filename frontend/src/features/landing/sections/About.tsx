// frontend/src/features/landing/sections/About.tsx
"use client"

import { Target, Lightbulb, Users, Rocket } from "lucide-react"

import { useScrollReveal } from "../../../hooks/useScrollReveal"
import { cn } from "../../../lib/utils"

import type { Locale } from "../../../i18n/locales"
import { t as tt } from "../../../i18n/loadTranslations"

type Dict = Record<string, any>

const statsKeys = [
  { valueKey: "about.stats.0.value", labelKey: "about.stats.0.label" },
  { valueKey: "about.stats.1.value", labelKey: "about.stats.1.label" },
  { valueKey: "about.stats.2.value", labelKey: "about.stats.2.label" },
  { valueKey: "about.stats.3.value", labelKey: "about.stats.3.label" },
] as const

const valuesConfig = [
  { icon: Target, titleKey: "about.values.0.title", descKey: "about.values.0.description" },
  { icon: Lightbulb, titleKey: "about.values.1.title", descKey: "about.values.1.description" },
  { icon: Users, titleKey: "about.values.2.title", descKey: "about.values.2.description" },
  { icon: Rocket, titleKey: "about.values.3.title", descKey: "about.values.3.description" },
] as const

export default function About({
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
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="absolute top-0 left-0 w-full h-px section-separator" />
      <div
        className="absolute -right-40 top-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
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
            {t("about.kicker")}
          </span>
          <h2 id="about-heading" className="text-display-md md:text-display-lg mt-4 mb-6">
            {t("about.heading.prefix")}{" "}
            <span className="gradient-text">{t("about.heading.highlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("about.intro")}</p>
        </div>

        <div
          className={cn(
            "glass-panel rounded-3xl p-8 md:p-12 mb-16 transition-all duration-700 delay-200",
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-display-sm mb-6">{t("about.story.title")}</h3>
              <p className="text-muted-foreground mb-4">{t("about.story.p1")}</p>
              <p className="text-muted-foreground mb-6">{t("about.story.p2")}</p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">{t("about.signature.badge")}</span>
                </div>
                <div>
                  <p className="font-semibold">{t("about.signature.name")}</p>
                  <p className="text-sm text-muted-foreground">{t("about.signature.role")}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {valuesConfig.map((value, index) => (
                <div
                  key={value.titleKey}
                  className="glass-panel rounded-2xl p-5 card-depth"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <value.icon className="w-8 h-8 text-primary mb-3" aria-hidden="true" />
                  <h4 className="font-semibold mb-2">{t(value.titleKey)}</h4>
                  <p className="text-sm text-muted-foreground">{t(value.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={statsRef}
          className={cn("grid grid-cols-2 md:grid-cols-4 gap-6 stagger-children", statsVisible && "visible")}
        >
          {statsKeys.map((stat) => (
            <div key={stat.labelKey} className="text-center glass-panel rounded-2xl p-6 card-depth">
              <p className="text-display-sm md:text-display-md gradient-text stat-number">
                {t(stat.valueKey)}
              </p>
              <p className="text-muted-foreground mt-2">{t(stat.labelKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
