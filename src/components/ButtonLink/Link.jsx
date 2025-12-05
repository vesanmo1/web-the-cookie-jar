// Importa los estilos CSS comunes para los botones/enlaces con apariencia de botón
import "./Button.css"

// Componente Link reutilizable
// No es un <button>, es un <a> con estilos de botón.
// Props:
// - variant: clases extra para el estilo (por ejemplo "btn--outline-dark", "btn--primary", etc.)
// - children: el contenido que se renderiza dentro (texto, iconos...)
// - href: la URL a la que apunta el enlace
function Link ( { variant , children , href } ) {
    return (
        <a className={ `btn ${variant}`.trim() } href={href} >
            {children}
        </a>
    )
}

export default Link