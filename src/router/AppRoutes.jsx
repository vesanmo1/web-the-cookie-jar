// ============================================================
// APP ROUTES
// ------------------------------------------------------------
// Este archivo define TODAS las rutas del proyecto.
// Incluye:
// 1) Rutas públicas con MainLayoutClient (NavbarClient + Footer)
// 2) Ruta de login admin (/admin) SIN layout (ni navbar ni footer)
// 3) Rutas privadas de admin (/admin/*) protegidas con AdminGuard
//    y con MainLayoutAdmin (NavbarAdmin, sin Footer)
// 4) Ruta comodín "*" para ERROR 404 (página no encontrada) cuando
//    el usuario escribe una URL que NO existe en el proyecto
//    SIN layout (ni navbar ni footer)
// ============================================================

// Suspense permite mostrar un fallback mientras React carga componentes de forma diferida.
import { Suspense } from 'react'
// Routes y Route definen las rutas.
import { Routes, Route } from 'react-router-dom'
// Para reestablecer el scroll al cambiar de ruta
import { ScrollToTop } from './scrollToTop'
// Importa el layout correspondiente a cada página
import { MainLayoutClient, MainLayoutAdmin } from '@/layouts/MainLayout'
// Proteger rutas privadas de administración (/admin/*)
import { AdminGuard } from "./AdminGuard"

// Páginas de administración
import { AdminAddCookiePage } from '@/pages/admin/AdminAddCookiePage/AdminAddCookiePage'
import { AdminEditCookiePage } from '@/pages/admin/AdminEditCookiePage/AdminEditCookiePage'
import { AdminFlavorsPage } from '@/pages/admin/AdminFlavorsPage/AdminFlavorsPage'
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage/AdminLoginPage'

// Páginas públicas
import { FlavorDetailsPage } from'@/pages/client/FlavorDetailsPage/FlavorDetailsPage'
import { FlavorsPage } from '@/pages/client/FlavorsPage/FlavorsPage'
import { HomePage } from '@/pages/client/HomePage/HomePage'
import { LocationsPage } from '@/pages/client/LocationsPage/LocationsPage'
import { NotFoundPage } from '@/pages/client/NotFoundPage/NotFoundPage'

/*
AppRoutes:
Define todas las rutas del proyecto.
- BrowserRouter: gestiona la navegación.
- Suspense: muestra un fallback mientras se cargan componentes lazy si los hubiera.
*/
export const AppRoutes = () => {
    return (    
        <Suspense fallback={<div>Cargando…</div>}>
            <ScrollToTop />
            <Routes>            
                {/* =======================================================
                    1) RUTAS PÚBLICAS (NavbarClient + Footer)
                ======================================================= */}
                <Route element={<MainLayoutClient/>}>                    
                    <Route path="/" element={<HomePage />} />
                    <Route path="/flavors" element={<FlavorsPage />} />
                    <Route path="/flavors/:_id" element={<FlavorDetailsPage />} />
                    <Route path="/locations" element={<LocationsPage />} />
                </Route>

                {/* =======================================================
                    2) LOGIN ADMIN (PÚBLICO)
                    - NO lleva MainLayoutAdmin
                ======================================================= */}
                <Route path="/admin" element={<AdminLoginPage />} />

                {/* =======================================================
                    3) RUTAS ADMIN PRIVADAS (PROTEGIDAS)
                    - AdminGuard controla si hay login
                    - Si pasa, se aplica MainLayoutAdmin (NavbarAdmin)
                ======================================================= */}
                <Route element={<AdminGuard />}>
                <Route element={<MainLayoutAdmin />}>
                    <Route path="/admin/flavors" element={<AdminFlavorsPage />} />
                    <Route path="/admin/flavors/new" element={<AdminAddCookiePage />} />
                    <Route
                    path="/admin/flavors/edit/:_id"
                    element={<AdminEditCookiePage />}
                    />
                </Route>
                </Route>

                {/* =======================================================
                    4) ERROR 404 (ruta para redirigir por errores de API)
                ======================================================= */}
                <Route path="/404" element={<NotFoundPage />} />

                {/* =======================================================
                    5) ERROR 404 (para URLs que NO existen)
                ======================================================= */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    )
}
