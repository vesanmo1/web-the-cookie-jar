// src/router/router.js
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

import HomePage from "@/pages/HomePage/HomePage";
import FlavorsPage from "@/pages/FlavorsPage/FlavorsPage";
import FlavorDetailsPage from "@/pages/FlavorDetailsPage/FlavorDetailsPage";
import LocationsPage from "@/pages/LocationsPage/LocationsPage";

import AdminLoginPage from "@/pages/admin/AdminLoginPage/AdminLoginPage";
import AdminFlavorsPage from "@/pages/admin/AdminFlavorsPage/AdminFlavorsPage";
import AdminAddCookiePage from "@/pages/admin/AdminAddCookiePage/AdminAddCookiePage";
import AdminEditCookiePage from "@/pages/admin/AdminEditCookiePage/AdminEditCookiePage";

import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,          // Layout con NavBar + Footer + <Outlet />
    // errorElement opcional si quieres que el 404 use también este layout
    children: [
      // público
      { path: "/", element: <HomePage /> },
      { path: "/flavors", element: <FlavorsPage /> },
      { path: "/flavors/:_id", element: <FlavorDetailsPage /> },
      { path: "/locations", element: <LocationsPage /> },

      // admin
      { path: "/admin/login", element: <AdminLoginPage /> },
      { path: "/admin/flavors", element: <AdminFlavorsPage /> },
      { path: "/admin/flavors/new", element: <AdminAddCookiePage /> },
      { path: "/admin/flavors/edit/:id", element: <AdminEditCookiePage /> },

      // 404
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;