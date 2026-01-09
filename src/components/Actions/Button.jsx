// Importa los estilos específicos del componente
import "./Actions.css"

// Componente Button reutilizable
// Recibe:
// - variant: clases extra para estilos (por ejemplo "btn--primary", "btn--outline-dark", etc.)
// - children: el contenido que va dentro del botón (texto, iconos, etc.)
// - ...props: cualquier otra prop que le pases (onClick, type, disabled, etc.)
export const Button = (props) => {

    const { className = "", children, type = "button", ...rest } = props
   
    return (
        <button className={ `btn ${className}`.trim() } type={type} { ...rest }>
            { children }
        </button>
    )
}
