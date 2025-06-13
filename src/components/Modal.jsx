// Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // Si no está abierto, no renderiza nada

  // Función para manejar el clic en el overlay (el fondo oscuro)
  const handleOverlayClick = (e) => {
    // Si el clic ocurrió directamente en el div del overlay (no en un hijo del modal),
    // entonces cerramos el modal.
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  return (
    // Overlay oscuro de fondo que cubre toda la pantalla
    // Añadimos un id y el onClick para detectar clics fuera del contenido del modal
    <div
      id="modal-overlay" // <-- Agrega este ID
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={handleOverlayClick} // <-- Agrega este manejador de clic
    >
      {/* Contenedor principal del modal */}
      {/* El stopPropagation evita que los clics dentro del modal se "filtren" al overlay */}
      <div
        className="bg-[#252323] rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()} // <-- ¡IMPORTANTE! Evita que el clic dentro del modal cierre el modal
      >
        {/* Cabecera del modal con título y botón de cierre */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-blue-600">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-400 text-3xl font-bold leading-none transition-colors duration-200" // Ajustado color hover
            aria-label="Cerrar"
          >
            &times; {/* Símbolo "x" para cerrar */}
          </button>
        </div>
        {/* Cuerpo del modal donde se renderiza el contenido */}
        <div className="p-4 text-gray-200"> {/* Ajustado color de texto para el fondo oscuro */}
          {children} {/* Aquí se insertará el contenido específico de cada pop-up */}
        </div>
      </div>
    </div>
  );
};

export default Modal;