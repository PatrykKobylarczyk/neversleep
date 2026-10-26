import type { Metadata } from "next";
import { site } from "../../site.config";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakt z Neversleep Production, Łódź: tel. 789 985 677, patryk.kobylarczyk@gmail.com. Sesje zdjęciowe nieruchomości, filmy reklamowe, ujęcia z drona.",
  alternates: { canonical: "/kontakt" },
};

export default function Contact() {
  return (
    <div className="min-h-dvh bg-black px-8 md:px-20 pt-48 pb-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase leading-none">
          Let&apos;s talk
        </h1>
        <p className="mt-10 text-lg text-zinc-300 leading-relaxed">
          Planujesz sesję zdjęciową nieruchomości, film reklamowy albo ujęcia z
          drona w Łodzi lub okolicach? Napisz albo zadzwoń, czego potrzebujesz, a
          odezwiemy się z wyceną.
        </p>

        <ul className="mt-12 space-y-6 text-2xl md:text-3xl font-bold">
          {site.email && (
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-[#AC137E] transition-colors">
                {site.email}
              </a>
            </li>
          )}
          {site.phone && (
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-[#AC137E] transition-colors">
                {site.phone}
              </a>
            </li>
          )}
          <li>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#AC137E] transition-colors"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#AC137E] transition-colors"
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
