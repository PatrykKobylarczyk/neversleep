export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full"></div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 z-10 uppercase">
          We Build <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Neversleep
          </span>
        </h1>
        <p className="max-w-xl text-gray-400 text-lg md:text-xl z-10">
          Elevating brands through high-end content creation and innovative
          digital solutions.
        </p>
      </section>
    </>
  );
}
