// ============================================================
// BUTTON COMPONENT
// Componente reutilizable para botones con estilos comunes.
// Se encarga de:
// - Renderizar un <button> con la clase base "btn"
// - Permitir inyectar variantes visuales mediante className
// - Definir un type por defecto ("button") para evitar submits accidentales
// - Pasar props extra al botón mediante ...rest (onClick, disabled, aria-*, etc.)
// ============================================================

// Importa los estilos específicos/comunes del componente (clase base "btn", variantes, etc.)
import "./Actions.css"

// ------------------------------------------------------------
// Button
// Props:
// - className (string):
//      clases extra para estilos/variantes (por ejemplo "btn--primary", "btn--outline-dark").
//      por defecto "".
// - children (ReactNode):
//      contenido del botón (texto, iconos, etc.).
// - type ("button" | "submit" | "reset"):
//      tipo del botón. por defecto "button" para no enviar formularios sin querer.
// - ...rest (object):
//      props adicionales que se pasan al <button> (onClick, disabled, name, value, aria-*, data-*, etc.)
// ------------------------------------------------------------
export const Button = (props) => {

    const { className = "", children, type = "button", ...rest } = props

    return (
        <button className={ `btn ${className}`.trim() } type={type} { ...rest }>
            { children }
        </button>
    )
}
