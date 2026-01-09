// Importa los estilos CSS comunes para los botones/enlaces con apariencia de botón
import "./Actions.css"
// Importa NavLink para crear enlaces internos que navegan entre rutas sin recargar la página
import { NavLink } from "react-router-dom"
// Componente Link reutilizable
// No es un <button>, es un <a> con estilos de botón.
// Props:
// - variant: clases extra para el estilo (por ejemplo "btn--outline-dark", "btn--primary", etc.)
// - children: el contenido que se renderiza dentro (texto, iconos...)
// - href: la URL a la que apunta el enlace
export const Link = (props) => {

    const { route, to, className = "", children, ...rest } = props

    return (
        <NavLink className={`btn ${className}`.trim()} to={route} {...rest}>
            {children}
        </NavLink>
    )
}
