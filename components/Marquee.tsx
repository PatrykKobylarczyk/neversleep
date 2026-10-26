// Przewijający się pasek z usługami – dekoracja, więc ukryta przed czytnikami ekranu
export default function Marquee({ items }: { items: string[] }) {
  const line = [...items, ...items];
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-30 overflow-hidden border-t border-white/10 bg-black/70 py-3 backdrop-blur-md"
    >
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {line.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-400"
          >
            {item}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
