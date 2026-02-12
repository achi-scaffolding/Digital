"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Button } from "../ui/button"
import { cn } from "../../lib/utils"
import { useScrollProgress } from "../../hooks/useScrollReveal"
import type { Locale } from "../../i18n/locales"

type HeaderText = {
  brand: {
    name: string
    logoAlt: string
  }
  nav: {
    home: string
    about: string
    services: string
    blog: string
    contact: string
  }
  servicesDropdown: {
    viewAll: string
    items: {
      aiWebsiteDevelopment: string
      seoAiVisibility: string
      uxuiDesign: string
      performanceOptimization: string
    }
  }
  cta: string
  lang: {
    en: string
    fr: string
    ar: string
  }
}

type HeaderAria = {
  mainNav: string
  openMenu: string
  closeMenu: string
  openServices: string
  closeServices: string
  languageSwitcher: string
  brandHome: string
}

function pathPrefix(locale: Locale): string {
  if (locale === "fr") return "/fr"
  if (locale === "lb") return "/lb"
  return "/en"
}

function splitBrand(name: string): { prefix: string; highlight: string } {
  const trimmed = (name || "").trim()
  if (!trimmed) return { prefix: "Achi", highlight: "Digital" }

  const idx = trimmed.toLowerCase().indexOf("digital")
  if (idx >= 0) {
    return {
      prefix: trimmed.slice(0, idx),
      highlight: trimmed.slice(idx),
    }
  }

  const parts = trimmed.split(" ")
  if (parts.length >= 2) {
    return {
      prefix: parts.slice(0, -1).join(" ") + " ",
      highlight: parts[parts.length - 1],
    }
  }

  return { prefix: trimmed, highlight: "" }
}

export default function SiteHeader({
  locale,
  text,
  aria,
}: {
  locale: Locale
  text: HeaderText
  aria: HeaderAria
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const scrollProgress = useScrollProgress()

  const router = useRouter()
  const pathname = usePathname() || ""

  const navItems = useMemo(
    () => [
      { label: text.nav.home, href: "#home" },
      { label: text.nav.about, href: "#about" },
      { label: text.nav.services, href: "#services" },
      { label: text.nav.blog, href: "#blogs" },
      { label: text.nav.contact, href: "#contact" },
    ],
    [text]
  )

  const { prefix, highlight } = useMemo(() => splitBrand(text.brand.name), [text.brand.name])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const base = pathPrefix(locale)
  const homeHref = `${base}/`

  const isOnHome = pathname === homeHref || pathname === base || pathname === `${base}/index.html`

  const scrollToHash = (hash: string) => {
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)

    if (isOnHome) {
      scrollToHash(href)
      return
    }

    router.push(`${homeHref}${href}`)
  }

  const safeProgress = mounted ? scrollProgress : 0

  return (
    <>
      <div
        className="fixed top-0 left-0 h-1 scroll-progress z-[60]"
        style={{ width: `${safeProgress}%` }}
        aria-hidden="true"
      />

      <header
        className={cn(
          "fixed top-1 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
          isScrolled
            ? "w-[calc(100%-2rem)] max-w-5xl glass-panel rounded-2xl py-3 px-6 mt-2"
            : "w-full max-w-7xl py-6 px-6"
        )}
        role="banner"
      >
        <nav className="flex items-center justify-between" aria-label={aria.mainNav}>
          <Link
            href={`${homeHref}#home`}
            className="flex items-center gap-2 group"
            aria-label={aria.brandHome || text.brand.logoAlt}
            onClick={(e) => {
              e.preventDefault()
              handleNavClick("#home")
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center neon-glow transition-transform group-hover:scale-110">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>

            <span className="font-display font-bold text-xl text-foreground">
              {prefix}
              {highlight ? <span className="gradient-text">{highlight}</span> : null}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1" role="menubar">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                className="animated-underline px-4 py-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
                role="menuitem"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button variant="hero" size="default" onClick={() => handleNavClick("#contact")}>
              {text.cta}
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? aria.closeMenu : aria.openMenu}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isMenuOpen ? "max-h-96 mt-4" : "max-h-0"
          )}
          role="menu"
          aria-hidden={!isMenuOpen}
        >
          <div className="flex flex-col gap-2 pb-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors font-medium"
                role="menuitem"
              >
                {item.label}
              </a>
            ))}

            <Button
              variant="hero"
              size="lg"
              className="mt-2"
              onClick={() => handleNavClick("#contact")}
            >
              {text.cta}
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}
