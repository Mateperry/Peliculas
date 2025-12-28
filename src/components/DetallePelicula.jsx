import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DetallePelicula = () => {
  const { id } = useParams();
 const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const [pelicula, setPelicula] = useState(null);
  const [actores, setActores] = useState([]);
  const [director, setDirector] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [recomendadas, setRecomendadas] = useState([]);
  const [plataformas, setPlataformas] = useState(null); // <- Nuevo estado
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
        const [movieRes, creditsRes, videosRes, recRes, provRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=es-MX`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}&language=es-MX`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_API_KEY}&language=es-MX`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${TMDB_API_KEY}&language=es-MX`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${TMDB_API_KEY}`)
        ]);

        const movie = await movieRes.json();
        const credits = await creditsRes.json();
        const videos = await videosRes.json();
        const recs = await recRes.json();
        const providers = await provRes.json();

        setPelicula(movie);
        setActores(credits.cast.slice(0, 6));
        setDirector(credits.crew.find(c => c.job === "Director"));
        const trailer = videos.results.find(v => v.type === "Trailer" && v.site === "YouTube");
        setTrailerKey(trailer?.key);
        setRecomendadas(recs.results.slice(0, 10));

        // Guardamos plataformas disponibles (ejemplo: en México)
        setPlataformas(providers.results?.MX || providers.results?.ES || null);

      } catch (err) {
        console.error(err);
        setError("Ocurrió un error cargando la información.");
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, [id]);

  const renderStars = rating => {
    const stars = [];
    const full = Math.floor(rating / 2);
    const half = rating % 2 >= 1;
    const empty = 5 - full - (half ? 1 : 0);
    for (let i = 0; i < full; i++) stars.push(<FaStar key={"f" + i} className="text-yellow-400" />);
    if (half) stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    for (let i = 0; i < empty; i++) stars.push(<FaRegStar key={"e" + i} className="text-yellow-400" />);
    return stars;
  };

  if (loading || !delayDone) {
    return (
      <div className="max-w-5xl mx-auto mt-28 space-y-6 p-4 ">
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

  if (error) return <p className="text-center text-red-500 mt-60">{error}</p>;
  if (!pelicula) return null;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 text-gray-700 mt-2">
      <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
          alt={pelicula.title}
          className="w-full md:w-1/3 h-auto object-cover"
        />
        <div className="flex-1 p-4">
          <h1 className="text-4xl font-bold mb-2">{pelicula.title}</h1>
          {pelicula.tagline && <p className="italic text-red-500 mb-3">"{pelicula.tagline}"</p>}

          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <p><strong>Estreno:</strong> {pelicula.release_date}</p>
            <p><strong>Duración:</strong> {pelicula.runtime} min</p>
            <div className="flex items-center gap-1">
              <strong>Calificación:</strong>
              {renderStars(pelicula.vote_average)}
              <span className="ml-2 text-gray-500 text-xs">({pelicula.vote_average.toFixed(1)})</span>
            </div>
            <p><strong>Presupuesto:</strong> {pelicula.budget ? `$${pelicula.budget.toLocaleString()}` : '—'}</p>
          </div>

          {pelicula.genres?.length > 0 && (
            <p className="mb-4"><strong>Géneros:</strong> {pelicula.genres.map(g => g.name).join(", ")}</p>
          )}

          <p className="text-gray-700 leading-relaxed">{pelicula.overview}</p>

          {director && (
            <p className="mt-4"><strong>Director:</strong> {director.name}</p>
          )}

          {actores.length > 0 && (
            <div className="mt-4">
              <p><strong>Actores principales:</strong></p>
              <div className="flex flex-wrap gap-2 mt-1">
                {actores.map(a =>
                  <span key={a.id} className="px-2 py-1 bg-gray-200 rounded">{a.name}</span>
                )}
              </div>
            </div>
          )}

          {/* Aquí mostramos plataformas */}
          {plataformas && (
            <div className="mt-4">
              <p><strong>Disponible en:</strong></p>
              <div className="flex flex-wrap gap-2 mt-2">
                {plataformas.flatrate?.map(p => (
                  <div key={p.provider_id} className="flex items-center gap-2">
                    <img
                      src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                      alt={p.provider_name}
                      className="w-8 h-8 rounded"
                    />
                    <span className="text-sm">{p.provider_name}</span>
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
          <h2 className="text-2xl font-semibold mb-4">Películas recomendadas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {recomendadas.map(p => (
              <Link key={p.id} to={`/pelicula/${p.id}`} className="group">
                <img
                  src={`https://image.tmdb.org/t/p/w300${p.poster_path}`}
                  alt={p.title}
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

export default DetallePelicula;
