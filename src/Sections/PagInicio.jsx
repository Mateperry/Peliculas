import React, { useEffect, useState } from "react";
import SeccionPeliculas from "./SeccionPeliculasInicio";

const Inicio = () => {
  const API_KEY = "d27772438d1557a847ef40b90d71ae43";
  const BASE_URL = "https://api.themoviedb.org/3";

  return (
    <div className="px-4 py-6 space-y-10 text-[#023E8A] mt-24">
      <SeccionPeliculas
        titulo="Recomendadas en el momento"
        url={`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-MX&sort_by=popularity.desc`}
      />
      <SeccionPeliculas
        titulo="Películas Animadas"
        url={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&language=es-MX&sort_by=vote_average.desc&vote_count.gte=1000`}
      />
      <SeccionPeliculas
        titulo="Películas de Acción"
        url={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&language=es-MX`}
      />
      <SeccionPeliculas
        titulo="Películas de Marvel"
        url={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_companies=420&language=es-MX`}
      />
      <SeccionPeliculas
        titulo="Películas de DC Comics"
        url={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_companies=9993&language=es-MX`}
      />
    </div>
  );
};

export default Inicio;

