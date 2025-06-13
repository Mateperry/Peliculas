import React, { useEffect, useState } from "react";
import SeccionPeliculasgrandes from "./SeccionPeliculas";

const Terror = () => {
  const API_KEY = "d27772438d1557a847ef40b90d71ae43";
  const BASE_URL = "https://api.themoviedb.org/3";

  return (
    <div className="px-4 py-6 space-y-10 text-[#023E8A] mt-24">
<SeccionPeliculasgrandes
  titulo="Terror y Suspense"
  url={`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-MX&with_genres=27,53&sort_by=popularity.desc&vote_count.gte=100`}
/>






    </div>
  );
};

export default Terror;