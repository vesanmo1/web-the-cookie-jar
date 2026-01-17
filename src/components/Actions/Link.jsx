// ============================================================
// LINK COMPONENT (NavLink wrapper)
// Componente reutilizable para navegación interna con React Router.
// NO es un <button>: es un enlace (<a>) gestionado por React Router,
// pero con estilos de botón (clase "btn").
// Se encarga de:
// - Renderizar un <NavLink> para cambiar de ruta sin recargar la página
// - Aplicar estilos base de botón y permitir clases extra (className)
// - Pasar props adicionales a NavLink mediante ...rest (title, onClick, etc.)
// - Mostrar contenido dentro del enlace usando children
// ============================================================

// Importa los estilos CSS comunes para los botones/enlaces con apariencia de botón
import "./Actions.css"

// Importa NavLink para crear enlaces internos que navegan entre rutas sin recargar la página
// (React Router maneja el cambio de URL y la vista)
import { NavLink } from "react-router-dom"

// ------------------------------------------------------------
// Link
// Props:
// - to (string | object):
//      destino de la navegación (ruta interna). Equivale al "href" pero en React Router.
// - className (string):
//      clases extra para personalizar el estilo (por defecto "").
// - children (ReactNode):
//      contenido interno del link (texto, iconos, etc.).
// - ...rest (object):
//      props extra que se pasan a <NavLink> (end, target, rel, onClick, title, aria-*, etc.)
// ------------------------------------------------------------
export const Link = (props) => {

    const { to, className = "", children, ...rest } = props

    return (
        <NavLink className={`btn ${className}`.trim()} to={to} {...rest}>
            {children}
        </NavLink>
    )
}
