"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import Image from "next/image"; // Import komponentu Image
import "./globals.css";
import logo from "../public/assets/logo.png";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="pl">
      <body className={`${inter.className} bg-black text-white`}>
        {/* NAVBAR */}
        <nav className="fixed w-full z-100 flex justify-between items-center px-8 md:px-20 py-6 bg-[#111] backdrop-blur-md border-b border-white/5">
          {/* LEWA STRONA: LOGO (Szerokość w-40) */}
          <div className="flex justify-start w-40">
            <a className="relative w-40 h-20" href="/">
              <Image
                src={logo}
                alt="Neversleep Logo"
                fill
                className="object-contain"
                priority
              />
            </a>
          </div>

          {/* ŚRODEK: Menu Desktopowe (Zawsze wycentrowane) */}
          <div className="hidden md:flex gap-18 text-sm font-medium text-gray-200">
            <a href="#" className="hover:text-[#AC137E] transition">
              ABOUT
            </a>
            <div className="flex gap-6 items-center">
              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com/neversleep_production/" // Próba otwarcia w aplikacji
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="text-gray-200 hover:text-[#AC137E] transition-colors"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* FACEBOOK */}
              <a
                href="https://www.facebook.com/neversleep.production"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="text-gray-200 hover:text-[#AC137E] transition-colors"
                aria-label="Facebook"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* PRAWA STRONA: Przyciski (Szerokość w-40 dla symetrii) */}
          <div className="flex justify-end w-40">
            {/* Przycisk Let's Talk - Widoczny TYLKO na desktopie (hidden md:block) */}
            <button className="hidden md:block cursor-pointer w-full bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-[#AC137E]  hover:text-white transition-all whitespace-nowrap">
              LET'S TALK
            </button>

            {/* Przycisk MENU - Widoczny TYLKO na mobile (md:hidden) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-sm text-gray-200 font-medium tracking-widest hover:text-[#AC137E] transition-colors z-[120]"
            >
              {isOpen ? "CLOSE" : "MENU"}
            </button>
          </div>
        </nav>

        {/* MOBILNY OVERLAY (WYSUWANY Z PRAWEJ) */}
        <div
          className={`fixed inset-0 z-50 bg-[#111] transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Nagłówek wewnątrz menu (opcjonalny, skoro przycisk CLOSE jest wyżej) */}
          <div className="flex justify-between items-center px-8 py-6 border-b border-white/5 opacity-0">
            {/* Pusta przestrzeń, aby zachować układ pod przyciskiem CLOSE */}
          </div>

          {/* Linki w menu mobilnym */}
          <div className="h-screen text-gray-200 flex flex-col items-center justify-center -translate-y-[5vh] gap-8 mt-20">
            <a
              href=""
              onClick={() => setIsOpen(false)}
              className="text-4xl font-black hover:text-[#AC137E] transition-colors"
            >
              ABOUT
            </a>
            <div className="flex gap-6 items-center">
              {/* INSTAGRAM */}
              <a
                href="instagram://user?username=neversleep_production" // Próba otwarcia w aplikacji
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-[#AC137E] transition-colors"
                aria-label="Instagram"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* FACEBOOK */}
              <a
                href="fb://page/100064559265502"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-[#AC137E] transition-colors"
                aria-label="Facebook"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
            <button className="bg-gray-200 text-black px-8 py-4 rounded-full text-lg font-bold mt-20">
              LET'S TALK
            </button>
          </div>
        </div>

        <main>{children}</main>

        <footer className="py-12 text-center border-t border-white/5 text-gray-200 text-sm bg-[#111]">
          © 2026 NEVERSLEEP. ALL RIGHTS RESERVED.
        </footer>
      </body>
    </html>
  );
}
