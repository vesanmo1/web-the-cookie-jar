// Importa los estilos CSS comunes para los botones/enlaces con apariencia de botón
import "./Button.css"
// Importa NavLink para crear enlaces internos que navegan entre rutas sin recargar la página
import { NavLink } from "react-router-dom"
// Componente Link reutilizable
// No es un <button>, es un <a> con estilos de botón.
// Props:
// - variant: clases extra para el estilo (por ejemplo "btn--outline-dark", "btn--primary", etc.)
// - children: el contenido que se renderiza dentro (texto, iconos...)
// - href: la URL a la que apunta el enlace
function Link ( { variant , children , route } ) {
    return (
        <NavLink className={ `btn ${variant}`.trim() } to={route} >
            {children}
        </NavLink>
    )
}

export default Link