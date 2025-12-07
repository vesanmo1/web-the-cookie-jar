// Suspense permite mostrar un fallback mientras React carga componentes de forma diferida.
import { Suspense } from 'react';
// BrowserRouter define el router principal basado en historial del navegador.
// Routes y Route definen las rutas.
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Importa el layout principal que envuelve NavBar + Footer + página
import MainLayout from '@/layouts/MainLayout';

// Páginas de administración
import AdminAddCookiePage from '@/pages/admin/AdminAddCookiePage/AdminAddCookiePage'
import AdminEditCookiePage from '@/pages/admin/AdminEditCookiePage/AdminEditCookiePage'
import AdminFlavorsPage from '@/pages/admin/AdminFlavorsPage/AdminFlavorsPage'
import AdminLoginPage from '@/pages/admin/AdminLoginPage/AdminLoginPage'
// Páginas públicas
import FlavorDetailsPage from'@/pages/FlavorDetailsPage/FlavorDetailsPage'
import FlavorsPage from '@/pages/FlavorsPage/FlavorsPage'
import HomePage from '@/pages/HomePage/HomePage'
import LocationsPage from '@/pages/LocationsPage/LocationsPage'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage'

/*
AppRoutes:
Define todas las rutas del proyecto.
- BrowserRouter: gestiona la navegación.
- Suspense: muestra un fallback mientras se cargan componentes lazy si los hubiera.
*/
function  AppRoutes() {
return (
    <BrowserRouter>
        <Suspense fallback={<div>Cargando…</div>}>
            <Routes>

                {/* Rutas que SÍ muestran NavBar y Footer */}
                <Route element={<MainLayout />}>
                    {/* público */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/flavors" element={<FlavorsPage />} />
                    <Route path="/flavors/:_id" element={<FlavorDetailsPage />} />
                    <Route path="/locations" element={<LocationsPage />} />

                    {/* admin */}
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route path="/admin/flavors" element={<AdminFlavorsPage />} />
                    <Route path="/admin/flavors/new" element={<AdminAddCookiePage />} />
                    <Route path="/admin/flavors/edit/:id" element={<AdminEditCookiePage />} />
                </Route>

                {/* 404: sin layout (ni NavBar ni Footer) */}
                {/* Ruta comodín "*" para capturar cualquier URL no definida */}
                <Route path="*"element={<NotFoundPage />}/>

            </Routes>
        </Suspense>
    </BrowserRouter>
);
}

export default AppRoutes