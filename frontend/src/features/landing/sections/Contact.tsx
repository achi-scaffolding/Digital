// frontend/src/features/landing/sections/Contact.tsx
"use client"

import type React from "react"
import { useState } from "react"
import { Mail, MapPin, Phone, Send, Shield } from "lucide-react"

import type { Locale } from "../../../i18n/locales"
import { t as tt } from "../../../i18n/loadTranslations"

import { useScrollReveal } from "../../../hooks/useScrollReveal"
import { cn } from "../../../lib/utils"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { useToast } from "../../../hooks/use-toast"

type Dict = Record<string, any>

const contactInfoConfig = [
  { icon: Mail, labelKey: "contact.info.email.label", valueKey: "contact.info.email.value", hrefKey: "contact.info.email.href" },
  { icon: Phone, labelKey: "contact.info.phone.label", valueKey: "contact.info.phone.value", hrefKey: "contact.info.phone.href" },
  { icon: MapPin, labelKey: "contact.info.location.label", valueKey: "contact.info.location.value", hrefKey: "contact.info.location.href" },
] as const

const hoursConfig = [
  { dayKey: "contact.hours.items.0.day", timeKey: "contact.hours.items.0.time" },
  { dayKey: "contact.hours.items.1.day", timeKey: "contact.hours.items.1.time" },
  { dayKey: "contact.hours.items.2.day", timeKey: "contact.hours.items.2.time" },
] as const

export function Contact({
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
  const { toast } = useToast()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: t("contact.toast.title"),
      description: t("contact.toast.description"),
    })

    setFormData({ name: "", email: "", company: "", message: "" })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="absolute top-0 left-0 w-full h-px section-separator" />
      <div
        className="absolute -left-40 top-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-40 bottom-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
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
            {t("contact.kicker")}
          </span>
          <h2 id="contact-heading" className="text-display-md md:text-display-lg mt-4 mb-6">
            {t("contact.heading.prefix")}{" "}
            <span className="gradient-text">{t("contact.heading.highlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.intro")}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          <div
            className={cn(
              "lg:col-span-3 glass-panel rounded-3xl p-8 md:p-10 transition-all duration-700 delay-200",
              sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t("contact.form.name.label")}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("contact.form.name.placeholder")}
                    className="bg-background/50 border-border/50 focus:border-primary focus-glow"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t("contact.form.email.label")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("contact.form.email.placeholder")}
                    className="bg-background/50 border-border/50 focus:border-primary focus-glow"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  {t("contact.form.company.label")}
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={t("contact.form.company.placeholder")}
                  className="bg-background/50 border-border/50 focus:border-primary focus-glow"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t("contact.form.message.label")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contact.form.message.placeholder")}
                  rows={5}
                  className="bg-background/50 border-border/50 focus:border-primary resize-none focus-glow"
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full btn-press" disabled={isSubmitting}>
                {isSubmitting ? (
                  t("contact.form.submit.loading")
                ) : (
                  <>
                    {t("contact.form.submit.label")}
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>{t("contact.privacyNote")}</span>
              </div>
            </form>
          </div>

          <div
            className={cn(
              "lg:col-span-2 space-y-6 transition-all duration-700 delay-300",
              sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {contactInfoConfig.map((item) => {
              const label = t(item.labelKey)
              const value = t(item.valueKey)
              const href = t(item.hrefKey)

              return (
                <a
                  key={item.labelKey}
                  href={href}
                  className="glass-panel rounded-2xl p-6 flex items-center gap-4 card-depth block"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="font-semibold">{value}</p>
                  </div>
                </a>
              )
            })}

            <div className="glass-panel rounded-2xl p-6">
              <h3 className="font-semibold mb-4">{t("contact.hours.title")}</h3>
              <div className="space-y-2 text-sm">
                {hoursConfig.map((row) => (
                  <div key={row.dayKey} className="flex justify-between">
                    <span className="text-muted-foreground">{t(row.dayKey)}</span>
                    <span>{t(row.timeKey)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">{t("contact.responseTime.value")}</div>
              <p className="text-sm text-muted-foreground">{t("contact.responseTime.label")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
