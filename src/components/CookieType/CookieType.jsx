// Importación de los estilos específicos del componente
import "./CookieType.css"

// Renderiza la categoría a la que pertenece la cookie (vegana, sin gluten, etc.)
export const CookieType = ( props ) => {

    const { type , className = "" } = props
    
    return (
        <li className={ `cookie__type ${className}`.trim() }>{type}</li>
    )
}