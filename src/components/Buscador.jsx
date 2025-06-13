import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const API_KEY = "d27772438d1557a847ef40b90d71ae43"; // 👈 reemplaza con tu API KEY de TMDB

const ResultadosBusqueda = () => {
  const { query } = useParams();
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(true);
;


  useEffect(() => {
    const buscarPeliculas = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=es-MX`
        );
        const data = await response.json();
        setResultados(data.results || []);
      } catch (error) {
        console.error("Error al buscar películas:", error);
      } finally {
        setCargando(false);
      }
    };

    buscarPeliculas();
  }, [query]);
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
 
  return (
    <div className="p-8 min-h-screen max-w-6xl mx-auto mt-24">
      <h2 className="text-3xl font-bold mb-6">
        Resultados para: <span className="text-black">"{query}"</span>
      </h2>

      {cargando ? (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 transform hover:scale-110 hover:z-10 cursor-pointer">
          {Array(8).fill(0).map((_, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow">
              <Skeleton height={300} borderRadius={8} />
              <div className="mt-2">
                <Skeleton height={20} width="80%" />
                <Skeleton height={16} width="40%" className="mt-1" />
              </div>
            </div>
          ))}
        </div>
      ) : resultados.length === 0 ? (
        <p>No se encontraron películas.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {resultados.map((pelicula) => (
            <Link to={`/pelicula/${pelicula.id}`} key={pelicula.id} className="bg-white p-4 rounded shadow hover:scale-105 transition-transform">
              {pelicula.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${pelicula.poster_path}`}
                  alt={pelicula.title}
                  className="rounded mb-2"
                />
              ) : (
                <div className="bg-gray-700 h-48 flex items-center justify-center text-sm text-gray-700">Sin imagen</div>
              )}
              <h3 className="text-md font-semibold text-gray-700">{pelicula.title}</h3>
              <p className="text-sm text-gray-700">{pelicula.release_date?.slice(0, 4)}</p>
                              <div className="p-3">
                  
                  <div className="flex items-center gap-1 mt-1">
                    {renderStars(pelicula.vote_average)}
                    <span className="text-xs text-gray-500 ml-1">
                      ({pelicula.vote_average.toFixed(1)})
                    </span>
                  </div>
                </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultadosBusqueda;

