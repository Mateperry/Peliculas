import React, { useEffect, useState } from "react";
import SeccionPeliculasgrande from "./SeccionPeliculas";

const Nuevas = () => {
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_API_URL;

  return (
    <div className="px-4 py-6 space-y-10 text-[#023E8A] mt-2">
      <SeccionPeliculasgrande
        titulo="Peliculas Nuevas"
        url={`${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=es-MX`}
      />
      <SeccionPeliculasgrande
        titulo="Pronto Estreno"
        url={`${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=es-MX
`}
      />
    </div>
  );
};

export default Nuevas;