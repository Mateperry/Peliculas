import React, { useEffect, useState } from "react";
import SeccionPeliculasgrande from "./SeccionPeliculas";

const Clasicas= () => {
  const API_KEY = "d27772438d1557a847ef40b90d71ae43";
  const BASE_URL = "https://api.themoviedb.org/3";

  return (
    <div className="px-4 py-6 space-y-10 text-[#023E8A] mt-24">
<SeccionPeliculasgrande
  titulo="Películas Clásicas"
  url={`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-MX&sort_by=popularity.desc&primary_release_date.lte=1999-12-31`}
/>

<SeccionPeliculasgrande
  titulo="Películas 2000–2010"
  url={`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-MX&sort_by=popularity.desc&primary_release_date.gte=2000-01-01&primary_release_date.lte=2010-12-31`}
/>

<SeccionPeliculasgrande
  titulo="Películas 2010–2020"
  url={`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-MX&sort_by=popularity.desc&primary_release_date.gte=2010-01-01&primary_release_date.lte=2020-12-31`}
/>

    </div>
  );
};

export default Clasicas;