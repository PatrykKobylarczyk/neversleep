"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/assets/logo.png";
import { site } from "../site.config";

function InstagramIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function FacebookIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav
        aria-label="Menu główne"
        className="fixed w-full z-100 flex justify-between items-center px-8 md:px-20 py-6 bg-[#111] backdrop-blur-md border-b border-white/5"
      >
        {/* LEWA STRONA: LOGO (Szerokość w-40) */}
        <div className="flex justify-start w-40">
          <Link className="relative w-40 h-20" href="/" aria-label="Neversleep – strona główna">
            <Image
              src={logo}
              alt="Neversleep Production"
              fill
              sizes="160px"
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* ŚRODEK: Menu Desktopowe (Zawsze wycentrowane) */}
        <div className="hidden md:flex gap-18 text-sm font-medium text-gray-200">
          <Link href="/o-nas" className="hover:text-[#AC137E] transition">
            ABOUT
          </Link>
          <div className="flex gap-6 items-center">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-[#AC137E] transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-[#AC137E] transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon size={20} />
            </a>
          </div>
        </div>

        {/* PRAWA STRONA: Przyciski (Szerokość w-40 dla symetrii) */}
        <div className="flex justify-end w-40">
          {/* Przycisk Let's Talk - Widoczny TYLKO na desktopie (hidden md:block) */}
          <Link
            href="/kontakt"
            className="hidden md:block text-center w-full bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-[#AC137E] hover:text-white transition-all whitespace-nowrap"
          >
            LET&apos;S TALK
          </Link>

          {/* Przycisk MENU - Widoczny TYLKO na mobile (md:hidden) */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="md:hidden text-sm text-gray-200 font-medium tracking-widest hover:text-[#AC137E] transition-colors z-[120]"
          >
            {isOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </nav>

      {/* MOBILNY OVERLAY (WYSUWANY Z PRAWEJ) */}
      <div
        id="mobile-menu"
        inert={!isOpen}
        className={`fixed inset-0 z-50 bg-[#111] transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-screen text-gray-200 flex flex-col items-center justify-center gap-8">
          <Link
            href="/o-nas"
            onClick={() => setIsOpen(false)}
            className="text-4xl font-black hover:text-[#AC137E] transition-colors"
          >
            ABOUT
          </Link>
          <div className="flex gap-6 items-center">
            {/* Zwykły link https otwiera aplikację Instagram na telefonie, jeśli jest zainstalowana */}
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-[#AC137E] transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={32} />
            </a>
            <a
              href={site.facebook} // To dla PC i Androida
              aria-label="Facebook"
              onClick={(e) => {
                e.preventDefault();
                const fbAppUrl = `fb://facewebmodal/f?href=${site.facebook}`;

                // Sprawdzamy czy to iOS
                const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

                if (isIOS) {
                  // Próba otwarcia aplikacji
                  window.location.href = fbAppUrl;

                  // Fallback: Jeśli po 500ms nadal tu jesteśmy (brak apki), otwórz w nowej karcie
                  setTimeout(() => {
                    window.open(site.facebook, "_blank");
                  }, 500);
                } else {
                  // Dla reszty świata standardowe otwarcie
                  window.open(site.facebook, "_blank");
                }
                setIsOpen(false); // Zamknij menu
              }}
              className="text-zinc-400 hover:text-[#AC137E] transition-colors"
            >
              <FacebookIcon size={32} />
            </a>
          </div>
          <Link
            href="/kontakt"
            onClick={() => setIsOpen(false)}
            className="bg-gray-200 text-black px-8 py-4 rounded-full text-lg font-bold mt-20"
          >
            LET&apos;S TALK
          </Link>
        </div>
      </div>
    </>
  );
}
