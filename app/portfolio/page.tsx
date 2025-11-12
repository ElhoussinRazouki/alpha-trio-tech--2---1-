"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useTranslation } from "@/lib/useTranslation";

export default function Portfolio() {
  const { t } = useTranslation();

  const projects = [
    {
      id: 1,
      title: t("Mobtwin"),
      description: t(
        "Built & launched Mobtwin – a scalable web platform for real-time tracking of mobile app states across Google Play & App Store. Features a powerful search engine for millions of apps, powered by Node.js workers, MongoDB replica sets, Elasticsearch, and automated CI/CD. Built with TypeScript, React, Redux, GraphQL, and web scraping for fast analytics and seamless UX."
      ),
      year: 2024,
      image: "/images/img1.png",
    },
    {
      id: 2,
      title: t("Spyci"),
      description: t(
        "Built a tool that exploits persistent XSS to remotely execute JavaScript code in real-time. Using JavaScript, Node.js, Socket.io, Webpack, HTML5, CSS."
      ),
      year: 2024,
      image: "/images/spyci.png",
    },
    {
      id: 3,
      title: t("Fat AI - Body Fat Percentage"),
      description: t(
        "Built and launched Fat AI, an iOS app for body fat tracking using React Native for mobile, Node.js for APIs, LLMs for chat and vision, and AWS S3 for storage. Implemented AI-driven body fat analysis, personalized fitness plans, and real-time progress tracking to enhance user health and engagement."
      ),
      year: 2023,
      image: "/images/fatai-portrait.png",
    },
    {
      id: 4,
      title: t("Viralth - AI Thumbnail Maker"),
      description: t(
        "Built and launched Viralth - AI Thumbnail Maker, an iOS app for AI-powered thumbnail creation using React Native for mobile, Node.js for APIs, GPT-Image1 for image generation, and AWS S3 for storage. Implemented AI-driven thumbnail design, personalized suggestions, and real-time editing to enhance user creativity and engagement."
      ),
      year: 2023,
      image: "/images/thumbnail-maker-portrait.png",
    },
    {
      id: 5,
      title: t("RPA Solution"),
      description: t("Send multiple emails in Gmail directly via Google Sheets."),
      year: 2025,
      image: "/images/aiautomation.jpg",
    },
    {
      id: 6,
      title: t("StockNova"),
      description: t("Full-stack e-commerce solution with payment integration."),
      year: 2021,
      image: "/images/dashbordmanage.jpg",
    },
  ];

  return (
    <>
      <Navigation />

      <section className="min-h-screen bg-white text-gray-900 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-gray-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            {t("Our Portfolio")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            {t(
              "Explore our latest projects and see how we've helped businesses transform with technology"
            )}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="relative group bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl shadow-gray-700/50 dark:shadow-black/60 hover:shadow-purple-500/30 ring-1 ring-white/50 dark:ring-slate-600/30 transition-all duration-400 hover:-translate-y-2 hover:scale-105"
              >
                {/* Image Section */}
                <div className="relative h-52 overflow-hidden rounded-xl mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 dark:opacity-60"></div>
                </div>

                {/* Content */}
                <div className="p-4 relative">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Container for description with hover effect */}
                  <div className="relative min-h-[3.5rem]">
                    {/* Truncated description (normal state) */}
                    <p className="text-gray-700 dark:text-gray-400 text-sm line-clamp-2 transition-all duration-300 group-hover:opacity-0 absolute inset-0">
                      {project.description}
                    </p>

                    {/* Full description (hover state) - appears in the exact same position */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg p-3 max-h-32 overflow-y-auto border border-slate-200 dark:border-slate-700 shadow-lg">
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-500 text-sm mt-4">
                    {t("Year")}: {project.year}
                  </p>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 blur-2xl opacity-25"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}