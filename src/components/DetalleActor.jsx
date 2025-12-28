import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaInstagram, FaTwitter, FaFacebook, FaImdb } from "react-icons/fa";

const DetalleActor = () => {
  const { id } = useParams();
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY; // para Vite

  const [actor, setActor] = useState(null);
  const [peliculas, setPeliculas] = useState([]);
  const [series, setSeries] = useState([]);
  const [redes, setRedes] = useState({});
  const [relacionados, setRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [delayDone, setDelayDone] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setDelayDone(true), 100);
    return () => clearTimeout(delayTimer);
  }, []);

  useEffect(() => {
    const fetchActor = async () => {
      try {
        setLoading(true);

        const [actorRes, moviesRes, tvRes, redesRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/person/${id}?api_key=${TMDB_API_KEY}&language=es-MX`
          ),
          fetch(
            `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${TMDB_API_KEY}&language=es-MX`
          ),
          fetch(
            `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${TMDB_API_KEY}&language=es-MX`
          ),
          fetch(
            `https://api.themoviedb.org/3/person/${id}/external_ids?api_key=${TMDB_API_KEY}`
          ),
        ]);

        const actorData = await actorRes.json();
        const moviesData = await moviesRes.json();
        const tvData = await tvRes.json();
        const redesData = await redesRes.json();

        setActor(actorData);

        // 🎬 Top 5 películas más populares
        setPeliculas(
          moviesData.cast
            ?.filter((m) => m.title && m.character)
            .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
            .slice(0, 5) || []
        );

        // 📺 Top 5 series más populares
        setSeries(
          tvData.cast
            ?.filter((s) => s.name && s.character)
            .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
            .slice(0, 5) || []
        );

        setRedes(redesData);

        // 👉 Buscar co-actores
        let coActors = [];
        if (moviesData.cast?.length > 0) {
          const movieId = moviesData.cast[0].id;
          const creditsRes = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=es-MX`
          );
          const creditsData = await creditsRes.json();
          coActors = creditsData.cast
            ?.filter((c) => c.id !== Number(id) && c.profile_path)
            .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
            .slice(0, 10);
        }

        if (coActors.length === 0 && tvData.cast?.length > 0) {
          const serieId = tvData.cast[0].id;
          const creditsRes = await fetch(
            `https://api.themoviedb.org/3/tv/${serieId}/credits?api_key=${TMDB_API_KEY}&language=es-MX`
          );
          const creditsData = await creditsRes.json();
          coActors = creditsData.cast
            ?.filter((c) => c.id !== Number(id) && c.profile_path)
            .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
            .slice(0, 10);
        }

        setRelacionados(coActors);
      } catch (err) {
        console.error(err);
        setError("Ocurrió un error cargando la información del actor.");
      } finally {
        setLoading(false);
      }
    };

    fetchActor();
  }, [id]);

  if (loading || !delayDone) {
    return (
      <div className="max-w-5xl mx-auto mt-28 space-y-6 p-4">
        <Skeleton height={40} width="66%" borderRadius={8} />
        <Skeleton height={400} borderRadius={8} />
        <Skeleton count={4} />
      </div>
    );
  }

  if (error)
    return <p className="text-center text-red-500 mt-60">{error}</p>;
  if (!actor) return null;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 mt-2">
      {/* --- Tarjeta blanca principal --- */}
      <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-lg overflow-hidden p-6">
        {/* Foto */}
        <img
          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
          alt={actor.name}
          className="w-full md:w-1/3 h-[500px] object-cover rounded-lg"
        />

        {/* Info al lado */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{actor.name}</h1>

          {actor.birthday && (
            <p>
              <strong>Fecha de nacimiento:</strong> {actor.birthday}
            </p>
          )}
          {actor.place_of_birth && (
            <p>
              <strong>Lugar de nacimiento:</strong> {actor.place_of_birth}
            </p>
          )}
          {actor.known_for_department && (
            <p>
              <strong>Conocido por:</strong> {actor.known_for_department}
            </p>
          )}

          {actor.biography && (
            <p className="mt-4 text-gray-700 leading-relaxed">
              {actor.biography}
            </p>
          )}

          {/* Pelis y Series */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {peliculas.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  🎬 Películas destacadas
                </h2>
                <ul className="list-disc list-inside space-y-1">
                  {peliculas.map((p) => (
                    <li key={p.id}>
                      <Link
                        to={`/pelicula/${p.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {p.title}
                      </Link>{" "}
                      — <span className="italic">{p.character}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {series.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  📺 Series destacadas
                </h2>
                <ul className="list-disc list-inside space-y-1">
                  {series.map((s) => (
                    <li key={s.id}>
                      <Link
                        to={`/serie/${s.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {s.name}
                      </Link>{" "}
                      — <span className="italic">{s.character}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Redes sociales */}
          <div className="flex gap-4 mt-6 text-2xl text-gray-600">
            {redes.instagram_id && (
              <a
                href={`https://instagram.com/${redes.instagram_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
                <FaInstagram />
              </a>
            )}
            {redes.twitter_id && (
              <a
                href={`https://twitter.com/${redes.twitter_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <FaTwitter />
              </a>
            )}
            {redes.facebook_id && (
              <a
                href={`https://facebook.com/${redes.facebook_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                <FaFacebook />
              </a>
            )}
            {redes.imdb_id && (
              <a
                href={`https://www.imdb.com/name/${redes.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-600"
              >
                <FaImdb />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* --- Actores relacionados --- */}
      {relacionados.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">👥 Actores relacionados</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {relacionados.map((a) => (
              <Link
                key={a.id}
                to={`/actor/${a.id}`}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${a.profile_path}`}
                  alt={a.name}
                  className="h-64 w-full object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-medium text-center">{a.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalleActor;
