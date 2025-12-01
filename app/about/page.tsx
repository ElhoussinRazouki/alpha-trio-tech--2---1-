"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useTranslation } from "@/lib/useTranslation";
import { motion } from "framer-motion";
import { Target, Lightbulb, Users } from "lucide-react"; // modern icons

export default function About() {
  const { t } = useTranslation();

  const team = [
    {
      name: "Mohcine Ezzirari",
      role: t("Lead Developer"),
      bio: t("Expert in full-stack development and system architecture"),
      image: "/images/mohssin2.png",
    },
    {
      name: "Youssef Boumalik",
      role: t("AI Specialist"),
      bio: t("Specialized in machine learning and AI solutions"),
      image: "/images/yyyoooo.png",
    },
    {
      name: "Elhoussin Razouki",
      role: t("DevOps Engineer"),
      bio: t("Cloud infrastructure and automation expert"),
      image: "/images/hossinphoto.png",
    },
  ];

  // Animated color loop for borders
  const borderAnimation = {
    background: [
      "linear-gradient(90deg, #8B5CF6, #3B82F6)",
      "linear-gradient(90deg, #3B82F6, #10B981)",
      "linear-gradient(90deg, #10B981, #F59E0B)",
      "linear-gradient(90deg, #F59E0B, #8B5CF6)",
    ],
  };

  const borderTransition = {
    duration: 4,
    repeat: Infinity,
    ease: "linear" as const,
  };

  return (
    <>
      <Navigation />

      <section className="min-h-screen bg-white text-gray-900 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-gray-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-4"
          >
            {t("About AlphaTrio Tech")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-600 dark:text-gray-400 text-center mb-16 max-w-2xl mx-auto"
          >
            {t("Building innovative technology solutions since 2020")}
          </motion.p>

          {/* Company Story — Animated with gradient border */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative p-[2px] rounded-2xl mb-20 shadow-lg overflow-hidden"
          >
            <motion.div
              animate={borderAnimation}
              transition={borderTransition}
              className="absolute inset-0 rounded-2xl"
              style={{
                background: borderAnimation.background[0],
              }}
            />
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center"
              >
                {t("Our Story")}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg"
              >
                {t("company.story.paragraph1")}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
              >
                {t("company.story.paragraph2")}
              </motion.p>
            </div>
          </motion.div>

          {/* Values — Modern cards with icons */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <Target className="w-10 h-10 text-purple-500 mb-3" />,
                title: t("Results-Focused"),
                desc: t("We measure success by your business outcomes"),
              },
              {
                icon: <Lightbulb className="w-10 h-10 text-yellow-400 mb-3" />,
                title: t("Innovation"),
                desc: t("Always exploring new technologies and approaches"),
              },
              {
                icon: <Users className="w-10 h-10 text-blue-400 mb-3" />,
                title: t("Collaboration"),
                desc: t("Working closely with you every step of the way"),
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(139,92,246,0.4)",
                }}
                transition={{ delay: 0.2 * i, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-md p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl shadow-gray-700/50 dark:shadow-black/60 hover:shadow-2xl hover:shadow-purple-500/30 overflow-hidden"
              >
                <motion.div
                  animate={{
                    borderImageSource: [
                      "linear-gradient(90deg, #8B5CF6, #3B82F6)",
                      "linear-gradient(90deg, #3B82F6, #10B981)",
                      "linear-gradient(90deg, #10B981, #F59E0B)",
                      "linear-gradient(90deg, #F59E0B, #8B5CF6)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <div className="flex flex-col items-center text-center">
                  {value.icon}
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400">
                    {value.desc}
                  </p>
                </div>

                {/* Subtle glow background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 blur-2xl"></div>
              </motion.div>
            ))}
          </div>

          {/* Our Team */}
          <div>
            <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              {t("Our Team")}
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * i, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative group rounded-2xl border border-slate-300 dark:border-slate-700
                             bg-white dark:bg-slate-800 backdrop-blur-xl p-6 shadow-lg transition-all duration-500
                             hover:scale-[1.03] hover:shadow-purple-500/30 hover:border-purple-400/50"
                >
                  <div className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full border-2 border-purple-500/50 shadow-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-purple-400 transition">
                    {member.name}
                  </h3>
                  <p className="text-purple-500 dark:text-purple-400 text-sm mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400 text-sm">
                    {member.bio}
                  </p>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 blur-2xl opacity-25"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
