import React, { useEffect, useState } from "react";
import SeccionPeliculasgrande from "./SeccionPeliculas";

const Animadas= () => {
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_API_URL;

  return (
    <div className="px-4 py-6 space-y-10 text-[#023E8A] mt-2">
<SeccionPeliculasgrande
  titulo="Animadas de Disney"
  url={`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=es-MX&with_genres=16&with_companies=6125&sort_by=vote_average.desc&vote_count.gte=500`}
/>

<SeccionPeliculasgrande
  titulo="Animadas de Pixar"
  url={`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=es-MX&with_genres=16&with_companies=3&sort_by=vote_average.desc&vote_count.gte=500`}
/>

<SeccionPeliculasgrande
  titulo="Animadas de DreamWorks"
  url={`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=es-MX&with_genres=16&with_companies=521&sort_by=vote_average.desc&vote_count.gte=500`}
/>

<SeccionPeliculasgrande
  titulo="Animadas de Laika"
  url={`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=es-MX&with_genres=16&with_companies=11537&sort_by=vote_average.desc&vote_count.gte=500`}
/>

<SeccionPeliculasgrande
  titulo="Animadas de Studio Ghibli"
  url={`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=es-MX&with_genres=16&with_companies=10342&sort_by=vote_average.desc&vote_count.gte=500`}
/>

<SeccionPeliculasgrande
  titulo="Animadas de Illumination"
  url={`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=es-MX&with_genres=16&with_companies=6704&sort_by=vote_average.desc&vote_count.gte=500`}
/>

    </div>
  );
};

export default Animadas;