// ============================================================
// COOKIE TYPE
//
// Componente pequeño para mostrar un “tipo” de cookie.
// Ejemplos de tipo: "vegana", "sin gluten", etc.
//
// Qué hace:
// - Renderiza un <li> con la clase base "cookie__type"
// - Permite añadir clases extra con className
// ============================================================

// Importación de los estilos específicos del componente
import "./CookieType.css"

// ------------------------------------------------------------
// CookieType
// Props:
// - type (string):
//      texto que se muestra (ej: "vegana").
// - className (string):
//      clases extra opcionales para variar estilo (por defecto "").
// ------------------------------------------------------------
export const CookieType = ( props ) => {

    const { type , className = "" } = props
    
    return (
        <li className={ `cookie__type ${className}`.trim() }>{type}</li>
    )
}