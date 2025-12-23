// Importación de estilos
import "./MainLayout.css"
// Outlet permite renderizar componentes hijos dentro de un layout.
import { Outlet } from "react-router-dom"
// Componentes globales (navbar y footer)
import { NavbarClient } from "@/components/Navbar/NavbarClient"
import { NavbarAdmin } from "@/components/Navbar/NavbarAdmin"
import { Footer } from "@/components/Footer/Footer"

/*
MainLayout:
- Envuelve todas las páginas que deben mostrar NavBar y Footer.
- <Outlet /> actúa como “hueco” donde se pinta el componente de la ruta hija.
*/
export const MainLayoutClient = () => {
  return (
    <div className="layout">
        {/* Barra de navegación fija/pegada en la parte superior */}
        <NavbarClient />
        {/* Contenedor principal del contenido de cada página */}
        <main className="layout-main">
            {/* Aquí se renderiza la página hija según la ruta actual */}
            <Outlet />
        </main>
        {/* Pie de página común a todas las páginas del layout */}
        <Footer />
    </div>
  )
}

export const MainLayoutAdmin = () => {
  return (
    <div className="layout">
        {/* Barra de navegación fija/pegada en la parte superior */}
        <NavbarAdmin />
        {/* Contenedor principal del contenido de cada página */}
        <main className="layout-main">
            {/* Aquí se renderiza la página hija según la ruta actual */}
            <Outlet />
        </main>
    </div>
  )
}