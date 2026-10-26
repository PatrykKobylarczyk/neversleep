// Podstawowe dane firmy używane w meta tagach, danych strukturalnych i na stronie kontaktu.
// Puste pola (email, telefon, miasto) nie są wyświetlane – wystarczy je uzupełnić.
export const site = {
  name: "Neversleep Production",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://neversleep.vercel.app",
  title: "Neversleep Production – fotografia i film: nieruchomości, wnętrza, reklama",
  description:
    "Neversleep Production: fotografia nieruchomości, wnętrz i produktów oraz filmy reklamowe, teledyski i ujęcia z drona. Zobacz portfolio i napisz do nas.",
  email: "",
  phone: "",
  city: "",
  instagram: "https://www.instagram.com/neversleep_production/",
  facebook: "https://www.facebook.com/neversleep.production",
  services: [
    "Fotografia nieruchomości",
    "Fotografia wnętrz i architektury",
    "Fotografia produktowa",
    "Filmy reklamowe",
    "Teledyski",
    "Filmowanie dronem",
  ],
};
