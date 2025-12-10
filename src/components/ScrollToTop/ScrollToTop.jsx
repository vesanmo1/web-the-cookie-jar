// USO DE CHATGPT
// Componente para asegurar que al cambiar de ruta la nueva página se abre arriba del todo 
// (no con el scroll de la página anterior)
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [pathname]);

  return null;
}