// Importa los estilos específicos del componente
import "./Button.css"

// Componente Button reutilizable
// Recibe:
// - variant: clases extra para estilos (por ejemplo "btn--primary", "btn--outline-dark", etc.)
// - children: el contenido que va dentro del botón (texto, iconos, etc.)
// - ...props: cualquier otra prop que le pases (onClick, type, disabled, etc.)
export const Button = ( { route, className = "", children, ...rest } ) => {
    return (
        <button className={`btn ${className}`.trim()} to={route} {...rest}>
            {children}
        </button>
    )
}
