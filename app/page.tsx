"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  photoProjects,
  videoProjects,
  type PhotoProject,
  type VideoProject,
} from "../data";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"foto" | "video" | null>(null);
  const [selectedProject, setSelectedProject] = useState<PhotoProject | null>(
    null,
  );
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null); // Nowy stan dla video
  const [modalImageIndex, setModalImageIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  // Obsługa klawisza ESC
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

  const paginate = (newDirection: number) => {
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
  };

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
    <main className="fixed top-[128px] left-0 w-full h-[calc(100dvh-128px)] flex flex-col md:flex-row overflow-hidden bg-black text-white">
      {/* GŁÓWNY PRZYCISK ZAMKNIĘCIA (SEKCJE) */}
      {activeTab && modalImageIndex === null && !selectedVideo && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            selectedProject ? setSelectedProject(null) : setActiveTab(null);
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
        </button>
      )}

      {/* SEKCJA FOTO - Bez zmian */}
      <section
        onClick={() => setActiveTab("foto")}
        className={`relative flex flex-col justify-end p-8 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer overflow-hidden group ${activeTab === "video" ? "flex-[0.08] md:flex-[0.03]" : "flex-1"}`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070')`,
          }}
        />
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-700 ${activeTab === "video" ? "opacity-95" : activeTab === "foto" ? "opacity-0" : "opacity-40 group-hover:opacity-10"}`}
        />
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${activeTab === "video" ? "opacity-100 delay-700" : "opacity-0"}`}
        >
          <span className="md:-rotate-90 text-xs font-bold tracking-[0.8em] text-zinc-400 uppercase">
            FOTO
          </span>
        </div>
        <div
          className={`relative z-10 transition-all duration-500 ${activeTab !== null ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}
        >
          <h2 className="text-4xl md:text-7xl font-black italic uppercase">
            FOTO
          </h2>
        </div>
        <div
          className={`absolute inset-0 z-20 bg-white text-black transition-all duration-1000 scrollbar-hide overflow-y-auto px-6 md:px-32 pt-24 md:pt-40 pb-20 ${activeTab === "foto" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}
        >
          <div className="max-w-6xl mx-auto">
            {!selectedProject ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {photoProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(p);
                    }}
                    className="group/item flex flex-col"
                  >
                    <div className="aspect-square bg-zinc-100 relative overflow-hidden mb-4">
                      <img
                        src={p.images[0]}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105"
                        alt=""
                      />
                    </div>
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em]">
                      {p.title}
                    </h3>
                  </div>
                ))}
              </div>
            ) : (
              <div className="columns-1 md:columns-2 gap-4 space-y-4">
                {selectedProject.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalImageIndex(idx);
                    }}
                    className="break-inside-avoid cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <img src={img} className="w-full h-auto" alt="" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SEKCJA VIDEO */}
      <section
        onClick={() => setActiveTab("video")}
        className={`relative flex flex-col justify-end p-8 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer overflow-hidden group ${activeTab === "foto" ? "flex-[0.08] md:flex-[0.03]" : "flex-1"}`}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/video.mov"
        />
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-700 ${activeTab === "foto" ? "opacity-95" : activeTab === "video" ? "opacity-0" : "opacity-40 group-hover:opacity-10"}`}
        />
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${activeTab === "foto" ? "opacity-100 delay-700" : "opacity-0"}`}
        >
          <span className="md:-rotate-90 text-xs font-bold tracking-[0.8em] text-zinc-500 uppercase">
            VIDEO
          </span>
        </div>
        <div
          className={`relative z-10 transition-all duration-500 ${activeTab !== null ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}
        >
          <h2 className="text-4xl md:text-7xl font-black italic uppercase">
            VIDEO
          </h2>
        </div>

        <div
          className={`absolute inset-0 z-20 bg-white text-black transition-all duration-1000 scrollbar-hide overflow-y-auto px-10 md:px-32 pt-24 md:pt-40 pb-20 ${activeTab === "video" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"}`}
        >
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {videoProjects.map((v) => (
              <div
                key={v.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVideo(v);
                }}
                className="flex flex-col cursor-pointer"
              >
                <div className="aspect-square bg-zinc-100 relative overflow-hidden mb-4">
                  <video
                    src={`${v.videoSrc}#t=0.001`}
                    muted
                    loop
                    playsInline
                    onMouseOver={(e) => e.currentTarget.play()}
                    onMouseOut={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest">
                  {v.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL LIGHTBOX (FOTO I VIDEO) */}
      <AnimatePresence initial={false}>
        {(modalImageIndex !== null || selectedVideo) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black flex items-center justify-center touch-none overflow-hidden"
          >
            {/* KRZYŻYK MODALA - IDENTYCZNA POZYCJA */}
            <button
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

            {/* STRZAŁKI - IDENTYCZNA POZYCJA */}
            <div className="hidden md:flex absolute inset-x-10 lg:inset-x-80 top-1/2 -translate-y-1/2 justify-between z-[350] pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(-1);
                }}
                className="pointer-events-auto p-4 text-zinc-200/50 hover:text-zinc-200 transition-colors"
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
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(1);
                }}
                className="pointer-events-auto p-4 text-zinc-200/50 hover:text-zinc-200 transition-colors"
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
                    <img
                      src={selectedProject.images[modalImageIndex]}
                      className="max-w-[85vw] max-h-[60vh] object-contain select-none pointer-events-none"
                      alt=""
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
    </main>
  );
}
