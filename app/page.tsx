"use client";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"foto" | "video" | null>(null);

  return (
    /* GŁÓWNY KONTENER: Sztywno pod navbarem (128px) */
    <main className="fixed top-[128px] left-0 w-full h-[calc(100vh-128px)] flex flex-col md:flex-row overflow-hidden bg-black text-white selection:bg-purple-500/30">
      {/* PRZYCISK ZAMKNIĘCIA: 
          Jest poza sekcjami, więc właściwość 'fixed' działa idealnie względem okna.
          z-[100] gwarantuje, że zawsze jest na samym wierzchu.
      */}
      {/* PRZYCISK ZAMKNIĘCIA - JEDYNA ZMIANA */}
      {activeTab && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab(null);
          }}
          className="fixed z-[100] right-6 md:right-10 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full p-2 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={
            {
              /* Jeśli aktywne jest VIDEO, musimy obniżyć przycisk o wysokość paska FOTO (ok. 3vh na desktop, 8vh na mobile) */
              top:
                activeTab === "video"
                  ? `calc(128px + 24px + (var(--inactive-size, 8vh)))`
                  : `calc(128px + 24px)`,
              /* Dodajemy CSS variable, żeby łatwo sterować wysokością paska */
              "--inactive-size": "8vh",
            } as React.CSSProperties
          }
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}

      {/* --- SEKCJA FOTO --- */}
      <section
        onClick={() => setActiveTab("foto")}
        className={`relative flex flex-col justify-end p-8 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer overflow-hidden
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
          ${activeTab === "video" ? "opacity-95" : activeTab === "foto" ? "opacity-0" : "opacity-40"}
        `}
        />

        {/* Napis na pasku (gdy sekcja jest zwinięta) */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 
          ${activeTab === "video" ? "opacity-100 translate-y-0 delay-700" : "opacity-0 translate-y-5 delay-0"}`}
        >
          <span className="md:-rotate-90 whitespace-nowrap text-[10px] font-bold tracking-[0.8em] uppercase text-zinc-500">
            FOTO
          </span>
        </div>

        {/* Napisy startowe */}
        <div
          className={`relative z-10 transition-all duration-500 ${activeTab !== null ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}
        >
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">
            FOTO
          </h2>
          <p className="text-[10px] md:text-sm font-light uppercase tracking-[0.3em] mt-2 text-zinc-300">
            Zobacz kadry
          </p>
        </div>

        {/* WORKSPACE FOTO: Białe tło i przewijana treść */}
        <div
          className={`absolute inset-0 z-20 bg-white text-black transition-all duration-1000 scrollbar-hide overflow-y-auto px-6 md:px-20 pt-32 md:pt-44 pb-20
          ${activeTab === "foto" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}
        >
          <div className="max-w-6xl mx-auto flex flex-col min-h-full">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-[3/4] md:aspect-square bg-zinc-100 relative overflow-hidden group/item"
                >
                  <div className="absolute inset-0 bg-zinc-200 transition-transform duration-700 hover:scale-105" />
                </div>
              ))}
            </div>
            {/* STOPKA: Pojawia się na końcu scrollowania galerii */}
            <footer className="mt-24 py-12 text-center border-t border-zinc-100 text-zinc-400 text-[10px] tracking-widest uppercase">
              © 2026 NEVERSLEEP. ALL RIGHTS RESERVED.
            </footer>
          </div>
        </div>
      </section>

      {/* --- SEKCJA VIDEO --- */}
      <section
        onClick={() => setActiveTab("video")}
        className={`relative flex flex-col justify-end p-8 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer overflow-hidden
          ${activeTab === "foto" ? "flex-[0.08] md:flex-[0.03]" : "flex-1"}
        `}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000"
          src="/assets/video.mov"
        />
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-700
          ${activeTab === "foto" ? "opacity-95" : activeTab === "video" ? "opacity-0" : "opacity-40"}
        `}
        />

        {/* Napis na pasku (gdy sekcja jest zwinięta) */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700
          ${activeTab === "foto" ? "opacity-100 translate-y-0 delay-700" : "opacity-0 translate-y-5 delay-0"}`}
        >
          <span className="md:-rotate-90 whitespace-nowrap text-[10px] font-bold tracking-[0.8em] uppercase text-zinc-500">
            VIDEO
          </span>
        </div>

        {/* Napisy startowe */}
        <div
          className={`relative z-10 transition-all duration-500 ${activeTab !== null ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}
        >
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">
            VIDEO
          </h2>
          <p className="text-[10px] md:text-sm font-light uppercase tracking-[0.3em] mt-2 text-zinc-300">
            Zobacz ruch
          </p>
        </div>

        {/* WORKSPACE VIDEO */}
        <div
          className={`absolute inset-0 z-20 bg-white text-black transition-all duration-1000 scrollbar-hide overflow-y-auto px-6 md:px-20 pt-32 md:pt-44 pb-20
          ${activeTab === "video" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"}`}
        >
          <div className="max-w-6xl mx-auto flex flex-col min-h-full">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-[3/4] md:aspect-square bg-zinc-100 relative overflow-hidden group/item"
                >
                  <div className="absolute inset-0 bg-zinc-200 transition-transform duration-700 hover:scale-105" />
                </div>
              ))}
            </div>
            <footer className="mt-24 py-12 text-center border-t border-zinc-100 text-zinc-400 text-[10px] tracking-widest uppercase">
              © 2026 NEVERSLEEP. ALL RIGHTS RESERVED.
            </footer>
          </div>
        </div>
      </section>
    </main>
  );
}
