import Link from "next/link";

// Wielki przewijany napis prowadzący do kontaktu
export default function BigCta() {
  const words = Array.from({ length: 6 }, () => "Let's talk");
  return (
    <Link
      href="/kontakt"
      aria-label="Przejdź do kontaktu"
      className="group relative block overflow-hidden border-y border-white/10 py-10 md:py-16"
    >
      <span className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-y-100" />
      <span aria-hidden="true" className="marquee-track relative flex w-max gap-12 whitespace-nowrap">
        {[...words, ...words].map((w, i) => (
          <span
            key={i}
            className={`font-display text-6xl italic uppercase leading-none md:text-[9vw] ${
              i % 2 ? "text-outline" : "text-white"
            }`}
          >
            {w} <span className="text-accent transition-colors group-hover:text-white">✦</span>
          </span>
        ))}
      </span>
    </Link>
  );
}
