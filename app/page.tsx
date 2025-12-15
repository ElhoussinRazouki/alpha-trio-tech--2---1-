"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/useTranslation";
import { Button } from "@/components/ui/button";
import { TweetCard } from "@/components/ui/tweet-card";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import LiquidChrome from "@/components/LiquidChrome";
import { Monitor, Cog, Sparkles, Smartphone } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";

const tweets = [
  "1884066338739830835",
  "1826866882064122056",
  "1638226410065268737",
  "1986514377470845007",
  "1882993091784880557",
  "1415752955152666627",
  "1725656554878492779",
  "1917711292325933358",
  "1890910896903319896",
  "1907275807191339448",
  "1907422133849911388",
  "1929282761170280832",
  "1925649192325648725",
  "1938964723342680437",
  "1985105567367708703",
];

export default function Home() {
  const { t } = useTranslation();

  const stats = [
    { num: "50+", label: t("Projects Completed") },
    { num: "30+", label: t("Happy Clients") },
    { num: "5+", label: t("Years Experience") },
    { num: "100%", label: t("Client Satisfaction") },
  ];

  const services = [
    {
      icon: Monitor,
      title: t("IT Solutions"),
      desc: t("Enterprise IT infrastructure and support"),
    },
    {
      icon: Cog,
      title: t("Automation"),
      desc: t("Business process automation"),
    },
    {
      icon: Sparkles,
      title: t("AI Solutions"),
      desc: t("AI-powered business solutions"),
    },
    {
      icon: Smartphone,
      title: t("App Development"),
      desc: t("Custom web and mobile apps"),
    },
  ];

  return (
    <>
      <Navigation />

      {/* Hero Section */}

      <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 relative overflow-hidden">
        <ParticlesBackground />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            AlphaTrio Tech
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 dark:text-gray-200 mb-6">
            {t("Where Deep Tech Meets Human Mindset")}
          </p>
          <p className="text-lg text-slate-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            {t("Professional IT solutions, automation, and AI services to transform your business")}
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button className="book-cta bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-semibold text-white transition shadow-lg hover:shadow-purple-900/70 h-14 hover:cursor-pointer">
              {t("Book Free Consultation")}
            </Button>

          </div>

        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl shadow-gray-700/50 dark:shadow-black/60 hover:shadow-2xl hover:shadow-purple-500/30 ring-1 ring-white/50 dark:ring-slate-600/30 transition-all duration-400 hover:-translate-y-2 hover:scale-105 text-center"
            >
              <div className="text-5xl font-extrabold text-purple-500 mb-2">
                {stat.num}
              </div>
              <p className="text-slate-600 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            {t("Our Services")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl shadow-gray-700/50 dark:shadow-black/60 hover:shadow-2xl hover:shadow-purple-500/30 ring-1 ring-white/50 dark:ring-slate-600/30 transition-all duration-400 hover:-translate-y-2 hover:scale-105"
                >
                  <IconComponent className="w-12 h-12 mb-4 text-purple-500 dark:text-purple-400" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-400">
                    {service.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Motivation Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("home.motivation.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("home.motivation.description")}
            </p>
          </div>
          <InfiniteMovingCards
            items={tweets.map((id) => (
              <TweetCard key={id} id={id} />
            ))}
            direction="left"
            speed="slow"
            pauseOnHover={true}
          />
        </div>

      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_70%)]"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center text-white z-10"
        >
          <h2 className="text-4xl font-bold mb-6">{t("Ready to Transform Your Business?")}</h2>
          <p className="text-lg mb-8 opacity-90">{t("Let's discuss how we can help you achieve your goals")}</p>
          <Button className="book-cta bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition shadow-lg h-12 hover:cursor-pointer">
            {t("Schedule Your Free Consultation")}
          </Button>
        </motion.div>
      </section>

      <div style={{ width: '100%', height: '0px', position: 'relative' }}>

        {/* <LiquidChrome baseColor={[0.3, 0.1, 0.5]} speed={0.3} amplitude={0.4} /> */}

      </div>

      <Footer />
    </>
  );
}
