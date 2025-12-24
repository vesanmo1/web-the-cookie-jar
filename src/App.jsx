// Importación los estilos globales de la aplicación
import "./styles/Globals.css"
// Importación del contexto global
import { CookiesProvider } from "./context/CookiesContext"
// BrowserRouter define el router principal basado en historial del navegador.
import { BrowserRouter } from 'react-router-dom'
// Importación el componente que define todas las rutas de la app
import { AppRoutes } from './router/AppRoutes'

// Componente raíz de la aplicación
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
