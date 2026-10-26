import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../../site.config";
import { services } from "../../services";

export const metadata: Metadata = {
  title: "O nas",
  description:
    "Neversleep Production to duet z Łodzi: Patryk Kobylarczyk (fotografia) i Kamil Pokrzywa (video). Zdjęcia nieruchomości i wnętrz, filmy reklamowe, ujęcia z drona.",
  alternates: { canonical: "/o-nas" },
};

export default function About() {
  return (
    <div className="min-h-dvh bg-black px-8 md:px-20 pt-48 pb-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase leading-none">
          O nas
        </h1>
        <div className="mt-10 space-y-6 text-lg text-zinc-300 leading-relaxed">
          <p>
            Neversleep Production to duet z Łodzi. Jest nas dwóch i świetnie się
            uzupełniamy: Patryk odpowiada za fotografię, Kamil za video. Dzięki
            temu jedną sesję możemy zamienić w komplet zdjęć i film.
          </p>
          <p>
            Fotografujemy nieruchomości, wnętrza i produkty, realizujemy filmy
            reklamowe, teledyski i ujęcia z drona. Działamy w Łodzi i okolicach.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {site.team.map((person) => (
            <li key={person.name} className="border border-white/10 p-6">
              <p className="text-2xl font-bold">{person.name}</p>
              <p className="mt-2 text-xs font-bold tracking-[0.4em] text-zinc-400 uppercase">
                {person.role}
              </p>
            </li>
          ))}
        </ul>

        <h2 id="uslugi" className="scroll-mt-40 mt-16 text-xs font-bold tracking-[0.4em] text-zinc-400 uppercase">
          Usługi
        </h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2 text-lg">
          {services.map((s) => (
            <li key={s.slug} className="border-b border-white/10 pb-3">
              <Link href={`/${s.slug}`} className="hover:text-[#AC137E] transition-colors">
                {s.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-wrap gap-4">
          <Link
            href="/"
            className="border border-white/30 px-8 py-4 rounded-full font-bold hover:border-[#AC137E] hover:text-[#AC137E] transition-colors"
          >
            ZOBACZ PORTFOLIO
          </Link>
          <Link
            href="/kontakt"
            className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-[#AC137E] hover:text-white transition-colors"
          >
            LET&apos;S TALK
          </Link>
        </div>
      </div>
    </div>
  );
}
