import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neversleep studio",
  description: "Digital Agency",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`${inter.className} bg-black text-white`}>
        {/* NAVBAR NA SAMEJ GÓRZE */}
        <nav className="fixed w-full z-50 flex justify-between items-center px-8 py-6 bg-black/50 backdrop-blur-md border-b border-white/5">
          <div className="text-2xl font-bold tracking-tighter italic">
            Nevesleep
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition">
              SERVICES
            </a>
            <a href="#" className="hover:text-white transition">
              WORKS
            </a>
            <a href="#" className="hover:text-white transition">
              ABOUT
            </a>
          </div>
          <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-purple-600 hover:text-white transition-all">
            LET'S TALK
          </button>
        </nav>

        {/* TUTAJ WYŚWIETLA SIĘ TREŚĆ Z page.tsx */}
        <main>{children}</main>

        <footer className="py-12 text-center border-t border-white/5 text-gray-600 text-sm">
          © 2026 NEVERSLEEP. ALL RIGHTS RESERVED.
        </footer>
      </body>
    </html>
  );
}
