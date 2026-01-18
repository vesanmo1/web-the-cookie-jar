// ============================================================
// MAIN ENTRY (React 18)
// ------------------------------------------------------------
// Punto de entrada de la aplicación.
// Se encarga de:
// 1) Importar el reset global de estilos (antes que el resto de CSS)
// 2) Montar el componente <App /> dentro del <div id="root"> del HTML
// 3) Activar <StrictMode> en desarrollo para detectar problemas comunes
// ============================================================


// React:
// - StrictMode: activa comprobaciones adicionales en desarrollo
//   (avisos de malas prácticas, renders duplicados intencionales, etc.)
import { StrictMode } from "react"

// React 18:
// - createRoot: nuevo método para montar la aplicación en el DOM
import { createRoot } from "react-dom/client"

// Reset global de estilos (se importa antes que el resto)
import "./styles/Reset.css"

// Componente raíz de la app
import App from "./App.jsx"


// ============================================================
// MONTAJE EN EL DOM
// Selecciona el <div id="root"> del HTML y renderiza la app dentro
// ============================================================
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
    )
