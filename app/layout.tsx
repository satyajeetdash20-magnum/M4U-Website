import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/sections/Footer";
import { ConsultationModalProvider } from "@/components/providers/ConsultationModalProvider";
import { AppProviders } from "@/components/providers/AppProviders";
import { StructuredData } from "@/components/seo/StructuredData";
import { buildMetadata, getSiteUrl, toAbsoluteUrl } from "@/lib/seo";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = buildMetadata({
  path: "/",
  keywords: [
    "math tutoring",
    "GCSE math support",
    "A-Level math mentoring",
    "SAT math coaching",
    "math revision resources",
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MentorSubhiMath",
    url: getSiteUrl(),
    logo: toAbsoluteUrl("/hero-headshot.png"),
    email: "support@mentorsubhimath.com",
    sameAs: [],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@mentorsubhimath.com",
        availableLanguage: ["English"],
      },
    ],
  };

  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="antialiased">
        <StructuredData data={organizationSchema} />
        <AppProviders>
          <ConsultationModalProvider>
            <Navigation />
            <main>{children}</main>
            <Footer />
          </ConsultationModalProvider>
        </AppProviders>
        <Analytics />
      </body>
    </html>
  );
}
