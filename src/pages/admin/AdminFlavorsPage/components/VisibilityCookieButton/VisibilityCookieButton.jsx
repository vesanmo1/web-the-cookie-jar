

// HOOKS DE REACT:
// - useContext: para usar funciones del CookiesContext (peticiones y estado global)
import { useContext } from "react" 

// Importamos el contexto global de cookies
import { CookiesContext } from "@/context/CookiesContext"

// Función utilitaria: devuelve una clase de color según el índice (patrón visual)
import { themeClassLight } from "@/utils/colorPattern"

// Componente botón
import { Button } from "@/components/Actions/Button"

// ICONOS:
// - VisibilityOnIcon: estado visible
// - VisibilityOffIcon: estado oculto
import { VisibilityOnIcon } from "@/assets/svg/button-icons/VisibilityOnIcon"
import { VisibilityOffIcon } from "@/assets/svg/button-icons/VisibilityOffIcon"


// ============================================================
// VisibilityCookieButton
// Props:
// - cookie (object): cookie sobre la que actuamos (necesitamos _id y visible)
// - index (number): índice para patrón visual (themeClassLight)
// ============================================================
export const VisibilityCookieButton = ( props ) => {

    // Recibimos la cookie y el índice desde el padre
    const { cookie , index } = props

    // Del Context: función que actualiza solo el campo visible (PATCH)
    const { toggleCookieVisibility } = useContext(CookiesContext)

    // true si la cookie está marcada como visible en BBDD
    // (si viniera undefined, aquí se consideraría "no visible"; el modelo de datos
    // del resto de la app suele asumir que existe)
    const isVisible = cookie.visible === true

    return (
        <Button

            // Si está visible => solid-black--accent-${themeClassLight(index)}
            // Si está oculta  => ghost--accent-black
            className={`circular-btn ${isVisible ? `solid-black--accent-${themeClassLight(index)}` : "ghost--accent-black"}`}
            
            // Al hacer click enviamos el valor contrario:
            // si era true -> mandamos false
            // si era false -> mandamos true
            onClick={() => toggleCookieVisibility(cookie._id, !isVisible)}
        >

        {/* Cambiamos icono y texto según isVisible */}    
        {isVisible ? (
            <>
                <VisibilityOnIcon aria-hidden="true" />
                <span>Visible</span>
            </>
        ) : (
            <>
                <VisibilityOffIcon aria-hidden="true" />
                <span>Oculta</span>
            </>
        )}
        </Button>
    )
}