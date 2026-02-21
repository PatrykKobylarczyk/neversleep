"use client";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"foto" | "video" | null>(null);

  return (
    /* h-[100dvh] naprawia problem uciekania sekcji pod pasek adresu na iPhone */
    <main className="fixed top-[128px] left-0 w-full h-[calc(100dvh-128px)] flex flex-col md:flex-row overflow-hidden bg-black text-white selection:bg-purple-500/30">
      {/* PRZYCISK ZAMKNIĘCIA - Pozycjonowany dynamicznie względem aktywnej sekcji */}
      {activeTab && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab(null);
          }}
          className={`fixed z-[100] right-6 md:right-10 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]
            ${activeTab === "video" ? "translate-y-[12dvh] md:translate-y-0" : "translate-y-0"}
          `}
          style={{ top: "calc(128px + 24px)" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#878787"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}

      {/* --- SEKCJA FOTO --- */}
      <section
        onClick={() => setActiveTab("foto")}
        className={`relative flex flex-col justify-end p-8 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer overflow-hidden group
          ${activeTab === "video" ? "flex-[0.08] md:flex-[0.03]" : "flex-1"}
        `}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070')`,
          }}
        />
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-700
          ${activeTab === "video" ? "opacity-95" : activeTab === "foto" ? "opacity-0" : "opacity-40 group-hover:opacity-10"}
        `}
        />

        {/* Napis na pasku nieaktywnym */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 
          ${activeTab === "video" ? "opacity-100 translate-y-0 delay-700" : "opacity-0 translate-y-5 delay-0"}`}
        >
          <span className="md:-rotate-90 whitespace-nowrap text-[9px] md:text-xs font-bold tracking-[0.8em] uppercase text-zinc-400">
            FOTO
          </span>
        </div>

        <div
          className={`relative z-10 transition-all duration-500 ${activeTab !== null ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}
        >
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">
            FOTO
          </h2>
          <p className="text-[10px] md:text-sm font-light uppercase tracking-[0.3em] mt-2 text-zinc-200">
            Zobacz kadry
          </p>
        </div>

        {/* WORKSPACE FOTO */}
        <div
          className={`absolute inset-0 z-20 bg-white text-black transition-all duration-1000 scrollbar-hide overflow-y-auto px-14 md:px-32 pt-24 md:pt-40 pb-20
          ${activeTab === "foto" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}
        >
          {/* Zmiana max-w-6xl na max-w-4xl aby zwęzić kafelki */}
          <div className="max-w-4xl mx-auto flex flex-col min-h-full">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-[3/4] md:aspect-square bg-zinc-100 animate-fadeIn relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-zinc-200 transition-transform duration-700 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SEKCJA VIDEO --- */}
      <section
        onClick={() => setActiveTab("video")}
        className={`relative flex flex-col justify-end p-8 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer overflow-hidden group
          ${activeTab === "foto" ? "flex-[0.08] md:flex-[0.03]" : "flex-1"}
        `}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          src="/assets/video.mov"
        />
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-700
          ${activeTab === "foto" ? "opacity-95" : activeTab === "video" ? "opacity-0" : "opacity-40 group-hover:opacity-10"}
        `}
        />

        {/* Napis na pasku nieaktywnym */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700
          ${activeTab === "foto" ? "opacity-100 translate-y-0 delay-700" : "opacity-0 translate-y-5 delay-0"}`}
        >
          <span className="md:-rotate-90 whitespace-nowrap text-[9px] md:text-xs font-bold tracking-[0.8em] uppercase text-zinc-500">
            VIDEO
          </span>
        </div>

        <div
          className={`relative z-10 transition-all duration-500 ${activeTab !== null ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}
        >
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">
            VIDEO
          </h2>
          <p className="text-[10px] md:text-sm font-light uppercase tracking-[0.3em] mt-2 text-zinc-400">
            Zobacz ruch
          </p>
        </div>

        {/* WORKSPACE VIDEO */}
        <div
          className={`absolute inset-0 z-20 bg-white text-black transition-all duration-1000 scrollbar-hide overflow-y-auto px-14 md:px-32 pt-24 md:pt-40 pb-20
          ${activeTab === "video" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"}`}
        >
          {/* Zmiana max-w-6xl na max-w-4xl aby zwęzić kafelki */}
          <div className="max-w-4xl mx-auto flex flex-col min-h-full">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-[3/4] md:aspect-square bg-zinc-100 animate-fadeIn relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-zinc-200 transition-transform duration-700 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
