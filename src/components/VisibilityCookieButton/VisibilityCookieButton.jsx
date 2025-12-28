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

// Componente botón
import { Button } from "@/components/ButtonLink/Button"

// ICONOS:
// Importa el componente SVG del botón "Visible"
import { VisibilityOnIcon } from "@/assets/svg/button-icons/VisibilityOnIcon"
// Importa el componente SVG del botón "Oculto"
import { VisibilityOffIcon } from "@/assets/svg/button-icons/VisibilityOffIcon"

export const VisibilityCookieButton = ( props ) => {
    //Recibimos "cookie" por props
    const { cookie } = props
    // Sacamos del Context la función que hace el PUT en el backend
    const { toggleCookieVisibility } = useContext(CookiesContext)
    // isVisible es true si la cookie está visible en la BBDD
    const isVisible = cookie.visible === true

    return (
        <Button
            // Si está visible => btn--black
            // Si está oculta  => btn--outline-black
            className={`circular-btn ${isVisible ? "btn--black" : "btn--outline-black"}`}
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