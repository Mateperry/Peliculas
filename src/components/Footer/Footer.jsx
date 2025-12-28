import React from "react";

const Footer = ({ onOpenPrivacy, onOpenTerms, onOpenContact }) => {
  return (
    <footer className="bg-transparent backdrop-blur-md p-4 w-full shadow-md text-center mt-auto">
      <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 text-white">
        <span>© 2025 Todos los derechos reservados</span>
        
        <button
          onClick={onOpenPrivacy}
          className="hover:underline focus:outline-none"
        >
          Política de privacidad
        </button>
        <button
          onClick={onOpenTerms}
          className="hover:underline focus:outline-none"
        >
          Términos y condiciones
        </button>
        <button
          onClick={onOpenContact}
          className="hover:underline focus:outline-none"
        >
          Contáctanos
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
          onClick={() =>
            window.open("https://portafolio-phi-sable.vercel.app", "_blank")
          }
        >
          Portafolio Mateo Castro
        </button>
      </div>
    </footer>
  );
};

export default Footer;
