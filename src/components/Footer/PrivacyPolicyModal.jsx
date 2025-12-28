// PrivacyPolicyModal.jsx
import React from 'react';
import Modal from './Modal';

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Política de Privacidad">
      <div className="prose max-w-none text-white"> 
        <p>
          En nuestra Pagina de deportes, nos tomamos muy en serio tu privacidad. Esta política de privacidad describe cómo recopilamos, usamos y protegemos tu información personal.
        </p>
        <h3>Información que Recopilamos</h3>
        <p>
          Recopilamos información que nos proporcionas directamente, como tu nombre, dirección de correo electrónico y cualquier otra información que decidas compartir al utilizar nuestros servicios o al contactarnos.
        </p>
        <h3>Uso de la Información</h3>
        <p>
          Utilizamos la información recopilada para:
        </p>
        <ul className="list-disc ml-5">
          <li>Proveer y mejorar nuestros servicios.</li>
          <li>Comunicarnos contigo.</li>
          <li>Personalizar tu experiencia.</li>
          <li>Cumplir con nuestras obligaciones legales.</li>
        </ul>
        <h3>Compartir Información</h3>
        <p>
          No vendemos, alquilamos ni comercializamos tu información personal con terceros. Solo compartimos información en las siguientes circunstancias:
        </p>
        <ul className="list-disc ml-5">
          <li>Con tu consentimiento.</li>
          <li>Para cumplir con la ley.</li>
          <li>Con proveedores de servicios que nos ayudan a operar nuestro negocio.</li>
        </ul>
        <h3>Seguridad de la Información</h3>
        <p>
          Implementamos medidas de seguridad para proteger tu información contra el acceso no autorizado, la alteración, divulgación o destrucción.
        </p>
        <h3>Tus Derechos</h3>
        <p>
          Tienes derecho a acceder, corregir o eliminar tu información personal. Si tienes alguna pregunta, por favor contáctanos.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Última actualización: 21 de mayo de 2025
        </p>
      </div>
    </Modal>
  );
};

export default PrivacyPolicyModal;