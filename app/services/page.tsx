"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/useTranslation";
import { Monitor, Cog, Sparkles, Smartphone } from "lucide-react";


export default function Services() {
  const { t } = useTranslation();

  const services = [
    {
      icon: Monitor,
      title: t("IT Solutions"),
      description: t(
        "Enterprise IT infrastructure, cloud solutions, and technical support"
      ),
      features: [
        t("Infrastructure Setup"),
        t("Cloud Migration"),
        t("24/7 Support"),
        t("Security Audits"),
      ],
      gradient: "from-purple-500/10 to-blue-500/10",
    },
    {
      icon: Cog,
      title: t("Automation"),
      description: t(
        "Business process automation to increase efficiency and reduce costs"
      ),
      features: [
        t("RPA Solutions"),
        t("Workflow Automation"),
        t("Integration Services"),
        t("Process Optimization"),
      ],
      gradient: "from-cyan-500/10 to-emerald-500/10",
    },
    {
      icon: Sparkles,
      title: t("AI Solutions"),
      description: t(
        "Artificial intelligence and machine learning solutions for your business"
      ),
      features: [
        t("AI Consulting"),
        t("ML Models"),
        t("Data Analytics"),
        t("Predictive Analytics"),
      ],
      gradient: "from-pink-500/10 to-purple-500/10",
    },
    {
      icon: Smartphone,
      title: t("App Development"),
      description: t(
        "Custom web and mobile applications tailored to your needs"
      ),
      features: [
        t("Web Apps"),
        t("Mobile Apps"),
        t("API Development"),
        t("Maintenance & Support"),
      ],
      gradient: "from-pink-500/10 to-purple-500/10",
    },
  ];

  const processSteps = [
    {
      num: "01",
      title: t("Consultation"),
      desc: t("Understand your needs and goals"),
    },
    {
      num: "02",
      title: t("Planning"),
      desc: t("Create a detailed project plan"),
    },
    {
      num: "03",
      title: t("Development"),
      desc: t("Build and implement solutions"),
    },
    {
      num: "04",
      title: t("Support"),
      desc: t("Ongoing maintenance and support"),
    },
  ];

  return (
    <>
      <Navigation />

      <section className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-20 px-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {t("Our Services")}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              {t(
                "Comprehensive technology solutions to drive your business forward"
              )}
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {services.map((service, i) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative bg-gradient-to-br ${service.gradient} p-[1px] rounded-2xl group`}
                >
                  <div
                    className="flex flex-col justify-between w-full h-full 
                      bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 
                      backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-700 
                      shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]
                      hover:shadow-[0_12px_40px_rgb(0,188,212,0.25)] dark:hover:shadow-[0_12px_40px_rgba(0,188,212,0.35)]
                      hover:border-[#00BCD4]/40 ring-1 ring-white/50 dark:ring-slate-600/30 
                      transition-all duration-400 hover:-translate-y-2 hover:scale-[1.03] min-h-[420px] shadow-2xl shadow-gray-700/50 dark:shadow-black/60 hover:shadow-2xl hover:shadow-purple-500/30 ring-1 ring-white/50 dark:ring-slate-600/30 transition-all duration-400 hover:-translate-y-2 hover:scale-105"
                  >
                    <IconComponent className="w-16 h-16 mb-4 text-purple-500 dark:text-purple-400" />
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, j) => (
                        <li
                          key={j}
                          className="text-gray-700 dark:text-gray-300 flex items-center gap-2 hover:text-purple-500 transition"
                        >
                          <span className="text-purple-500 dark:text-purple-400">
                            ✓
                          </span>{" "}
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Process Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/95 dark:bg-slate-900/60 backdrop-blur-xl p-10 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-center transition-colors duration-300"
          >
            <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {t("Our Process")}
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl shadow-gray-700/50 dark:shadow-black/60 hover:shadow-2xl hover:shadow-purple-500/30 ring-1 ring-white/50 dark:ring-slate-600/30 transition-all duration-400 hover:-translate-y-2 hover:scale-105"
                >
                  <div className="text-4xl font-bold text-purple-500 dark:text-purple-400 mb-2">
                    {step.num}
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                    {step.title}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
