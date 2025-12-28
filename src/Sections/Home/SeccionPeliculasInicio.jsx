import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SeccionPeliculas = ({ titulo, url }) => {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [delayDone, setDelayDone] = useState(false);

  const placeholder = "https://via.placeholder.com/300x450?text=No+Image";

  useEffect(() => {
    const timer = setTimeout(() => setDelayDone(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setPeliculas(data.results.slice(0, 4));
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

  // Skeleton de carga
  if (loading || !delayDone) {
    return (
      <div className="max-w-5xl mx-auto mt-2 space-y-6 p-4">
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
    <div>
      
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-10 mx-5 mt-5 text-[#eae0e8]">
          {titulo}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mx-5">
          {peliculas.map((pelicula) => (
            <div
              key={pelicula.id}
              className="mb-10 relative bg-[#EDEBFF] rounded-lg overflow-hidden shadow-md transition-all duration-300 transform hover:scale-110 hover:z-10 cursor-pointer w-[150px] mx-auto md:w-full md:mx-0"
            >
              <Link to={`/pelicula/${pelicula.id}`} >
              <img
                src={
                  pelicula.poster_path
                    ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`
                    : placeholder
                }
                alt={pelicula.title}
                className="object-cover transition-transform duration-300 h-[300px] md:h-[450px] w-full"
              />

              <div className="p-2 flex flex-col gap-2">
                <p className="font-semibold text-xs md:text-sm">
                  {pelicula.title}
                </p>
                
                {/* Estrellas */}
                <div className="flex items-center gap-1">
                  {renderStars(pelicula.vote_average)}
                  <span className="ml-1 text-gray-500 text-[10px] md:text-xs">
                    ({pelicula.vote_average.toFixed(1)})
                  </span>
                </div>
                <p className=" text-xs md:text-sm"><strong>Estreno:</strong> {pelicula.release_date}</p>
                
                {/* BOTÓN DEBAJO DE LAS ESTRELLAS */}
                <Link
                  to={`/pelicula/${pelicula.id}`}
                  className="mt-1 inline-block bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-lg text-sm transition w-fit"
                >
                  Ver más detalles
                </Link>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default SeccionPeliculas;

