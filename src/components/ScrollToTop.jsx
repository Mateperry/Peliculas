import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // siempre que cambie la ruta, sube al inicio
  }, [pathname]);

  return null; // este componente no pinta nada
};

export default ScrollToTop;
