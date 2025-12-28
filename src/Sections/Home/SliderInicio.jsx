import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_KEY = "d27772438d1557a847ef40b90d71ae43";
const API_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=es-ES`;

export default function SliderInicio() {
  const [peliculas, setPeliculas] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchPeliculas() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        // 👇 Solo las 5 primeras
        setPeliculas((data.results || []).slice(0, 5));
      } catch (error) {
        console.error("Error al traer las películas:", error);
      }
    }
    fetchPeliculas();
  }, []);

  // autoplay cada 6 segundos
  useEffect(() => {
    if (peliculas.length > 0) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % peliculas.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [peliculas]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % peliculas.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + peliculas.length) % peliculas.length);
  };

  if (peliculas.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-[60vh] bg-black text-white text-xl">
        Cargando películas...
      </div>
    );
  }

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden rounded-xl shadow-lg">
      <AnimatePresence>
        {peliculas.map(
          (pelicula, i) =>
            i === index && (
              <motion.div
                key={pelicula.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <img
                  srcSet={`
                    https://image.tmdb.org/t/p/w780${pelicula.backdrop_path} 780w,
                    https://image.tmdb.org/t/p/w1280${pelicula.backdrop_path} 1280w,
                    https://image.tmdb.org/t/p/original${pelicula.backdrop_path} 2000w
                  `}
                  sizes="100vw"
                  src={`https://image.tmdb.org/t/p/original${pelicula.backdrop_path}`}
                  alt={pelicula.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12">
                  <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">
                    {pelicula.title}
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-gray-200 max-w-2xl line-clamp-3">
                    {pelicula.overview || "Descripción no disponible."}
                  </p>
                  <a
                    href={`/pelicula/${pelicula.id}`}
                    className="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-lg text-sm transition w-fit"
                  >
                    Ver más detalles
                  </a>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* botones laterales (solo desktop) */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 p-2 md:p-3 rounded-full text-white hover:bg-black transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 p-2 md:p-3 rounded-full text-white hover:bg-black transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* puntos abajo */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {peliculas.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-red-600 scale-110" : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
