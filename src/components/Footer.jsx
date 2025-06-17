import React, { useState, useEffect } from "react";

const Footer = ({ onOpenPrivacy, onOpenTerms, onOpenContact }) => { // <--- Recibe los props aquí
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;

      // Muestra el footer cuando el usuario está cerca del final de la página
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={`bg-transparent backdrop-blur-md p-4 w-full shadow-md text-center mt-auto transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 text-white">
        <span>© 2025 Todos los derechos reservados</span>
        {/* Usamos las funciones de los props en el onClick */}
        <button
          onClick={onOpenPrivacy} // <--- Llama a la función pasada por prop
          className="hover:underline focus:outline-none" // Estiliza como botón para accesibilidad y clics
        >
          Política de privacidad
        </button>
        <button
          onClick={onOpenTerms} // <--- Llama a la función pasada por prop
          className="hover:underline focus:outline-none"
        >
          Términos y condiciones
        </button>
        <button
          onClick={onOpenContact} // <--- Llama a la función pasada por prop
          className="hover:underline focus:outline-none"
        >
          Contáctanos
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
          onClick={() => window.open("https://portafolio-lake-nine-75.vercel.app", "_blank")}
        >
          Portafolio Mateo Castro
        </button>
      </div>
    </footer>
  );
};

export default Footer;
