import React, { useEffect, useState } from "react";
import SeccionPeliculasgrande from "./SeccionPeliculas";

const Clasicas= () => {
 const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_API_URL;

  return (
    <div className="px-4 py-6 space-y-10 text-[#023E8A] mt-2">
<SeccionPeliculasgrande
  titulo="Películas Clásicas"
  url={`${TMDB_BASE_UR}/discover/movie?api_key=${TMDB_API_KEY}&language=es-MX&sort_by=popularity.desc&primary_release_date.lte=1999-12-31`}
/>

<SeccionPeliculasgrande
  titulo="Películas 2000–2010"
  url={`${TMDB_BASE_UR}/discover/movie?api_key=${TMDB_API_KEY}&language=es-MX&sort_by=popularity.desc&primary_release_date.gte=2000-01-01&primary_release_date.lte=2010-12-31`}
/>

<SeccionPeliculasgrande
  titulo="Películas 2010–2020"
  url={`${TMDB_BASE_UR}/discover/movie?api_key=${TMDB_API_KEY}&language=es-MX&sort_by=popularity.desc&primary_release_date.gte=2010-01-01&primary_release_date.lte=2020-12-31`}
/>

    </div>
  );
};

export default Clasicas;