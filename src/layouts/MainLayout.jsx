// ============================================================
// MAIN LAYOUTS (CLIENT + ADMIN)
//
// Este archivo define dos layouts reutilizables para React Router:
// - MainLayoutClient: layout para la parte pública (cliente)
// - MainLayoutAdmin:  layout para la parte admin
//
// Ambos layouts comparten la misma estructura base:
// 1) Navbar superior
// 2) <Outlet /> como “hueco” donde se renderiza la ruta hija
//
// Diferencias:
// - Client: incluye <Footer /> y usa <NavbarClient />
// - Admin: NO incluye <Footer /> y usa <NavbarAdmin />
// ============================================================


// ============================================================
// IMPORTS
// ============================================================

// Importación de estilos del layout (estructura común y clases layout-*)
import "./MainLayout.css"

// React Router:
// - Outlet: renderiza el componente de la ruta hija dentro del layout
import { Outlet } from "react-router-dom"

// Componentes globales de navegación y pie de página
import { NavbarClient } from "@/components/Navbar/NavbarClient"
import { NavbarAdmin } from "@/components/Navbar/NavbarAdmin"
import { Footer } from "@/components/Footer/Footer"


// ============================================================
// MainLayoutClient
//
// Layout para la parte pública de la web.
// Renderiza:
// - NavbarClient (arriba)
// - Contenido dinámico de la ruta hija via <Outlet />
// - Footer (abajo)
// ============================================================
export const MainLayoutClient = () => {
  return (
    <div className="layout">
        {/* Barra de navegación fija/pegada en la parte superior */}
        <NavbarClient />
        {/* Contenedor principal del contenido de cada página */}
        <main className="layout-main--client">
            {/* Aquí se renderiza la página hija según la ruta actual */}
            <Outlet />
        </main>
        {/* Pie de página común a todas las páginas del layout */}
        <Footer />
    </div>
  )
}

// ============================================================
// MainLayoutAdmin
//
// Layout para la parte admin.
// Renderiza:
// - NavbarAdmin (arriba)
// - Contenido dinámico de la ruta hija via <Outlet />
//
// Nota:
// - No incluye Footer (normalmente en admin se prioriza espacio de trabajo).
// ============================================================
export const MainLayoutAdmin = () => {
  return (
    <div className="layout">
        {/* Barra de navegación fija/pegada en la parte superior */}
        <NavbarAdmin />
        {/* Contenedor principal del contenido de cada página */}
        <main className="layout-main--admin">
            {/* Aquí se renderiza la página hija según la ruta actual */}
            <Outlet />
        </main>
    </div>
  )
}