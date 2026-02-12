"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Twitter, Instagram } from "lucide-react"

import type { Locale } from "../../i18n/locales"
import { t as tt } from "../../i18n/loadTranslations"

type FooterLink = { label: string; href: string }

const socialLinks = [
  { icon: Twitter, labelKey: "footer.social.twitter", href: "https://twitter.com" },
  { icon: Linkedin, labelKey: "footer.social.linkedin", href: "https://linkedin.com" },
  { icon: Github, labelKey: "footer.social.github", href: "https://github.com" },
  { icon: Instagram, labelKey: "footer.social.instagram", href: "https://instagram.com" },
]

export default function Footer({ locale }: { locale: Locale }) {
  const t = (key: string) => tt(locale, `common.${key}`)

  const [currentYear, setCurrentYear] = useState<number>(2026)
  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const footerLinks: Record<"services" | "company" | "resources" | "legal", FooterLink[]> = {
    services: [
      { label: t("footer.links.services.webDevelopment"), href: "#services" },
      { label: t("footer.links.services.uiuxDesign"), href: "#services" },
      { label: t("footer.links.services.digitalMarketing"), href: "#services" },
      { label: t("footer.links.services.mobileApps"), href: "#services" },
      { label: t("footer.links.services.aiSolutions"), href: "#services" },
    ],
    company: [
      { label: t("footer.links.company.aboutUs"), href: "#about" },
      { label: t("footer.links.company.ourTeam"), href: "#about" },
      { label: t("footer.links.company.careers"), href: "#" },
      { label: t("footer.links.company.blog"), href: "#blogs" },
      { label: t("footer.links.company.contact"), href: "#contact" },
    ],
    resources: [
      { label: t("footer.links.resources.caseStudies"), href: "#" },
      { label: t("footer.links.resources.documentation"), href: "#" },
      { label: t("footer.links.resources.helpCenter"), href: "#" },
      { label: t("footer.links.resources.apiReference"), href: "#" },
      { label: t("footer.links.resources.partners"), href: "#" },
    ],
    legal: [
      { label: t("footer.links.legal.privacyPolicy"), href: "#" },
      { label: t("footer.links.legal.termsOfService"), href: "#" },
      { label: t("footer.links.legal.cookiePolicy"), href: "#" },
      { label: t("footer.links.legal.gdpr"), href: "#" },
    ],
  }

  const handleLinkClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="relative pt-24 pb-8 overflow-hidden" role="contentinfo">
      <div className="absolute top-0 left-0 w-full h-px section-separator" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          <div className="col-span-2">
            <a
              href="#home"
              className="flex items-center gap-2 mb-6"
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick("#home")
              }}
              aria-label={t("footer.aria.brandHome")}
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <span className="font-display font-bold text-xl">
                {t("brand.namePrefix")}
                <span className="gradient-text">{t("brand.nameSuffix")}</span>
              </span>
            </a>

            <p className="text-muted-foreground mb-6 max-w-xs">{t("footer.brandDescription")}</p>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.labelKey}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={t(social.labelKey)}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.columns.services")}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(link.href)
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors animated-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.columns.company")}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(link.href)
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors animated-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.columns.resources")}</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors animated-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.columns.legal")}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors animated-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-8 mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">{t("footer.newsletter.title")}</h3>
              <p className="text-muted-foreground">{t("footer.newsletter.subtitle")}</p>
            </div>
            <form className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder={t("footer.newsletter.emailPlaceholder")}
                className="flex-1 md:w-64 px-4 py-2 rounded-lg bg-background/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                aria-label={t("footer.newsletter.emailAria")}
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                {t("footer.newsletter.subscribe")}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {t("footer.bottom.copyrightBrand")}. {t("footer.bottom.rights")}
          </p>
          <p className="text-sm text-muted-foreground">{t("footer.bottom.crafted")}</p>
        </div>
      </div>
    </footer>
  )
}
