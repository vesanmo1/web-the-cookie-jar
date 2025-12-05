// Suspense permite mostrar un fallback mientras React carga componentes de forma diferida.
import { Suspense } from 'react';
// BrowserRouter define el router principal basado en historial del navegador.
// Routes y Route definen las rutas.
// Outlet permite renderizar componentes hijos dentro de un layout.
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// Componentes globales (navbar y footer)
import NavBar from '@/components/NavBar/NavBar'
import Footer from '@/components/Footer/Footer'

// Páginas públicas y de administración
import AdminAddCookiePage from '@/pages/admin/AdminAddCookiePage/AdminAddCookiePage'
import AdminEditCookiePage from '@/pages/admin/AdminEditCookiePage/AdminEditCookiePage'
import AdminFlavorsPage from '@/pages/admin/AdminFlavorsPage/AdminFlavorsPage'
import AdminLoginPage from '@/pages/admin/AdminLoginPage/AdminLoginPage'
import FlavorDetailsPage from'@/pages/FlavorDetailsPage/FlavorDetailsPage'
import FlavorsPage from '@/pages/FlavorsPage/FlavorsPage'
import HomePage from '@/pages/HomePage/HomePage'
import LocationsPage from '@/pages/LocationsPage/LocationsPage'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage'

/*  
    MainLayout:
    Este layout envuelve todas las rutas que deben mostrar NavBar y Footer.
    <Outlet /> marca el lugar donde se renderizará la página correspondiente a la ruta.
*/
function MainLayout() {
    return (
        <>
            <NavBar />
                <Outlet />      {/* Aquí se insertan las páginas hijas */}
            <Footer />
        </>
    );
}   

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