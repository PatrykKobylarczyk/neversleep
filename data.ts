// Typy dla lepszej kontroli danych
export interface PhotoProject {
  id: string;
  title: string;
  subtitle: string;
  images: string[]; // ścieżki do plików w public/assets/foto/
}

export interface VideoProject {
  id: string;
  title: string;
  subtitle: string;
  videoSrc: string; // ścieżka do pliku w public/assets/video/
  thumbnail: string; // zdjęcie podglądowe przed odpaleniem wideo
}

// DANE DLA SEKCJI FOTO
export const photoProjects: PhotoProject[] = [
  {
    id: "photo-1",
    title: "Nieruchomości",
    subtitle: "Zobacz zdjęcia",
    images: [
      "/assets/foto/estates/e-1.jpg",
      "/assets/foto/estates/e-2.jpg",
      "/assets/foto/estates/e-3.jpg",
      "/assets/foto/estates/e-4.jpg",
      "/assets/foto/estates/e-5.jpg",
      "/assets/foto/estates/e-6.jpg",
      "/assets/foto/estates/e-7.jpg",
      "/assets/foto/estates/e-8.jpg",
      "/assets/foto/estates/e-9.jpg",
      "/assets/foto/estates/e-10.jpg",
      "/assets/foto/estates/e-11.jpg",
      "/assets/foto/estates/e-12.jpg",
      "/assets/foto/estates/e-13.jpg",
      "/assets/foto/estates/e-14.jpg",
      "/assets/foto/estates/e-15.jpg",
      "/assets/foto/estates/e-16.jpg",
      "/assets/foto/estates/e-17.jpg",
      "/assets/foto/estates/e-18.jpg",
      "/assets/foto/estates/e-19.jpg",
      "/assets/foto/estates/e-20.jpg",
      "/assets/foto/estates/e-21.jpg",
      "/assets/foto/estates/e-22.jpg",
      "/assets/foto/estates/e-23.jpg",
      "/assets/foto/estates/e-24.jpg",
      "/assets/foto/estates/e-25.jpg",
      "/assets/foto/estates/e-26.jpg",
      "/assets/foto/estates/e-27.jpg",
      "/assets/foto/estates/e-28.jpg",
      "/assets/foto/estates/e-29.jpg",
      "/assets/foto/estates/e-30.jpg",
      "/assets/foto/estates/e-31.jpg",
      "/assets/foto/estates/e-32.jpg",
      "/assets/foto/estates/e-33.jpg",
      "/assets/foto/estates/e-34.jpg",
      "/assets/foto/estates/e-35.jpg",
      "/assets/foto/estates/e-36.jpg",
      "/assets/foto/estates/e-37.jpg",
      "/assets/foto/estates/e-38.jpg",
      "/assets/foto/estates/e-39.jpg",
      "/assets/foto/estates/e-40.jpg",
      "/assets/foto/estates/e-41.jpg",
      "/assets/foto/estates/e-42.jpg",
      "/assets/foto/estates/e-43.jpg",
      "/assets/foto/estates/e-44.jpg",
      "/assets/foto/estates/e-45.jpg",
      "/assets/foto/estates/e-46.jpg",
      "/assets/foto/estates/e-47.jpg",
      "/assets/foto/estates/e-48.jpg",
      "/assets/foto/estates/e-49.jpg",
      "/assets/foto/estates/e-50.jpg",
      "/assets/foto/estates/e-51.jpg",
    ],
  },
  {
    id: "photo-2",
    title: "Details",
    subtitle: "Zobacz zdjęcia",
    images: [
      "/assets/foto/details/d-1.jpg",
      "/assets/foto/details/d-2.jpg",
      "/assets/foto/details/d-3.jpg",
      "/assets/foto/details/d-4.jpg",
      "/assets/foto/details/d-5.jpg",
      "/assets/foto/details/d-6.jpg",
      "/assets/foto/details/d-7.jpg",
      "/assets/foto/details/d-8.jpg",
      "/assets/foto/details/d-9.jpg",
      "/assets/foto/details/d-10.jpg",
      "/assets/foto/details/d-11.jpg",
      "/assets/foto/details/d-12.jpg",
      "/assets/foto/details/d-13.jpg",
      "/assets/foto/details/d-14.jpg",
      "/assets/foto/details/d-15.jpg",
      "/assets/foto/details/d-16.jpg",
      "/assets/foto/details/d-17.jpg",
      "/assets/foto/details/d-18.jpg",
      "/assets/foto/details/d-19.jpg",
      "/assets/foto/details/d-20.jpg",
      "/assets/foto/details/d-21.jpg",
    ],
  },
];

// DANE DLA SEKCJI VIDEO
export const videoProjects: VideoProject[] = [
  {
    id: "v-bmw", // unikalne ID
    title: "BMW",
    subtitle: "Zobacz film",
    videoSrc: "/assets/video/BMW.webm",
    thumbnail: "/assets/foto/thumbnails/v1.jpg",
  },
  {
    id: "v-bridge", // unikalne ID
    title: "Bridge",
    subtitle: "Zobacz film",
    videoSrc: "/assets/video/Bridge.webm",
    thumbnail: "/assets/foto/thumbnails/v1.jpg",
  },
  {
    id: "v-dubai",
    title: "Dubai",
    subtitle: "Zobacz film",
    videoSrc: "/assets/video/Dubai.webm",
    thumbnail: "/assets/foto/thumbnails/v1.jpg",
  },
  {
    id: "v-sofa",
    title: "Sofa",
    subtitle: "Zobacz film",
    videoSrc: "/assets/video/Sofa.webm",
    thumbnail: "/assets/foto/thumbnails/v1.jpg",
  },
];
