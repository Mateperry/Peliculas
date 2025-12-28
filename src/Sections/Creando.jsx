import React from "react";
import { motion } from "framer-motion";
import img1 from "../image/imagencreando.png";
import { Link } from 'react-router-dom';

const Creando = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#32196d] text-white py-12 px-6  md:px-20 flex flex-col-reverse md:flex-row items-center justify-between gap-12 rounded-3xl shadow-xl"
    >
      {/* Text Section */}
      <div className="max-w-lg w-5/6 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">En estos momentos ...</h2>
        <h3 className="text-xl md:text-2xl font-semibold mb-2">Estamos creando esta sección</h3>
        <p className="text-gray-300 mb-6 text-base md:text-lg">
          Estamos trabajando arduamente para ofrecerte la mejor experiencia en deportes. ¡Pronto podrás disfrutar de contenido emocionante y actualizado!
        </p>
        <h4 className="text-lg md:text-xl font-semibold mb-2">Mira mi portafolio para más...</h4>
        <form className="flex flex-col sm:flex-row items-center sm:items-stretch gap-3 sm:gap-0 w-full">
          <button
            onClick={() => window.open("https://portafolio-phi-sable.vercel.app", "_blank")}
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition w-full sm:w-auto mx-2"
          >
            Portafolio Mateo Castro
          </button>
      <Link
           to="/"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition w-full sm:w-auto inline-block text-center"
            >
              Ir a Inicio
        </Link>
        </form>
      </div>

      {/* Illustration Section */}
      <div className="w-full max-w-md">
        <img
          src={img1}
          alt="imagen de sección creando"
          className="w-full h-auto object-contain shadow-sm rounded-lg"
        />
      </div>
    </motion.div>
  );
};

export default Creando;
