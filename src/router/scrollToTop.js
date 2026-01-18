// ============================================================
// USO DE CHATGPT
// ------------------------------------------------------------
// Función para asegurar que al cambiar de ruta la nueva página se abre arriba del todo,
// EXCEPTO cuando el cambio es de un detalle de sabor a otro detalle de sabor
// (/flavors/:id -> /flavors/:otroId), donde NO se hace scroll to top.
// ============================================================

// React:
// - useEffect: ejecutar lógica cuando cambie la ruta
// - useRef: guardar la ruta anterior entre renders sin provocar re-render
import { useEffect, useRef } from "react"

// React Router:
// - useLocation: da información sobre la ruta actual (pathname, search, etc.)
import { useLocation } from "react-router-dom"


// ============================================================
// ScrollToTop
//
// Componente sin UI (return null) que escucha cambios de pathname.
// - Por defecto: hace scroll arriba al navegar.
// - Excepción: si navegas entre detalles de sabor (/flavors/:id -> /flavors/:id),
//   mantiene la posición de scroll.
// ============================================================
export const ScrollToTop = () => {
    
    // Ubicación actual del router (incluye pathname)
    const location = useLocation()

    // Guardamos la ruta anterior para poder comparar en cada cambio
    // Se inicializa con el pathname actual la primera vez
    const prevPathRef = useRef(location.pathname)

    useEffect(() => { 

        // Ruta anterior (antes de este cambio)
        const prevPath = prevPathRef.current

        // Ruta actual (después del cambio)
        const currPath = location.pathname

        // true si la ruta es /flavors/:id (detalle de sabor)
        const isFlavorDetail = (path) => /^\/flavors\/[^/]+$/.test(path)

        const prevIsDetail = isFlavorDetail(prevPath)
        const currIsDetail = isFlavorDetail(currPath)

        // Si voy de un detalle a otro detalle, NO scrolleo arriba
        if (prevIsDetail && currIsDetail) {
            prevPathRef.current = currPath
            return
        }

        // En cualquier otro caso, sí hago scroll to top
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", 
        })

        // Guardamos la ruta actual como "previa" para la próxima vez que cambie
        prevPathRef.current = currPath

    }, [location.pathname])

    return null
}