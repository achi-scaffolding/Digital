// frontend/src/features/landing/sections/ProcessTimeline.tsx
"use client"

import { Search, Lightbulb, Code, Rocket } from "lucide-react"

import { useScrollReveal } from "../../../hooks/useScrollReveal"
import { cn } from "../../../lib/utils"

import type { Locale } from "../../../i18n/locales"
import { t as tt } from "../../../i18n/loadTranslations"

type Dict = Record<string, any>

const stepsConfig = [
  {
    icon: Search,
    stepKey: "process.steps.0.step",
    titleKey: "process.steps.0.title",
    descKey: "process.steps.0.description",
  },
  {
    icon: Lightbulb,
    stepKey: "process.steps.1.step",
    titleKey: "process.steps.1.title",
    descKey: "process.steps.1.description",
  },
  {
    icon: Code,
    stepKey: "process.steps.2.step",
    titleKey: "process.steps.2.title",
    descKey: "process.steps.2.description",
  },
  {
    icon: Rocket,
    stepKey: "process.steps.3.step",
    titleKey: "process.steps.3.title",
    descKey: "process.steps.3.description",
  },
] as const

export default function ProcessTimeline({
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
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="process-heading"
    >
      <div className="absolute top-0 left-0 w-full h-px section-separator" />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
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
            {t("process.kicker")}
          </span>
          <h2 id="process-heading" className="text-display-md md:text-display-lg mt-4 mb-6">
            {t("process.heading.prefix")}{" "}
            <span className="gradient-text">{t("process.heading.highlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("process.intro")}</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary to-accent/50 hidden md:block"
            aria-hidden="true"
          >
            <div
              className={cn(
                "absolute top-0 left-0 w-full bg-primary transition-all duration-1000 ease-out timeline-progress",
                sectionVisible ? "h-full" : "h-0"
              )}
            />
          </div>

          <div className="space-y-12 md:space-y-0">
            {stepsConfig.map((step, index) => {
              const stepNumber = t(step.stepKey)

              return (
                <div
                  key={step.stepKey}
                  className={cn(
                    "relative md:flex md:items-center transition-all duration-700",
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                    sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div
                    className={cn(
                      "md:w-[calc(50%-40px)] glass-panel rounded-2xl p-6 card-depth",
                      index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-4 mb-4",
                        index % 2 === 0 ? "md:flex-row-reverse" : ""
                      )}
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <step.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                          {t("process.stepLabel")} {stepNumber}
                        </span>
                        <h3 className="text-xl font-semibold">{t(step.titleKey)}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{t(step.descKey)}</p>
                  </div>

                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-background border-4 border-primary items-center justify-center z-10 timeline-node">
                    <span className="text-sm font-bold text-primary">{stepNumber}</span>
                  </div>

                  <div className="hidden md:block md:w-[calc(50%-40px)]" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
