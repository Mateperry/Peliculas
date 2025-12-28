// TermsAndConditionsModal.jsx
import React from 'react';
import Modal from './Modal'; // Ajusta la ruta si es necesario

const TermsAndConditionsModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Términos y Condiciones">
      <div className="prose max-w-none">
        <p>
          Bienvenido a Deports . Al acceder o utilizar nuestros servicios, aceptas cumplir y estar sujeto a los siguientes términos y condiciones. Por favor, léelos detenidamente.
        </p>
        <h3>Aceptación de los Términos</h3>
        <p>
          Al usar nuestros servicios, reconoces que has leído, entendido y aceptado estos Términos y Condiciones, nuestra Política de Privacidad y cualquier otra política o directriz aplicable.
        </p>
        <h3>Uso de los Servicios</h3>
        <p>
          Te otorgamos una licencia limitada, no exclusiva, intransferible y revocable para utilizar nuestros servicios de acuerdo con estos Términos. Te comprometes a no:
        </p>
        <ul className="list-disc ml-5">
          <li>Utilizar los servicios para fines ilegales.</li>
          <li>Interferir con la seguridad o el funcionamiento de los servicios.</li>
          <li>Reproducir, duplicar, copiar, vender, revender o explotar cualquier parte de los servicios sin nuestro permiso expreso por escrito.</li>
        </ul>
        <h3>Cuentas de Usuario</h3>
        <p>
          Si nuestros servicios requieren la creación de una cuenta, eres responsable de mantener la confidencialidad de tu información de inicio de sesión y de todas las actividades que ocurran bajo tu cuenta.
        </p>
        <h3>Propiedad Intelectual</h3>
        <p>
          Todo el contenido, características y funcionalidades presentes en los servicios (incluyendo textos, gráficos, logotipos, íconos, imágenes, clips de audio, descargas digitales, compilaciones de datos y software) son propiedad de Deports o sus licenciantes y están protegidos por leyes de derechos de autor y marcas registradas.
        </p>
        <h3>Limitación de Responsabilidad</h3>
        <p>
          En la medida máxima permitida por la ley,Deports no será responsable de ningún daño indirecto, incidental, especial, consecuente o punitivo, o cualquier pérdida de ganancias o ingresos, ya sea incurrido directa o indirectamente, o cualquier pérdida de datos, uso, buena voluntad u otras pérdidas intangibles, resultantes de (a) tu acceso o uso o incapacidad de acceso o uso de los servicios; (b) cualquier conducta o contenido de terceros en los servicios; o (c) acceso, uso o alteración no autorizados de tus transmisiones o contenido.
        </p>
        <h3>Modificaciones de los Términos</h3>
        <p>
          Nos reservamos el derecho de modificar estos Términos en cualquier momento. Cualquier cambio será efectivo inmediatamente después de su publicación en nuestro sitio web. Tu uso continuado de los servicios después de dichos cambios constituye tu aceptación de los nuevos Términos.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Última actualización: 21 de mayo de 2025
        </p>
      </div>
    </Modal>
  );
};

export default TermsAndConditionsModal;