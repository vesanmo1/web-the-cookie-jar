// ============================================================
// ADMIN GUARD (PROTECTOR DE RUTAS)
// ------------------------------------------------------------
// Función:
// 1) Proteger rutas privadas de administración (normalmente /admin/*)
// 2) Si NO hay "login" en localStorage => redirige a /admin
// 3) Si SÍ hay "login" => permite renderizar la ruta hija protegida (<Outlet />)
//
// EXTRA (REPLACE):
// - Usamos <Navigate ... replace /> para que la ruta privada
//   NO se quede en el historial del navegador.
// - Así, al pulsar "atrás", el usuario NO vuelve a la página privada.
//
// Cómo se usa en AppRoutes:
// <Route element={<AdminGuard />}>
//    ...rutas privadas aquí dentro...
// </Route>
// ============================================================

import { Navigate, Outlet } from "react-router-dom"

export const AdminGuard = () => {

    // login se guarda como string ("true") en localStorage desde el Context.
    // Si existe, consideramos que está logueado.
    const isLogged = Boolean(localStorage.getItem("login"))

    // Si está logueado -> renderiza la ruta hija.
    // Si no -> redirige a /admin (pantalla de login), sin dejar la ruta privada en el historial.
    return isLogged ? <Outlet /> : <Navigate to="/admin" replace />
    
}