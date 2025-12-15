// USO DE CHATGPT
// Componente para asegurar que al cambiar de ruta la nueva página se abre arriba del todo (excepto en FlavorDetailsPage) 

// Importamos useEffect para ejecutar lógica cuando cambie la ruta
// e useRef para guardar la ruta anterior entre renders.
import { useEffect, useRef } from "react";
// useLocation nos da información sobre la ruta actual (pathname, search, etc.)
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    // Obtenemos la ubicación actual del router (incluye pathname)
    const location = useLocation();

    // useRef para guardar la ruta anterior.
    // Se inicializa con el pathname actual la primera vez que se monta el componente.
    const prevPathRef = useRef(location.pathname);

    useEffect(() => {
        // Ruta anterior (antes de este cambio)
        const prevPath = prevPathRef.current;
        // Ruta actual (después del cambio)
        const currPath = location.pathname;

    // true si la ruta es /flavors/:id (detalle de sabor)
    const isFlavorDetail = (path) => /^\/flavors\/[^/]+$/.test(path);

    const prevIsDetail = isFlavorDetail(prevPath);
    const currIsDetail = isFlavorDetail(currPath);

    // Si voy de un detalle a otro detalle, NO scrolleo arriba
    if (prevIsDetail && currIsDetail) {
      prevPathRef.current = currPath;
      return;
    }

    // En cualquier otro caso, sí hago scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // puedes cambiar a "auto" si quieres estándar puro
    });

    // Guardamos la ruta actual como "previa" para la próxima vez que cambie
    prevPathRef.current = currPath;
  }, [location.pathname]);

  return null;
}