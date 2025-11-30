import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { LanguageProvider } from "../components/language-provider";
import { BookingFunnel } from "@/components/BookingFunnel";


const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AlphaTrio Tech - IT Solutions & Automation",
  description:
    "Professional IT solutions, automation, and AI services for your business",
  generator: "Team AlphaTrio Tech",

  // ✅ Added favicon here
  icons: {
    icon: "/images/alphatrio.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body
        className={`font-sans antialiased bg-white text-slate-900 dark:bg-slate-950 dark:text-white transition-colors duration-200`}
      >
        <ThemeProvider attribute="class">
          <LanguageProvider>
            {children}
            <BookingFunnel />
          </LanguageProvider>
        </ThemeProvider>
      </body>

    </html>
  );
}
