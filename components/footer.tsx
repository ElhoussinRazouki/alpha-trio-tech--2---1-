"use client"

import { useTranslation } from "@/lib/useTranslation"
import { useLanguage } from "@/components/language-provider"
import { trackLinkClick, trackSocialInteraction } from "@/lib/analytics"
import { FaInstagram, FaLinkedin } from "react-icons/fa"
import { SiTiktok } from "react-icons/si"

export default function Footer() {
  const { language } = useLanguage()
  const { t } = useTranslation()

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">AlphaTrio Tech</h3>
            <p className="text-gray-400 text-sm font-bold text-lg mb-4">{t("Where Deep Tech Meets Human Mindset")}</p>
            {/* Social Media */}
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/alphatrio_tech/?hl=en"
              target="_blank"
              className="text-gray-400 hover:text-pink-500 transition text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/?lang=fr"
              target="_blank"
              className="text-gray-400 hover:text-white transition text-xl"
            >
              <SiTiktok />
            </a>
             <a
              href="https://www.linkedin.com/in/alphatrio-tech-66357838b/"
              target="_blank"
              className="text-gray-400 hover:text-blue-500 transition text-xl"
            >
              <FaLinkedin />
            </a>
          </div>
          </div>
          

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("Quick Links")}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="/"
                  className="hover:text-purple-400 transition"
                  onClick={() => trackLinkClick(t("Home"), "/", "internal")}
                >
                  {t("Home")}
                </a>
              </li>
              <li>
                <a
                  href="/portfolio"
                  className="hover:text-purple-400 transition"
                  onClick={() => trackLinkClick(t("Portfolio"), "/portfolio", "internal")}
                >
                  {t("Portfolio")}
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="hover:text-purple-400 transition"
                  onClick={() => trackLinkClick(t("Services"), "/services", "internal")}
                >
                  {t("Services")}
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-purple-400 transition"
                  onClick={() => trackLinkClick(t("About"), "/about", "internal")}
                >
                  {t("About")}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{t("Services")}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="/services#it"
                  className="hover:text-purple-400 transition"
                  onClick={() => trackLinkClick(t("IT Solutions"), "/services#it", "internal")}
                >
                  {t("IT Solutions")}
                </a>
              </li>
              <li>
                <a
                  href="/services#automation"
                  className="hover:text-purple-400 transition"
                  onClick={() => trackLinkClick(t("Automation"), "/services#automation", "internal")}
                >
                  {t("Automation")}
                </a>
              </li>
              <li>
                <a
                  href="/services#ai"
                  className="hover:text-purple-400 transition"
                  onClick={() => trackLinkClick(t("AI Solutions"), "/services#ai", "internal")}
                >
                  {t("AI Solutions")}
                </a>
              </li>
              <li>
                <a
                  href="/services#apps"
                  className="hover:text-purple-400 transition"
                  onClick={() => trackLinkClick(t("App Development"), "/services#apps", "internal")}
                >
                  {t("App Development")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t("Contact")}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{t("Email")}: contact@alphatriotech.com</li>
              <li>{t("Phone")}: +212 767879005</li>
              <li>{t("Address")}: Rabat, Morocco</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0 mx-auto">
            © 2025 AlphaTrio Tech. {t("All rights reserved")}.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-purple-400 transition"
              onClick={() => trackSocialInteraction("facebook", "click")}
            >
              <span className="sr-only">{t("Facebook")}</span>
              {/* Facebook Icon */}
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-400 transition"
              onClick={() => trackSocialInteraction("twitter", "click")}
            >
              <span className="sr-only">{t("Twitter")}</span>
              {/* Twitter Icon */}
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-400 transition"
              onClick={() => trackSocialInteraction("linkedin", "click")}
            >
              <span className="sr-only">{t("LinkedIn")}</span>
              {/* LinkedIn Icon */}
            </a>
          </div>
          
        </div>
      </div>
    </footer>
  )
}