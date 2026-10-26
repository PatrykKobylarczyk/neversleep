import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Cursor from "../components/Cursor";
import Link from "next/link";
import { site } from "../site.config";
import { services } from "../services";

const inter = Inter({ subsets: ["latin", "latin-ext"] });
// Krój do dużych nagłówków – statyczny, więc obrys liter się nie przecina
const display = Archivo_Black({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
});

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
  employee: site.team.map((p) => ({ "@type": "Person", name: p.name, jobTitle: p.role })),
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
      <body className={`${inter.className} ${display.variable} grain bg-black text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Cursor />
        <Navbar />

        <main>{children}</main>

        <footer className="py-12 px-8 border-t border-white/5 text-gray-200 text-sm bg-[#111]">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 md:justify-between">
            <nav aria-label="Usługi" className="flex flex-col gap-2">
              {services.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`} className="hover:text-[#AC137E] transition-colors">
                  {s.name} Łódź
                </Link>
              ))}
            </nav>
            <address className="not-italic flex flex-col gap-2 md:text-right">
              <span>{site.name}, {site.city}</span>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-[#AC137E] transition-colors">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="hover:text-[#AC137E] transition-colors">
                {site.email}
              </a>
            </address>
          </div>
          <p className="mt-10 text-center text-zinc-500">
            © {new Date().getFullYear()} NEVERSLEEP PRODUCTION. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </body>
    </html>
  );
}
