import type { Metadata } from "next";
import { site } from "../../site.config";
import { services } from "../../services";
import ParallaxHero from "../../components/fx/ParallaxHero";
import ScrollWords from "../../components/fx/ScrollWords";
import Reveal from "../../components/fx/Reveal";
import TeamCard from "../../components/fx/TeamCard";
import HoverList from "../../components/fx/HoverList";
import BigCta from "../../components/fx/BigCta";
import Marquee from "../../components/Marquee";

export const metadata: Metadata = {
  title: "O nas",
  description:
    "Neversleep Production to duet z Łodzi: Patryk Kobylarczyk (fotografia) i Kamil Pokrzywa (video). Zdjęcia nieruchomości i wnętrz, filmy reklamowe, ujęcia z drona.",
  alternates: { canonical: "/o-nas" },
};

// Opisy i tła kart zespołu – praca każdej z osób
const teamDetails: Record<string, { text: string; media: React.ComponentProps<typeof TeamCard>["media"] }> = {
  "Patryk Kobylarczyk": {
    text: "Fotografia nieruchomości, wnętrz i detali. Światło, linie i kadr, który sprzedaje przestrzeń.",
    media: { type: "image", src: "/assets/foto/estates/e-33.jpg" },
  },
  "Kamil Pokrzywa": {
    text: "Filmy reklamowe, teledyski, wydarzenia i ujęcia z drona. Od pomysłu, przez zdjęcia, po montaż i kolor.",
    media: {
      type: "video",
      src: "/assets/video/hero-Bridge.mp4",
      poster: "/assets/video/posters/hero-Bridge.jpg",
    },
  },
};

export default function About() {
  return (
    <div className="bg-black">
      <ParallaxHero
        kicker="Neversleep Production · Łódź"
        title="Jest nas dwóch"
        media={{
          type: "video",
          src: "/assets/video/hero-Bridge.mp4",
          poster: "/assets/video/posters/hero-Bridge.jpg",
        }}
      />

      {/* MANIFEST */}
      <section className="px-8 py-32 md:px-20 md:py-48">
        <ScrollWords
          text="Działamy w duecie, bo świetnie się uzupełniamy. Patryk robi zdjęcia, Kamil kręci filmy. Jedna sesja może dać Ci komplet: kadry do ogłoszenia i film, który zatrzyma scrollowanie."
          className="max-w-6xl text-3xl font-semibold leading-[1.15] md:text-6xl"
        />
      </section>

      {/* ZESPÓŁ */}
      <section className="px-6 pb-32 md:px-20 md:pb-48">
        <Reveal>
          <h2 className="mb-12 text-xs font-bold uppercase tracking-[0.5em] text-zinc-400">
            Zespół
          </h2>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          {site.team.map((person, i) => (
            <TeamCard
              key={person.name}
              index={i}
              name={person.name}
              role={person.role}
              text={teamDetails[person.name].text}
              media={teamDetails[person.name].media}
            />
          ))}
        </div>
      </section>

      {/* PASEK */}
      <div className="relative h-12">
        <Marquee items={["Fotografia", "Video", "Dron", "Wnętrza", "Reklama", "Łódź"]} />
      </div>

      {/* USŁUGI */}
      <section id="uslugi" className="scroll-mt-32 px-8 py-32 md:px-20 md:py-48">
        <Reveal>
          <h2 className="mb-12 text-xs font-bold uppercase tracking-[0.5em] text-zinc-400">
            Usługi
          </h2>
        </Reveal>
        <HoverList
          items={services.map((s) => ({
            href: `/${s.slug}`,
            label: s.name,
            meta: s.kicker,
            image: s.preview,
          }))}
        />
      </section>

      <BigCta />
    </div>
  );
}
