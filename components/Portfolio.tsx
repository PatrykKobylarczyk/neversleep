"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Marquee from "./Marquee";
import {
  photoProjects,
  videoProjects,
  type PhotoProject,
  type VideoProject,
} from "../data";

const photoCount = photoProjects.reduce((n, p) => n + p.images.length, 0);

// Wjazd połówek przy wejściu na stronę
const halfVariants = {
  hidden: (fromLeft: boolean) => ({ opacity: 0, x: fromLeft ? "-6%" : "6%" }),
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, ease: [0.23, 1, 0.32, 1] as const },
  },
};

// Tytuł i podtytuł pojawiają się jeden po drugim
const introVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.23, 1, 0.32, 1] as const },
  }),
};

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<"foto" | "video" | null>(null);
  const [selectedProject, setSelectedProject] = useState<PhotoProject | null>(
    null,
  );
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalImageIndex(null);
        setSelectedVideo(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const paginate = useCallback(
    (newDirection: number) => {
      if (selectedProject && modalImageIndex !== null) {
        setDirection(newDirection);
        setModalImageIndex(
          (prev) =>
            (prev! + newDirection + selectedProject.images.length) %
            selectedProject.images.length,
        );
      } else if (selectedVideo) {
        setDirection(newDirection);
        const currentIndex = videoProjects.findIndex(
          (v) => v.id === selectedVideo.id,
        );
        const nextIndex =
          (currentIndex + newDirection + videoProjects.length) %
          videoProjects.length;
        setSelectedVideo(videoProjects[nextIndex]);
      }
    },
    [selectedProject, modalImageIndex, selectedVideo],
  );

  const isLightboxOpen = modalImageIndex !== null || selectedVideo !== null;

  // Strzałki na klawiaturze przełączają zdjęcia i filmy w lightboxie
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleArrows = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleArrows);
    return () => window.removeEventListener("keydown", handleArrows);
  }, [isLightboxOpen, paginate]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="fixed top-[128px] left-0 w-full h-[calc(100dvh-128px)] flex flex-col md:flex-row overflow-hidden bg-black text-white">
      <h1 className="sr-only">
        Neversleep Production – fotografia nieruchomości, wnętrz i produktów,
        filmy reklamowe, teledyski i filmowanie dronem
      </h1>

      {/* PRZYCISK ZAMKNIĘCIA SEKCJI */}
      {activeTab && modalImageIndex === null && !selectedVideo && (
        <motion.button
          type="button"
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          whileHover={{ rotate: 90, scale: 1.15 }}
          aria-label={selectedProject ? "Wróć do listy galerii" : "Zamknij sekcję"}
          onClick={(e) => {
            e.stopPropagation();
            if (selectedProject) setSelectedProject(null);
            else setActiveTab(null);
          }}
          className={`fixed z-[110] right-6 md:right-10 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]
            ${activeTab === "video" ? "translate-y-[13dvh] md:translate-y-0" : "translate-y-0"}
            ${activeTab === "foto" ? "translate-x-0 md:-translate-x-[6vw]" : "translate-x-0"}
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
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </motion.button>
      )}

      {/* SEKCJA FOTO */}
      <motion.section
        custom={true}
        variants={halfVariants}
        initial="hidden"
        animate="show"
        onClick={() => setActiveTab("foto")}
        className={`relative flex flex-col justify-end p-8 pb-16 md:pb-20 transition-[flex] duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer overflow-hidden group ${activeTab === "video" ? "flex-[0.08] md:flex-[0.03]" : "flex-1"}`}
      >
        <Image
          src={photoProjects[0].images[0].src}
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110"
        />
        {/* Niewidoczny przycisk, żeby sekcję dało się otworzyć z klawiatury */}
        {activeTab !== "foto" && (
          <button
            type="button"
            aria-label="Pokaż realizacje foto"
            onClick={() => setActiveTab("foto")}
            className="absolute inset-0 z-10"
          />
        )}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-700 ${activeTab === "video" ? "opacity-95" : activeTab === "foto" ? "opacity-0" : "opacity-50 group-hover:opacity-25"}`}
        />
        {/* Kolorowa poświata przy najechaniu */}
        {/* Przyciemnienie u dołu, żeby napisy były czytelne na każdym zdjęciu */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black via-black/75 to-transparent" />
        {/* Delikatna poświata w kolorze marki przy najechaniu */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-accent/30 to-transparent opacity-0 transition-opacity duration-700 ${activeTab === null ? "group-hover:opacity-100" : ""}`}
        />

        {/* Pionowy napis przy zwiniętej sekcji */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${activeTab === "video" ? "opacity-100 delay-700" : "opacity-0"}`}
        >
          <span className="md:-rotate-90 text-xs font-bold tracking-[0.8em] text-zinc-400 uppercase">
            FOTO
          </span>
        </div>

        {/* Tytuł i PODTYTUŁ sekcji głównej */}
        <div
          className={`relative z-20 transition-all duration-500 ${activeTab !== null ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}
        >
          <motion.p
            custom={0.5}
            variants={introVariants}
            initial="hidden"
            animate="show"
            className="mb-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-200 [text-shadow:0_1px_6px_rgba(0,0,0,0.9)]"
          >
            <span className="text-accent">01</span>
            <span className="h-px w-10 bg-accent transition-all duration-700 group-hover:w-24" />
            {photoCount} zdjęć
          </motion.p>
          <motion.h2
            custom={0.6}
            variants={introVariants}
            initial="hidden"
            animate="show"
            className="text-outline text-5xl md:text-8xl font-black italic uppercase leading-none transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-3"
          >
            FOTO
          </motion.h2>
          <motion.p
            custom={0.75}
            variants={introVariants}
            initial="hidden"
            animate="show"
            className="text-[10px] md:text-xs font-medium tracking-[0.4em] text-zinc-300 mt-4 uppercase"
          >
            Architecture / Interior / Product
          </motion.p>
        </div>

        {/* Grid Foto */}
        <div
          className={`absolute inset-0 z-20 bg-white text-black transition-all duration-1000 scrollbar-hide overflow-y-auto px-6 md:px-32 pt-24 md:pt-40 pb-20 ${activeTab === "foto" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}
        >
          <div className="max-w-6xl mx-auto">
            {!selectedProject ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {photoProjects.map((p, i) => (
                  <motion.button
                    type="button"
                    key={p.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={
                      activeTab === "foto"
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 40 }
                    }
                    transition={{
                      duration: 0.7,
                      delay: activeTab === "foto" ? 0.25 + i * 0.12 : 0,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(p);
                    }}
                    className="group/item flex flex-col cursor-pointer text-left"
                  >
                    <div className="aspect-square bg-zinc-100 relative overflow-hidden mb-4 w-full">
                      <Image
                        src={p.images[0].src}
                        fill
                        sizes="(min-width: 768px) 576px, 100vw"
                        className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/item:scale-110"
                        alt={p.alt}
                      />
                      <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-accent transition-all duration-700 group-hover/item:w-full" />
                    </div>
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] leading-none transition-colors duration-300 group-hover/item:text-accent">
                      {p.title}
                    </h3>
                    <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-2">
                      {p.subtitle} · {p.images.length}
                    </p>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="columns-1 md:columns-2 gap-4 space-y-4">
                {selectedProject.images.map((img, idx) => (
                  <motion.button
                    type="button"
                    key={img.src}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    aria-label={`Powiększ zdjęcie ${idx + 1} z ${selectedProject.images.length}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalImageIndex(idx);
                    }}
                    className="block w-full break-inside-avoid cursor-pointer overflow-hidden"
                  >
                    <Image
                      src={img.src}
                      width={img.width}
                      height={img.height}
                      sizes="(min-width: 768px) 576px, 100vw"
                      className="w-full h-auto transition-transform duration-[1.2s] ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105"
                      alt={`${selectedProject.alt} – zdjęcie ${idx + 1}`}
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* SEKCJA VIDEO */}
      <motion.section
        custom={false}
        variants={halfVariants}
        initial="hidden"
        animate="show"
        onClick={() => setActiveTab("video")}
        className={`relative flex flex-col justify-end p-8 pb-16 md:pb-20 transition-[flex] duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer overflow-hidden group ${activeTab === "foto" ? "flex-[0.08] md:flex-[0.03]" : "flex-1"}`}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          poster="/assets/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110"
          src="/assets/hero.mp4"
        />
        {/* Niewidoczny przycisk, żeby sekcję dało się otworzyć z klawiatury */}
        {activeTab !== "video" && (
          <button
            type="button"
            aria-label="Pokaż realizacje video"
            onClick={() => setActiveTab("video")}
            className="absolute inset-0 z-10"
          />
        )}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-700 ${activeTab === "foto" ? "opacity-95" : activeTab === "video" ? "opacity-0" : "opacity-50 group-hover:opacity-25"}`}
        />
        {/* Przyciemnienie u dołu, żeby napisy były czytelne na każdym zdjęciu */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black via-black/75 to-transparent" />
        {/* Delikatna poświata w kolorze marki przy najechaniu */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-accent/30 to-transparent opacity-0 transition-opacity duration-700 ${activeTab === null ? "group-hover:opacity-100" : ""}`}
        />

        {/* Pionowy napis przy zwiniętej sekcji */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${activeTab === "foto" ? "opacity-100 delay-700" : "opacity-0"}`}
        >
          <span className="md:-rotate-90 text-xs font-bold tracking-[0.8em] text-zinc-500 uppercase">
            VIDEO
          </span>
        </div>

        {/* Tytuł i PODTYTUŁ sekcji głównej */}
        <div
          className={`relative z-20 transition-all duration-500 ${activeTab !== null ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}
        >
          <motion.p
            custom={0.55}
            variants={introVariants}
            initial="hidden"
            animate="show"
            className="mb-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-200 [text-shadow:0_1px_6px_rgba(0,0,0,0.9)]"
          >
            <span className="text-accent">02</span>
            <span className="h-px w-10 bg-accent transition-all duration-700 group-hover:w-24" />
            {videoProjects.length} filmy
          </motion.p>
          <motion.h2
            custom={0.65}
            variants={introVariants}
            initial="hidden"
            animate="show"
            className="text-outline text-5xl md:text-8xl font-black italic uppercase leading-none transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-3"
          >
            VIDEO
          </motion.h2>
          <motion.p
            custom={0.8}
            variants={introVariants}
            initial="hidden"
            animate="show"
            className="text-[10px] md:text-xs font-medium tracking-[0.4em] text-zinc-300 mt-4 uppercase"
          >
            Commercial / Music Video / Drone
          </motion.p>
        </div>

        {/* Grid Video */}
        <div
          className={`absolute inset-0 z-20 bg-white text-black transition-all duration-1000 scrollbar-hide overflow-y-auto px-10 md:px-32 pt-24 md:pt-40 pb-20 ${activeTab === "video" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"}`}
        >
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {videoProjects.map((v, i) => (
              <motion.button
                type="button"
                key={v.id}
                initial={{ opacity: 0, y: 40 }}
                animate={
                  activeTab === "video"
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 40 }
                }
                transition={{
                  duration: 0.7,
                  delay: activeTab === "video" ? 0.25 + i * 0.1 : 0,
                  ease: [0.23, 1, 0.32, 1],
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVideo(v);
                }}
                className="group/item flex flex-col cursor-pointer text-left"
              >
                <div className="aspect-square bg-zinc-100 relative overflow-hidden mb-4 w-full">
                  <video
                    src={v.videoSrc}
                    poster={v.thumbnail}
                    preload="none"
                    aria-label={v.description}
                    muted
                    loop
                    playsInline
                    onMouseOver={(e) => e.currentTarget.play()}
                    onMouseOut={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/item:scale-110"
                  />
                  <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-accent transition-all duration-700 group-hover/item:w-full" />
                  {/* Ikona odtwarzania */}
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover/item:opacity-100">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-black/30 backdrop-blur-sm">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest leading-none transition-colors duration-300 group-hover/item:text-accent">
                  {v.title}
                </h3>
                <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-2">
                  {v.subtitle}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PASEK Z USŁUGAMI – tylko na ekranie startowym */}
      <AnimatePresence>
        {activeTab === null && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-x-0 bottom-0 z-30"
          >
            <Marquee
              items={[
                "Fotografia nieruchomości",
                "Wnętrza i architektura",
                "Film reklamowy",
                "Teledyski",
                "Dron",
                "Łódź",
              ]}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL LIGHTBOX */}
      <AnimatePresence initial={false}>
        {isLightboxOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={selectedVideo ? selectedVideo.description : "Podgląd zdjęcia"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black flex items-center justify-center touch-none overflow-hidden"
          >
            <button
              type="button"
              aria-label="Zamknij podgląd"
              autoFocus
              onClick={() => {
                setModalImageIndex(null);
                setSelectedVideo(null);
              }}
              className="fixed top-[145px] md:top-[160px] right-5 md:right-[250px] z-[400] text-zinc-400 hover:text-white transition-colors p-2"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="hidden md:flex absolute inset-x-10 lg:inset-x-80 top-1/2 -translate-y-1/2 justify-between z-[350] pointer-events-none">
              <button
                type="button"
                aria-label="Poprzednie"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(-1);
                }}
                className="pointer-events-auto p-4 text-zinc-200/50 hover:text-accent transition-colors"
              >
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Następne"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(1);
                }}
                className="pointer-events-auto p-4 text-zinc-200/50 hover:text-accent transition-colors"
              >
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Licznik zdjęć */}
            {modalImageIndex !== null && selectedProject && (
              <p className="absolute bottom-10 left-1/2 z-[350] -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-400">
                {String(modalImageIndex + 1).padStart(2, "0")}
                <span className="text-accent"> / </span>
                {String(selectedProject.images.length).padStart(2, "0")}
              </p>
            )}

            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={
                    modalImageIndex !== null
                      ? `img-${modalImageIndex}`
                      : `vid-${selectedVideo?.id}`
                  }
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "tween", duration: 0.35, ease: "easeInOut" },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x < -50) paginate(1);
                    else if (offset.x > 50) paginate(-1);
                  }}
                  className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
                >
                  {modalImageIndex !== null && selectedProject ? (
                    <Image
                      src={selectedProject.images[modalImageIndex].src}
                      width={selectedProject.images[modalImageIndex].width}
                      height={selectedProject.images[modalImageIndex].height}
                      sizes="85vw"
                      className="w-auto h-auto max-w-[85vw] max-h-[60vh] object-contain select-none pointer-events-none"
                      alt={`${selectedProject.alt} – zdjęcie ${modalImageIndex + 1}`}
                    />
                  ) : selectedVideo ? (
                    <video
                      src={selectedVideo.videoSrc}
                      controls
                      autoPlay
                      className="max-w-[85vw] max-h-[60vh] outline-none"
                    />
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
