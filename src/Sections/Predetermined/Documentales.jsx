import React, { useEffect, useState } from "react";
import SeccionPeliculasgrandes from "./SeccionPeliculas";

const Documentales = () => {
 const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_API_URL;

  return (
    <div className="px-4 py-6 space-y-10 text-[#023E8A] mt-2">
<SeccionPeliculasgrandes
  titulo="Documentales de Animales"
  url={`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=es-MX&with_genres=99&with_keywords=18165&sort_by=popularity.desc&vote_count.gte=50`}
/>









    </div>
  );
};

export default Documentales;