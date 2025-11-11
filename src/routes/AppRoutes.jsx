import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer/Footer'
import AdminAddCookiePage from '../pages/admin/AdminAddCookiePage'
import AdminEditCookiePage from '../pages/admin/AdminEditCookiePage'


import AdminFlavorsPage from '../pages/admin/AdminFlavorsPage'
import AdminLoginPage from '../pages/admin/AdminLoginPage'
import FlavorDetailsPage from'../pages/FlavorDetailsPage'
import FlavorsPage from '../pages/FlavorsPage'
import HomePage from '../pages/HomePage'
import LocationsPage from '../pages/LocationsPage'
import NotFoundPage from '../pages/NotFoundPage'

// Layout con NavBar y Footer
function MainLayout() {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
}

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
                    <Route path="/flavors/:slug" element={<FlavorDetailsPage />} />
                    <Route path="/locations" element={<LocationsPage />} />

                    {/* admin */}
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route path="/admin/flavors" element={<AdminFlavorsPage />} />
                    <Route path="/admin/flavors/new" element={<AdminAddCookiePage />} />
                    <Route path="/admin/flavors/edit/:id" element={<AdminEditCookiePage />} />
                </Route>

                {/* 404: sin layout (ni NavBar ni Footer) */}
                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </Suspense>
    </BrowserRouter>
);
}

export default AppRoutes