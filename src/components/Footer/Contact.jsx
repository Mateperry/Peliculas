// src/sections/modales/ContactUsModal.jsx
import React from 'react';
import Modal from './Modal';

const ContactUsModal = ({ isOpen, onClose }) => {
  // Reemplaza esta URL con la que te dio Formspree.io
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpwdewja'; // ¡Esta es la URL que te dio Formspree!

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el envío tradicional del formulario

    const formData = new FormData(e.target); // Captura los datos del formulario

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json' // Importante para que Formspree responda JSON
        }
      });

      if (response.ok) {
        alert('¡Mensaje enviado con éxito! Recibirás una copia en tu correo.');
        e.target.reset(); // Limpia el formulario
        onClose(); // Cierra el modal
      } else {
        // Manejar errores de Formspree (ej. validación, límites, etc.)
        const data = await response.json();
        alert(`Error al enviar el mensaje: ${data.errors ? data.errors.map(err => err.message).join(', ') : 'Ha ocurrido un error inesperado.'}`);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('No se pudo enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contáctanos">
      <div className="prose max-w-none">
        <p>
          Si tienes alguna pregunta, comentario o necesitas soporte, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte.
        </p>
        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-blue-600">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name" // Asegúrate de que el 'name' coincida
              className="mt-1 block w-full px-3 py-2 border border-gray-300  bg-[#252323] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Tu nombre completo"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-600" >Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email" // Asegúrate de que el 'name' coincida
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-[#252323] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="tu@ejemplo.com"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-blue-600">Mensaje:</label>
            <textarea
              id="message"
              name="message" // Asegúrate de que el 'name' coincida
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-[#252323] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Escribe tu mensaje aquí..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Enviar Mensaje
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600">
          <p>También puedes contactarnos por:</p>
          <p><strong>Email:</strong> <a href="mailto:info@tudominio.com" className="text-blue-600 hover:underline">castromateo2004@gmail.com</a></p>
          
        </div>
      </div>
    </Modal>
  );
};

export default ContactUsModal;