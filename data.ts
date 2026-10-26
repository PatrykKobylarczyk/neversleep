// Typy dla lepszej kontroli danych
export interface Photo {
  src: string; // ścieżka do pliku w public/assets/foto/
  width: number;
  height: number;
}

export interface PhotoProject {
  id: string;
  title: string;
  subtitle: string;
  alt: string; // opis zdjęć dla Google Grafika i czytników ekranu
  images: Photo[];
}

export interface VideoProject {
  id: string;
  title: string;
  subtitle: string;
  description: string; // opis filmu dla czytników ekranu
  videoSrc: string; // ścieżka do pliku w public/assets/video/
  thumbnail: string; // kadr podglądowy wyświetlany zanim film się załaduje
}

// DANE DLA SEKCJI FOTO
export const photoProjects: PhotoProject[] = [
  {
    id: "photo-1",
    title: "Nieruchomości",
    subtitle: "Zobacz zdjęcia",
    alt: "Fotografia nieruchomości – Neversleep Production",
    images: [
      { src: "/assets/foto/estates/e-1.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-2.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-3.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-4.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-5.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-6.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-7.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-8.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-9.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-10.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-11.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-12.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-13.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/estates/e-14.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/estates/e-15.jpg", width: 1915, height: 1280 },
      { src: "/assets/foto/estates/e-16.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/estates/e-17.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/estates/e-18.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/estates/e-19.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/estates/e-20.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/estates/e-21.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/estates/e-22.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/estates/e-23.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/estates/e-24.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/estates/e-25.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/estates/e-26.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/estates/e-27.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/estates/e-28.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/estates/e-29.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-30.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-31.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-32.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-33.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-34.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-35.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-36.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-37.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-38.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-39.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-40.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-41.jpg", width: 853, height: 1280 },
      { src: "/assets/foto/estates/e-42.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/estates/e-43.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-44.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-45.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-46.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-47.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-48.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-49.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-50.jpg", width: 1920, height: 1277 },
      { src: "/assets/foto/estates/e-51.jpg", width: 1920, height: 1280 },
    ],
  },
  {
    id: "photo-2",
    title: "Details",
    subtitle: "Zobacz zdjęcia",
    alt: "Fotografia detali wnętrz – Neversleep Production",
    images: [
      { src: "/assets/foto/details/d-1.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/details/d-2.jpg", width: 853, height: 1280 },
      { src: "/assets/foto/details/d-3.jpg", width: 853, height: 1280 },
      { src: "/assets/foto/details/d-4.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/details/d-5.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/details/d-6.jpg", width: 853, height: 1280 },
      { src: "/assets/foto/details/d-7.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/details/d-8.jpg", width: 853, height: 1280 },
      { src: "/assets/foto/details/d-9.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/details/d-10.jpg", width: 853, height: 1280 },
      { src: "/assets/foto/details/d-11.jpg", width: 853, height: 1280 },
      { src: "/assets/foto/details/d-12.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/details/d-13.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/details/d-14.jpg", width: 853, height: 1280 },
      { src: "/assets/foto/details/d-15.jpg", width: 853, height: 1280 },
      { src: "/assets/foto/details/d-16.jpg", width: 853, height: 1280 },
      { src: "/assets/foto/details/d-17.jpg", width: 853, height: 1280 },
      { src: "/assets/foto/details/d-18.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/details/d-19.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/details/d-20.jpg", width: 1920, height: 1280 },
      { src: "/assets/foto/details/d-21.jpg", width: 1920, height: 1280 },
    ],
  },
];

// DANE DLA SEKCJI VIDEO
export const videoProjects: VideoProject[] = [
  {
    id: "v-bmw",
    title: "BMW",
    subtitle: "Zobacz film",
    description: "Film BMW – Neversleep Production",
    videoSrc: "/assets/video/BMW.webm",
    thumbnail: "/assets/video/posters/BMW.jpg",
  },
  {
    id: "v-bridge",
    title: "Bridge",
    subtitle: "Zobacz film",
    description: "Film Bridge – Neversleep Production",
    videoSrc: "/assets/video/Bridge.webm",
    thumbnail: "/assets/video/posters/Bridge.jpg",
  },
  {
    id: "v-dubai",
    title: "Dubai",
    subtitle: "Zobacz film",
    description: "Film Dubai – Neversleep Production",
    videoSrc: "/assets/video/Dubai.webm",
    thumbnail: "/assets/video/posters/Dubai.jpg",
  },
  {
    id: "v-sofa",
    title: "Sofa",
    subtitle: "Zobacz film",
    description: "Film Sofa – Neversleep Production",
    videoSrc: "/assets/video/Sofa.webm",
    thumbnail: "/assets/video/posters/Sofa.jpg",
  },
];
