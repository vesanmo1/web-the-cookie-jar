// ============================================================
// APP (ROOT COMPONENT)
//
// Punto de entrada principal de la aplicación.
// Se encarga de:
// 1) Cargar estilos globales
// 2) Envolver la app con el CookiesProvider (estado global + funciones de API)
// 3) Montar el BrowserRouter (navegación con React Router)
// 4) Renderizar AppRoutes (árbol completo de rutas)
// ============================================================


// Importación de los estilos globales de la aplicación
import "./styles/Globals.css"

// Context global de cookies (estado + CRUD + helpers compartidos)
import { CookiesProvider } from "@/context/CookiesContext"

// React Router:
// - BrowserRouter: router principal basado en el historial del navegador
import { BrowserRouter } from "react-router-dom"

// Componente que define todas las rutas de la app
import { AppRoutes } from "./router/AppRoutes"


// ============================================================
// App
//
// Componente raíz.
// Orden de envoltorios:
// - CookiesProvider: expone Context a toda la app
// - BrowserRouter: habilita rutas y navegación
// - AppRoutes: define qué páginas se renderizan según la URL
// ============================================================
function App() {

return (
    <CookiesProvider>
        <BrowserRouter>
            <AppRoutes/>
        </BrowserRouter>
    </CookiesProvider>
  )
}

export default App
