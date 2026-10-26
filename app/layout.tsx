import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { site } from "../site.config";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

// Dane strukturalne dla Google (wizytówka firmy)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  logo: `${site.url}/assets/logo.png`,
  description: site.description,
  sameAs: [site.instagram, site.facebook],
  ...(site.email && { email: site.email }),
  ...(site.phone && { telephone: site.phone }),
  ...(site.city && {
    address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "PL" },
    areaServed: site.city,
  }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`${inter.className} bg-black text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />

        <main>{children}</main>

        <footer className="py-12 text-center border-t border-white/5 text-gray-200 text-sm bg-[#111]">
          © {new Date().getFullYear()} NEVERSLEEP PRODUCTION. ALL RIGHTS RESERVED.
        </footer>
      </body>
    </html>
  );
}
