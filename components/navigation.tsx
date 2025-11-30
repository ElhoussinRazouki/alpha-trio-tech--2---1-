"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "./language-provider"
import { useTranslation } from "@/lib/useTranslation"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const { t } = useTranslation()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Active class helper
  const isActive = (path: string) =>
    pathname === path
      ? "text-purple-600 dark:text-purple-400 font-bold"
      : "text-gray-800 dark:text-gray-200"

  const toggleTheme = () => {
    if (theme === "dark") setTheme("light")
    else setTheme("dark")
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-slate-700 dark:border-slate-800 bg-white/70 dark:bg-slate-900/90 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/alphatrio.png" alt="logo" className="h-12 w-12 rounded-full" />
            <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#00BCD4] to-[#005B99] bg-clip-text text-transparent">
              AlphaTrio Tech
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">

            <Link href="/" className={`${isActive("/")} hover:text-purple-500 transition`}>
              {t("nav.home")}
            </Link>



            <Link href="/services" className={`${isActive("/services")} hover:text-purple-500 transition`}>
              {t("nav.services")}
            </Link>

            <Link href="/about" className={`${isActive("/about")} hover:text-purple-500 transition`}>
              {t("nav.about")}
            </Link>

            <Button className="book-cta bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition hover:cursor-pointer">
              {t("nav.bookNow")}
            </Button>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-purple-100 dark:hover:bg-slate-800 transition"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-purple-100 dark:hover:bg-slate-800 transition"
            >
              <span className="text-sm font-semibold">{language}</span>
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 dark:text-gray-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-2 pb-4">

            <Link href="/" className={`${isActive("/")} hover:text-purple-500 transition py-2`}>
              {t("nav.home")}
            </Link>



            <Link href="/services" className={`${isActive("/services")} hover:text-purple-500 transition py-2`}>
              {t("nav.services")}
            </Link>

            <Link href="/about" className={`${isActive("/about")} hover:text-purple-500 transition py-2`}>
              {t("nav.about")}
            </Link>

            {/* Book Button */}
            <Link
              href="/bookings"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-center transition"
            >
              {t("nav.bookNow")}
            </Link>

            {/* Theme + Language */}
            <div className="flex items-center justify-center gap-4 pt-4">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-purple-100 dark:hover:bg-slate-800 transition"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}

              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-purple-100 dark:hover:bg-slate-800 transition"
              >
                <span className="text-sm font-semibold">{language}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
