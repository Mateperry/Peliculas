import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = "d27772438d1557a847ef40b90d71ae43";
const IMG_BASE = "https://image.tmdb.org/t/p/w92"; // 👈 miniatura pequeña

const SearchSuggestions = ({ query, onSelect }) => {
  const [sugerencias, setSugerencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setSugerencias([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=es-MX&query=${encodeURIComponent(
            query
          )}&page=1&include_adult=false`
        );
        const data = await res.json();

        // 👇 filtro: solo con foto
        const filtradas = (data.results || []).filter(
          (item) => item.poster_path || item.profile_path
        );

        setSugerencias(filtradas.slice(0, 6)); // máx 6
      } catch (err) {
        console.error("Error cargando sugerencias:", err);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 400); // 👈 debounce
    return () => clearTimeout(timeout);
  }, [query]);

  const handleClick = (item) => {
    const titulo =
      item.media_type === "movie"
        ? item.title
        : item.media_type === "tv"
        ? item.name
        : item.name;

    onSelect(titulo);

    navigate(
      item.media_type === "movie"
        ? `/pelicula/${item.id}`
        : item.media_type === "tv"
        ? `/serie/${item.id}`
        : item.media_type === "person"
        ? `/actor/${item.id}`
        : "/"
    );
  };

  if (!query || sugerencias.length === 0) return null;

  return (
    <div className="absolute top-full left-0 mt-2 bg-[#1c2434] text-gray-200 rounded-md shadow-lg w-full z-50 max-h-80 min-w-72 overflow-y-auto">
      {loading ? (
        <p className="p-3 text-sm text-gray-400">Cargando...</p>
      ) : (
        sugerencias.map((item) => {
          const titulo =
            item.media_type === "movie"
              ? item.title
              : item.media_type === "tv"
              ? item.name
              : item.name;

          const fecha =
            item.release_date || item.first_air_date
              ? (item.release_date || item.first_air_date).split("-")[0]
              : "—";

          const tipo =
            item.media_type === "movie"
              ? "Película"
              : item.media_type === "tv"
              ? "Serie"
              : "Persona";

          const poster = item.poster_path || item.profile_path;

          return (
            <div
              key={`${item.media_type}-${item.id}`}
              onClick={() => handleClick(item)}
              className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-[#2a334a] transition text-sm"
            >
              {/* Imagen */}
              <img
                src={`${IMG_BASE}${poster}`}
                alt={titulo}
                className="w-10 h-14 object-cover rounded-md flex-shrink-0"
              />

              {/* Texto */}
              <div className="flex flex-col truncate">
                <span className="font-medium truncate">{titulo}</span>
                <span className="text-xs text-gray-400">
                  {tipo} • {fecha}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default SearchSuggestions;
