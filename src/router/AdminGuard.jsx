// ============================================================
// ADMIN GUARD (PROTECTOR DE RUTAS)
// ------------------------------------------------------------
// Función:
// 1) Proteger rutas privadas de administración (/admin/*)
// 2) Si NO hay "login" en localStorage => redirige a /admin (login)
// 3) Si SÍ hay "login" => permite renderizar la ruta hija protegida
//
// EXTRA (REPLACE):
// - Usamos navigate("/admin", { replace: true }) para que la ruta privada
//   NO se quede en el historial del navegador.
// - Así, al pulsar "atrás", el usuario NO vuelve a la página privada.
//
// Cómo se usa en AppRoutes:
// <Route element={<AdminGuard />}>
//    <Route element={<MainLayoutAdmin />}>
//        ...rutas privadas aquí dentro...
//    </Route>
// </Route>
// ============================================================

import { Navigate, Outlet } from "react-router-dom"

export const AdminGuard = () => {

    const isLogged = Boolean(localStorage.getItem("login"))
    return isLogged ? <Outlet /> : <Navigate to="/admin" replace />
    
}