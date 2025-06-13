import React, { useEffect, useState } from "react";
import SeccionPeliculasgrande from "./SeccionPeliculas";

const Animadas= () => {
  const API_KEY = "d27772438d1557a847ef40b90d71ae43";
  const BASE_URL = "https://api.themoviedb.org/3";

  return (
    <div className="px-4 py-6 space-y-10 text-[#023E8A] mt-24">
<SeccionPeliculasgrande
  titulo="Animadas de Disney"
  url={`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-MX&with_genres=16&with_companies=6125&sort_by=vote_average.desc&vote_count.gte=500`}
/>

<SeccionPeliculasgrande
  titulo="Animadas de Pixar"
  url={`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-MX&with_genres=16&with_companies=3&sort_by=vote_average.desc&vote_count.gte=500`}
/>

<SeccionPeliculasgrande
  titulo="Animadas de DreamWorks"
  url={`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-MX&with_genres=16&with_companies=521&sort_by=vote_average.desc&vote_count.gte=500`}
/>

<SeccionPeliculasgrande
  titulo="Animadas de Laika"
  url={`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-MX&with_genres=16&with_companies=11537&sort_by=vote_average.desc&vote_count.gte=500`}
/>

<SeccionPeliculasgrande
  titulo="Animadas de Studio Ghibli"
  url={`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-MX&with_genres=16&with_companies=10342&sort_by=vote_average.desc&vote_count.gte=500`}
/>

<SeccionPeliculasgrande
  titulo="Animadas de Illumination"
  url={`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-MX&with_genres=16&with_companies=6704&sort_by=vote_average.desc&vote_count.gte=500`}
/>

    </div>
  );
};

export default Animadas;