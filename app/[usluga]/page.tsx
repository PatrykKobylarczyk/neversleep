import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "../../services";
import { site } from "../../site.config";
import ParallaxHero from "../../components/fx/ParallaxHero";
import ScrollWords from "../../components/fx/ScrollWords";
import Reveal from "../../components/fx/Reveal";
import HorizontalGallery from "../../components/fx/HorizontalGallery";
import VideoShowcase from "../../components/fx/VideoShowcase";
import HoverList from "../../components/fx/HoverList";
import BigCta from "../../components/fx/BigCta";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ usluga: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ usluga: string }>;
}): Promise<Metadata> {
  const { usluga } = await params;
  const service = services.find((s) => s.slug === usluga);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/${service.slug}` },
    openGraph: {
      title: service.title,
      description: service.description,
      url: `/${service.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ usluga: string }>;
}) {
  const { usluga } = await params;
  const service = services.find((s) => s.slug === usluga);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    areaServed: site.city,
    url: `${site.url}/${service.slug}`,
    provider: { "@type": "ProfessionalService", name: site.name, url: site.url },
  };

  return (
    <div className="bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ParallaxHero kicker={service.kicker} title={service.h1} media={service.hero} />

      {/* WSTĘP – słowa zapalają się przy przewijaniu */}
      <section className="px-8 py-32 md:px-20 md:py-48">
        <ScrollWords
          text={service.intro[0]}
          className="max-w-6xl text-3xl font-semibold leading-[1.15] md:text-6xl"
        />
        <Reveal className="mt-16 grid gap-10 md:mt-24 md:grid-cols-[1fr_2fr]">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-500">
            Prowadzi
            <span className="mt-3 block text-sm tracking-[0.2em] text-white">
              {service.author}
            </span>
          </p>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            {service.intro[1]}
          </p>
        </Reveal>
      </section>

      {/* CO OBEJMUJE */}
      <section className="px-8 pb-32 md:px-20 md:pb-48">
        <Reveal>
          <h2 className="mb-12 text-xs font-bold uppercase tracking-[0.5em] text-zinc-400">
            Co obejmuje
          </h2>
        </Reveal>
        <ol className="border-t border-white/10">
          {service.includes.map((item, i) => (
            <li key={item} className="border-b border-white/10">
              <Reveal delay={i * 0.08} y={40} className="group flex items-baseline gap-6 py-8 md:gap-12 md:py-10">
                <span className="font-display text-sm italic text-accent md:text-xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-2xl font-semibold leading-tight transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-3 md:text-4xl">
                  {item}
                </span>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* REALIZACJE */}
      {service.photos && (
        <HorizontalGallery
          photos={service.photos}
          alt={`${service.photosAlt}, Łódź`}
          title="Realizacje"
        />
      )}
      {service.videos && (
        <section className="px-6 py-24 md:px-20 md:py-40">
          <Reveal>
            <h2 className="mb-12 text-xs font-bold uppercase tracking-[0.5em] text-zinc-400">
              Realizacje
            </h2>
          </Reveal>
          <VideoShowcase videos={service.videos} />
        </section>
      )}

      {/* INNE USŁUGI */}
      <section className="px-8 py-32 md:px-20 md:py-48">
        <Reveal>
          <h2 className="mb-12 text-xs font-bold uppercase tracking-[0.5em] text-zinc-400">
            Zobacz też
          </h2>
        </Reveal>
        <HoverList
          items={others.map((s) => ({
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
