import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./Sections/PagInicio";
import DetallePelicula from "./components/DetallePelicula";
import ResultadosBusqueda from "./components/Buscador"; 
import Nuevas from "./Sections/Nuevas"
import Clasicas from "./Sections/Clasicas"
import Animadas from "./Sections/Animadas"
import Terror from "./Sections/Terror"
import Romance from "./Sections/Romance"
import Documentales from "./Sections/Documentales"
import Creando from "./sections/Creando";

// --- IMPORTACIONES PARA LOS MODALES ---
import PrivacyPolicyModal from './components/PrivacyPolicyModal'
import TermsAndConditionsModal from './components/Terms';
import ContactUsModal from './components/Contact';
function App() {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <Header />
      
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/pelicula/:id" element={<DetallePelicula />} />
        <Route path="/buscar/:query" element={<ResultadosBusqueda />} />
        <Route path="/nuevas" element={<Nuevas />} />
        <Route path="/Clasicas" element={<Clasicas />} />
        <Route path="/Animadas" element={<Animadas />} />
        <Route path="/terror" element={<Terror />} />
        <Route path="/romance" element={<Romance />} />
        <Route path="/documentales" element={<Documentales />} />
        <Route path="/creando" element={<Creando />} />
        <Route path="*" element={<Creando />} />
      </Routes>

      {/* ✅ MUEVE EL FOOTER AQUÍ */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onOpenTerms={() => setIsTermsModalOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      {/* Modales */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
      <TermsAndConditionsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
      <ContactUsModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}

export default App;