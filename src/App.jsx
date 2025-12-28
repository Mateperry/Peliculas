import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Inicio from "./Sections/Home/Homenologueado";
import DetallePelicula from "./components/DetallePelicula";
import DetalleSerie from "./components/DetalleSerie";
import DetalleActor from "./components/DetalleActor";
import ResultadosBusqueda from "./components/Header/Buscador";
import Nuevas from "./Sections/Predetermined/Nuevas";
import Clasicas from "./Sections/Predetermined/Clasicas";
import Animadas from "./Sections/Predetermined/Animadas";
import Terror from "./Sections/Predetermined/Terror";
import Romance from "./Sections/Predetermined/Romance";
import Documentales from "./Sections/Predetermined/Documentales";
import Creando from "./Sections/Creando";

import AuthForm from "./Sections/Login/AuthForm";
import PerfilUsuario from "./Sections/Users/Perfil";
// --- IMPORTACIONES PARA LOS MODALES ---
import PrivacyPolicyModal from './components/Footer/PrivacyPolicyModal';
import TermsAndConditionsModal from './components/Footer/Terms';
import ContactUsModal from './components/Footer/Contact';

function App() {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const location = useLocation();
  const hideHeader = location.pathname === "/auth";

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      
      {!hideHeader && <Header />}
      
      <div style={{ flex: 1 }}>
        <ScrollToTop />
        <Routes>
         

          <Route path="/" element={<Inicio />} />
          <Route path="/pelicula/:id" element={<DetallePelicula />} />
          <Route path="/serie/:id" element={<DetalleSerie />} />
          <Route path="/actor/:id" element={<DetalleActor />} />
          <Route path="/buscar/:query" element={<ResultadosBusqueda />} />
          <Route path="/nuevas" element={<Nuevas />} />
          <Route path="/Clasicas" element={<Clasicas />} />
          <Route path="/Animadas" element={<Animadas />} />
          <Route path="/terror" element={<Terror />} />
          <Route path="/romance" element={<Romance />} />
          <Route path="/documentales" element={<Documentales />} />
          <Route path="/creando" element={<Creando />} />
          
          {/* RUTA DE LOGIN / REGISTER */}
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
          <Route path="*" element={<Creando />} />
        </Routes>
      </div>

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
    </div>
  );
}

export default App;
