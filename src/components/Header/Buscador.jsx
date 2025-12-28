import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const API_KEY = "d27772438d1557a847ef40b90d71ae43"; // 👈 tu API KEY de TMDB

const ResultadosBusqueda = () => {
  const { query } = useParams();
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const buscarContenido = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
            query
          )}&language=es-MX`
        );
        const data = await response.json();
        setResultados(data.results || []);
      } catch (error) {
        console.error("Error al buscar contenido:", error);
      } finally {
        setCargando(false);
      }
    };

    buscarContenido();
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
    <div className="p-8 min-h-screen max-w-6xl mx-auto mt-2">
      <h2 className="text-3xl font-bold mb-6 text-[#eae0e8]">
        Resultados para: <span className="text-[#eae0e8]">"{query}"</span>
      </h2>

      {cargando ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Array(8)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded shadow animate-pulse"
              >
                <Skeleton height={300} borderRadius={8} />
                <div className="mt-2">
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={16} width="40%" className="mt-1" />
                </div>
              </div>
            ))}
        </div>
      ) : resultados.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {resultados
            // 👇 Filtro para evitar resultados sin info
            .filter((item) => {
              if (item.media_type === "person") {
                // Solo actores con foto y departamento conocido
                return item.profile_path && item.known_for_department;
              }
              if (item.media_type === "movie" || item.media_type === "tv") {
                // Solo pelis/series con poster
                return item.poster_path;
              }
              return false;
            })
            .map((item) => {
              const titulo =
                item.media_type === "movie"
                  ? item.title
                  : item.media_type === "tv"
                  ? item.name
                  : item.name;

              const fecha =
                item.media_type === "movie"
                  ? item.release_date?.slice(0, 4)
                  : item.media_type === "tv"
                  ? item.first_air_date?.slice(0, 4)
                  : "";

              const imagen = item.poster_path
                ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                : item.profile_path
                ? `https://image.tmdb.org/t/p/w300${item.profile_path}`
                : null;

              return (
                <Link
                  to={
                    item.media_type === "movie"
                      ? `/pelicula/${item.id}` // detalle de película
                      : item.media_type === "tv"
                      ? `/serie/${item.id}` // detalle de serie
                      : item.media_type === "person"
                      ? `/actor/${item.id}` // detalle de actor
                      : "#"
                  }
                  key={`${item.media_type}-${item.id}`}
                  className="bg-white p-4 rounded shadow hover:scale-105 transition-transform"
                >
                  {imagen ? (
                    <img
                      src={imagen}
                      alt={titulo}
                      className="rounded mb-2"
                    />
                  ) : (
                    <div className="bg-gray-700 h-48 flex items-center justify-center text-sm text-gray-300">
                      Sin imagen
                    </div>
                  )}
                  <h3 className="text-md font-semibold text-gray-700">
                    {titulo}
                  </h3>
                  {fecha && <p className="text-sm text-gray-700">{fecha}</p>}

                  {(item.media_type === "movie" ||
                    item.media_type === "tv") && (
                    <div className="p-3">
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(item.vote_average)}
                        <span className="text-xs text-gray-500 ml-1">
                          ({item.vote_average?.toFixed(1)})
                        </span>
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default ResultadosBusqueda;
