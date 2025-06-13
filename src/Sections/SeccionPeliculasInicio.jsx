import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const SeccionPeliculas = ({ titulo, url }) => {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [delayDone, setDelayDone] = useState(false);
  const placeholder = "https://via.placeholder.com/300x450?text=No+Image";

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDelayDone(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setPeliculas(data.results.slice(0, 10));
      } catch (err) {
        setError("Error al cargar las películas.");
      } finally {
        setLoading(false);
      }
    };
    fetchPeliculas();
  }, [url]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={"f" + i} className="text-yellow-400" />
        ))}
        {halfStar && <FaStarHalfAlt key="half" className="text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={"e" + i} className="text-yellow-400" />
        ))}
      </>
    );
  };

  const handleCardClick = (id) => {
    if (isMobile) setActiveOverlay(id);
  };

  const handleCloseOverlay = () => setActiveOverlay(null);

  // Mostrar Skeleton mientras carga
  if (loading || !delayDone) {
    return (
      <div className="max-w-5xl mx-auto mt-24 space-y-6 p-4">
        <Skeleton height={40} width="66%" borderRadius={8} />
        <Skeleton height={400} borderRadius={8} />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton height={24} />
          <Skeleton height={24} />
        </div>
        <Skeleton height={96} />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-60">{error}</p>;
  }

  return (
    <div className="w-full mb-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-[#023E8A]">{titulo}</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {peliculas.map((pelicula) => {
            const isActive = activeOverlay === pelicula.id;

            return (
              <div
                key={pelicula.id}
                className="relative bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 transform hover:scale-110 hover:z-10 cursor-pointer"
                onClick={() => handleCardClick(pelicula.id)}
              >
                <img
                  src={
                    pelicula.poster_path
                      ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`
                      : placeholder
                  }
                  alt={pelicula.title}
                  className="w-full h-[420px] object-cover transition-transform duration-300"
                />

                <div className="p-3">
                  <p className="text-sm font-semibold">{pelicula.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {renderStars(pelicula.vote_average)}
                    <span className="text-xs text-gray-500 ml-1">
                      ({pelicula.vote_average.toFixed(1)})
                    </span>
                  </div>
                </div>

                {/* Overlay */}
                <div
                  className={`
                    absolute inset-0 bg-black bg-opacity-80 text-white p-4 text-center transition-opacity duration-300 
                    flex flex-col justify-center items-center gap-3
                    ${isMobile
                      ? isActive
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                      : "opacity-0 hover:opacity-100"}
                  `}
                >
                  {isMobile && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCloseOverlay();
                      }}
                      className="absolute top-2 right-2 text-white text-xl"
                    >
                      <FiX />
                    </button>
                  )}

                  <p className="text-xs">{pelicula.overview || "Sin descripción."}</p>

                  <Link
                    to={`/pelicula/${pelicula.id}`}
                    className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Ver Película
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SeccionPeliculas;
