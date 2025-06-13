import React, { useEffect, useState } from "react";
import SeccionPeliculasgrande from "./SeccionPeliculas";

const Nuevas = () => {
  const API_KEY = "d27772438d1557a847ef40b90d71ae43";
  const BASE_URL = "https://api.themoviedb.org/3";

  return (
    <div className="px-4 py-6 space-y-10 text-[#023E8A] mt-24">
      <SeccionPeliculasgrande
        titulo="Peliculas Nuevas"
        url={`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=es-MX`}
      />
      <SeccionPeliculasgrande
        titulo="Pronto Estreno"
        url={`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=es-MX
`}
      />
    </div>
  );
};

export default Nuevas;