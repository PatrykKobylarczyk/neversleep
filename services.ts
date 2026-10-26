import { photoProjects, videoProjects, type Photo, type VideoProject } from "./data";
import type { HeroMedia } from "./components/fx/ParallaxHero";

// Podstrony usług – każda celuje w jedną frazę wyszukiwania z Łodzią
export interface Service {
  slug: string;
  name: string; // nazwa w menu i stopce
  h1: string;
  title: string; // <title> (do ok. 60 znaków)
  description: string; // meta description (do ok. 155 znaków)
  author: string; // kto z duetu prowadzi tę usługę
  kicker: string; // mały napis nad tytułem
  hero: HeroMedia;
  preview: string; // zdjęcie podglądu na liście usług
  intro: string[];
  includes: string[];
  photos?: Photo[];
  photosAlt?: string;
  videos?: VideoProject[];
}

const [estates, details] = photoProjects;

// Wybiera zdjęcia z galerii po numerach plików (np. 19 → e-19.jpg)
const pick = (photos: Photo[], prefix: string, numbers: number[]) =>
  numbers.map((n) => photos.find((p) => p.src.endsWith(`/${prefix}-${n}.jpg`))!);

export const services: Service[] = [
  {
    slug: "fotografia-nieruchomosci",
    name: "Fotografia nieruchomości",
    h1: "Fotografia nieruchomości Łódź",
    title: "Fotografia nieruchomości Łódź",
    description:
      "Zdjęcia mieszkań i domów na sprzedaż i wynajem w Łodzi i okolicach. Jasne, równe kadry, które przyciągają kupujących. Zobacz realizacje i zapytaj o termin.",
    author: "Patryk Kobylarczyk",
    kicker: "Foto · Nieruchomości",
    hero: { type: "image", src: "/assets/foto/estates/e-19.jpg" },
    preview: "/assets/foto/estates/e-8.jpg",
    intro: [
      "Robimy zdjęcia mieszkań, domów i lokali do ogłoszeń sprzedaży i wynajmu, dla agencji nieruchomości, deweloperów i właścicieli. Działamy w Łodzi i okolicach.",
      "Dobre zdjęcia to pierwsze, co widzi kupujący. Dbamy o proste linie, naturalne światło i kolory zgodne z rzeczywistością, żeby ogłoszenie wyróżniało się na portalu.",
    ],
    includes: [
      "Sesja zdjęciowa mieszkania, domu lub lokalu",
      "Obróbka zdjęć: prostowanie perspektywy, korekta światła i kolorów",
      "Zdjęcia gotowe do portali ogłoszeniowych i mediów społecznościowych",
      "Możliwość połączenia z filmem lub ujęciami z drona",
    ],
    photos: pick(estates.images, "e", [8, 4, 18, 33, 38, 41, 27, 12, 29, 44, 49, 11]),
    photosAlt: estates.alt,
  },
  {
    slug: "fotografia-wnetrz",
    name: "Fotografia wnętrz",
    h1: "Fotografia wnętrz i detali Łódź",
    title: "Fotografia wnętrz i architektury Łódź",
    description:
      "Fotografia wnętrz, architektury i detali w Łodzi dla architektów, projektantów i marek wnętrzarskich. Zobacz portfolio i napisz do nas.",
    author: "Patryk Kobylarczyk",
    kicker: "Foto · Wnętrza i detale",
    hero: { type: "image", src: "/assets/foto/details/d-18.jpg" },
    preview: "/assets/foto/details/d-7.jpg",
    intro: [
      "Fotografujemy zrealizowane projekty wnętrz, architekturę i detale: materiały, meble, oświetlenie. Dla architektów, projektantów wnętrz, showroomów i marek.",
      "Pokazujemy zarówno całe przestrzenie, jak i szczegóły, które budują charakter projektu, tak żeby zdjęcia nadawały się do portfolio, na stronę i do publikacji.",
    ],
    includes: [
      "Zdjęcia całych wnętrz i ujęcia detali",
      "Fotografia architektury",
      "Fotografia produktowa mebli i dodatków",
      "Obróbka zdjęć do portfolio, na stronę i do social mediów",
    ],
    photos: pick(details.images, "d", [7, 14, 20, 5, 13, 21, 9, 3, 19, 1, 16, 12]),
    photosAlt: details.alt,
  },
  {
    slug: "film-reklamowy",
    name: "Film reklamowy",
    h1: "Film reklamowy Łódź",
    title: "Film reklamowy, teledyski i dron Łódź",
    description:
      "Filmy reklamowe, teledyski, filmy z wydarzeń i ujęcia z drona w Łodzi i całej Polsce. Od pomysłu po montaż. Zobacz nasze realizacje.",
    author: "Kamil Pokrzywa",
    kicker: "Video · Reklama · Dron",
    hero: {
      type: "video",
      src: "/assets/video/hero-Dubai.mp4",
      poster: "/assets/video/posters/hero-Dubai.jpg",
    },
    preview: "/assets/video/posters/Bridge.jpg",
    intro: [
      "Tworzymy filmy reklamowe dla firm i marek, teledyski, filmy z wydarzeń, nieruchomości i ujęcia z drona.",
      "Zajmujemy się całym procesem: od pomysłu i planu zdjęciowego, przez nagranie, po montaż i kolor. Dostarczamy wersje gotowe do social mediów i na stronę.",
    ],
    includes: [
      "Filmy reklamowe i promocyjne",
      "Teledyski",
      "Filmy z wydarzeń i premier",
      "Ujęcia z drona",
      "Montaż, korekcja barwna i wersje pionowe do social mediów",
    ],
    videos: videoProjects,
  },
];
