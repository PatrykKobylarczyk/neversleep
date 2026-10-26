import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "../../services";
import { site } from "../../site.config";

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
    <div className="min-h-dvh bg-black px-8 md:px-20 pt-48 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase leading-none">
          {service.h1}
        </h1>

        <div className="mt-10 max-w-3xl space-y-6 text-lg text-zinc-300 leading-relaxed">
          {service.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="text-sm text-zinc-500">Prowadzi: {service.author}</p>
        </div>

        <h2 className="mt-16 text-xs font-bold tracking-[0.4em] text-zinc-400 uppercase">
          Co obejmuje
        </h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2 text-lg max-w-4xl">
          {service.includes.map((item) => (
            <li key={item} className="border-b border-white/10 pb-3">
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-16 text-xs font-bold tracking-[0.4em] text-zinc-400 uppercase">
          Realizacje
        </h2>
        {service.photos && (
          <div className="mt-6 columns-1 md:columns-2 gap-4 space-y-4">
            {service.photos.map((img, idx) => (
              <Image
                key={img.src}
                src={img.src}
                width={img.width}
                height={img.height}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full h-auto break-inside-avoid"
                alt={`${service.photosAlt}, Łódź – zdjęcie ${idx + 1}`}
              />
            ))}
          </div>
        )}
        {service.videos && (
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            {service.videos.map((v) => (
              <figure key={v.id}>
                <video
                  src={v.videoSrc}
                  poster={v.thumbnail}
                  preload="none"
                  controls
                  playsInline
                  aria-label={v.description}
                  className="w-full aspect-video bg-zinc-900 object-cover"
                />
                <figcaption className="mt-3 text-xs font-bold uppercase tracking-[0.2em]">
                  {v.title}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="mt-20 flex flex-wrap gap-4">
          <Link
            href="/kontakt"
            className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-[#AC137E] hover:text-white transition-colors"
          >
            ZAPYTAJ O TERMIN
          </Link>
          <Link
            href="/"
            className="border border-white/30 px-8 py-4 rounded-full font-bold hover:border-[#AC137E] hover:text-[#AC137E] transition-colors"
          >
            CAŁE PORTFOLIO
          </Link>
        </div>
      </div>
    </div>
  );
}
