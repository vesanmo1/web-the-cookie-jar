// Importación de estilos
import "./MainLayout.css";
// Outlet permite renderizar componentes hijos dentro de un layout.
import { Outlet } from "react-router-dom";
// Componentes globales (navbar y footer)
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
// Componente que fuerza el scroll (arriba del todo) al principio de la página cada vez que cambia la ruta.
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

/*
MainLayout:
- Envuelve todas las páginas que deben mostrar NavBar y Footer.
- <Outlet /> actúa como “hueco” donde se pinta el componente de la ruta hija.
*/
function MainLayout() {
  return (
    <>
        {/* Barra de navegación fija/pegada en la parte superior */}
        <NavBar />
        <ScrollToTop />
            {/* Contenedor principal del contenido de cada página */}
            <main className="layout-main">
                {/* Aquí se renderiza la página hija según la ruta actual */}
                <Outlet />
            </main>
        {/* Pie de página común a todas las páginas del layout */}
        <Footer />
    </>
  );
}

export default MainLayout;