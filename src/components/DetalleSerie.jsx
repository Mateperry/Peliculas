import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DetalleSerie = () => {
  const { id } = useParams();
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const [serie, setSerie] = useState(null);
  const [actores, setActores] = useState([]);
  const [creadores, setCreadores] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [recomendadas, setRecomendadas] = useState([]);
  const [providers, setProviders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [delayDone, setDelayDone] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setDelayDone(true);
    }, 100);
    return () => clearTimeout(delayTimer);
  }, []);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        setLoading(true);

        const [serieRes, creditsRes, recRes, providersRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}&language=es-MX`
          ),
          fetch(
            `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${TMDB_API_KEY}&language=es-MX`
          ),
          fetch(
            `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${TMDB_API_KEY}&language=es-MX`
          ),
          fetch(
            `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${TMDB_API_KEY}`
          ),
        ]);

        const serieData = await serieRes.json();
        const credits = await creditsRes.json();
        const recs = await recRes.json();
        const providersData = await providersRes.json();

        setSerie(serieData);
        setActores(credits.cast.slice(0, 6));
        setCreadores(serieData.created_by || []);
        setRecomendadas(recs.results.slice(0, 10));
        setProviders(providersData.results?.MX || null);

        // 🔎 Buscar tráiler primero en temporada 1
        let trailerKeyFinal = null;
        const seasonRes = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/season/1/videos?api_key=${TMDB_API_KEY}&language=es-MX`
        );
        const seasonVideos = await seasonRes.json();

        if (seasonVideos.results?.length > 0) {
          const trailer = seasonVideos.results.find(
            (v) => v.type === "Trailer" && v.site === "YouTube"
          );
          trailerKeyFinal = trailer?.key || seasonVideos.results[0]?.key;
        }

        // ⚡ Si no hay nada en temporada 1, buscar en general
        if (!trailerKeyFinal) {
          const videosRes = await fetch(
            `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${TMDB_API_KEY}&language=es-MX`
          );
          const videos = await videosRes.json();

          if (videos.results?.length > 0) {
            // primero oficial
            const officialTrailer = videos.results.find(
              (v) =>
                v.type === "Trailer" &&
                v.site === "YouTube" &&
                v.official === true
            );

            if (officialTrailer) {
              trailerKeyFinal = officialTrailer.key;
            } else {
              // si no hay oficial, tomar el más antiguo
              const sorted = [...videos.results]
                .filter((v) => v.type === "Trailer" && v.site === "YouTube")
                .sort(
                  (a, b) =>
                    new Date(a.published_at) - new Date(b.published_at)
                );
              trailerKeyFinal = sorted[0]?.key;
            }
          }
        }

        setTrailerKey(trailerKeyFinal);
      } catch (err) {
        console.error(err);
        setError("Ocurrió un error cargando la información.");
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating / 2);
    const half = rating % 2 >= 1;
    const empty = 5 - full - (half ? 1 : 0);
    for (let i = 0; i < full; i++)
      stars.push(<FaStar key={"f" + i} className="text-yellow-400" />);
    if (half)
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    for (let i = 0; i < empty; i++)
      stars.push(<FaRegStar key={"e" + i} className="text-yellow-400" />);
    return stars;
  };

  if (loading || !delayDone) {
    return (
      <div className="max-w-5xl mx-auto  space-y-6 p-4">
        <Skeleton height={40} width="66%" borderRadius={8} />
        <Skeleton height={400} borderRadius={8} />
        <div className="grid grid-cols-2 gap-4 ">
          <Skeleton height={24} />
          <Skeleton height={24} />
        </div>
        <Skeleton height={96} />
      </div>
    );
  }

  if (error)
    return <p className="text-center text-red-500 mt-60">{error}</p>;
  if (!serie) return null;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 text-gray-700 mt-2">
      <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
          alt={serie.name}
          className="w-full md:w-1/3 h-auto object-cover"
        />
        <div className="flex-1 p-4">
          <h1 className="text-4xl font-bold mb-2">{serie.name}</h1>
          {serie.tagline && (
            <p className="italic text-red-500 mb-3">"{serie.tagline}"</p>
          )}

          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <p>
              <strong>Primer episodio:</strong> {serie.first_air_date}
            </p>
            <p>
              <strong>Último episodio:</strong> {serie.last_air_date}
            </p>
            <p>
              <strong>Temporadas:</strong> {serie.number_of_seasons}
            </p>
            <p>
              <strong>Episodios:</strong> {serie.number_of_episodes}
            </p>
            <div className="flex items-center gap-1">
              <strong>Calificación:</strong>
              {renderStars(serie.vote_average)}
              <span className="ml-2 text-gray-500 text-xs">
                ({serie.vote_average.toFixed(1)})
              </span>
            </div>
          </div>

          {serie.genres?.length > 0 && (
            <p className="mb-4">
              <strong>Géneros:</strong>{" "}
              {serie.genres.map((g) => g.name).join(", ")}
            </p>
          )}

          <p className="text-gray-700 leading-relaxed">{serie.overview}</p>

          {creadores.length > 0 && (
            <div className="mt-4">
              <p>
                <strong>Creadores:</strong>{" "}
                {creadores.map((c) => c.name).join(", ")}
              </p>
            </div>
          )}

          {actores.length > 0 && (
            <div className="mt-4">
              <p>
                <strong>Actores principales:</strong>
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {actores.map((a) => (
                  <span key={a.id} className="px-2 py-1 bg-gray-200 rounded">
                    {a.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 📌 Sección de plataformas */}
          {providers?.flatrate && (
            <div className="mt-6">
              <p className="font-semibold">Disponible en:</p>
              <div className="flex gap-4 mt-2 flex-wrap">
                {providers.flatrate.map((p) => (
                  <div
                    key={p.provider_id}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w200${p.logo_path}`}
                      alt={p.provider_name}
                      className="w-12 h-12 rounded"
                    />
                    <span className="text-xs mt-1">{p.provider_name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {trailerKey && (
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-md">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Tráiler"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      )}

      {recomendadas.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Series recomendadas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {recomendadas.map((s) => (
              <Link key={s.id} to={`/serie/${s.id}`} className="group">
                <img
                  src={`https://image.tmdb.org/t/p/w300${s.poster_path}`}
                  alt={s.name}
                  className="rounded-lg shadow-sm group-hover:shadow-lg transition h-72 w-48 object-cover mx-auto"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalleSerie;
