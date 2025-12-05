// StrictMode activa comprobaciones adicionales en desarrollo:
// avisos de malas prácticas, renderizaciones duplicadas intencionadas, etc.
import { StrictMode } from 'react'
// createRoot es el nuevo método de React 18 para montar la aplicación en el DOM
import { createRoot } from 'react-dom/client'
// Importamos el reset global de estilos (antes que todo lo demás)
import "./styles/Reset.css"
// Importamos el componente raíz de la app
import App from './App.jsx'

// Selecciona el elemento <div id="root"> del HTML y monta la aplicación dentro
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
    )
