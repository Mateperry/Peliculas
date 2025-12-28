import react from "react";
import SeccionPeliculas from "./SeccionPeliculasInicio";
import SliderInicio from "./SliderInicio";
const Homenologueado = () => {
      const API_KEY = "d27772438d1557a847ef40b90d71ae43";
  const BASE_URL = "https://api.themoviedb.org/3";
    return (
        <>
         <SliderInicio />
<SeccionPeliculas 
  titulo="🎬 Tendencias de hoy"
  url={`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=es-MX`}
/>

<SeccionPeliculas 
  titulo="🌟 Estrenos recientes"
  url={`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=es-MX&region=MX`}
/>

<SeccionPeliculas 
  titulo="🍿 Populares en la semana"
  url={`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=es-MX`}
/>

        </>
    )
}   
export default Homenologueado;