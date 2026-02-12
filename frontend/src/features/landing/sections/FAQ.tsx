// frontend/src/features/landing/sections/FAQ.tsx
"use client"

import type { Locale } from "../../../i18n/locales"
import { t as tt } from "../../../i18n/loadTranslations"

import { useScrollReveal } from "../../../hooks/useScrollReveal"
import { cn } from "../../../lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion"

type Dict = Record<string, any>

type FAQItem = {
  questionKey: string
  answerKey: string
}

const faqConfig: FAQItem[] = [
  { questionKey: "faq.items.0.question", answerKey: "faq.items.0.answer" },
  { questionKey: "faq.items.1.question", answerKey: "faq.items.1.answer" },
  { questionKey: "faq.items.2.question", answerKey: "faq.items.2.answer" },
  { questionKey: "faq.items.3.question", answerKey: "faq.items.3.answer" },
  { questionKey: "faq.items.4.question", answerKey: "faq.items.4.answer" },
  { questionKey: "faq.items.5.question", answerKey: "faq.items.5.answer" },
]

export default function FAQ({
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
  const a = (key: string) => tt(aria, key)

  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal<HTMLElement>(0.1)

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="faq-heading"
      aria-label={a("faq.sectionLabel")}
    >
      <div className="absolute top-0 left-0 w-full h-px section-separator" />

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div
            className={cn(
              "text-center mb-12 transition-all duration-700",
              sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              {t("faq.kicker")}
            </span>

            <h2 id="faq-heading" className="text-display-md md:text-display-lg mt-4 mb-6">
              {t("faq.heading.prefix")}{" "}
              <span className="gradient-text">{t("faq.heading.highlight")}</span>
            </h2>

            <p className="text-lg text-muted-foreground">{t("faq.intro")}</p>
          </div>

          <div
            className={cn(
              "transition-all duration-700 delay-200",
              sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqConfig.map((item, index) => (
                <AccordionItem
                  key={item.questionKey}
                  value={`item-${index}`}
                  className="glass-panel rounded-2xl px-6 border-none"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-primary py-6 hover:no-underline">
                    {t(item.questionKey)}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {t(item.answerKey)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div
            className={cn(
              "text-center mt-12 transition-all duration-700 delay-300",
              sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <p className="text-muted-foreground mb-4">{t("faq.cta.text")}</p>
            <a
              href="#contact"
              className="animated-underline text-lg font-semibold text-primary"
              aria-label={a("faq.cta.aria")}
            >
              {t("faq.cta.linkLabel")}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
