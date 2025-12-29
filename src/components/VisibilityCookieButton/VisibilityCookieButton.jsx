// ============================================================
// VISIBILITY BUTTON
// Botón para cambiar cookie.visible:
// - Si está visible => pasa a oculta
// - Si está oculta  => pasa a visible
// ============================================================

// HOOKS DE REACT:
// - useContext: para usar funciones del CookiesContext (peticiones y estado global)
import { useContext } from "react" 
// Importamos el contexto global de cookies
import { CookiesContext } from "@/context/CookiesContext"
// Función utilitaria: devuelve una clase de color según el índice (patrón visual)
import { themeClassLight } from "@/features/colorPattern"

// Componente botón
import { Button } from "@/components/ButtonLink/Button"

// ICONOS:
// Importa el componente SVG del botón "Visible"
import { VisibilityOnIcon } from "@/assets/svg/button-icons/VisibilityOnIcon"
// Importa el componente SVG del botón "Oculto"
import { VisibilityOffIcon } from "@/assets/svg/button-icons/VisibilityOffIcon"

export const VisibilityCookieButton = ( props ) => {
    //Recibimos "cookie" por props
    const { cookie , index } = props
    // Sacamos del Context la función que hace el PUT en el backend
    const { toggleCookieVisibility } = useContext(CookiesContext)
    // isVisible es true si la cookie está visible en la BBDD
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