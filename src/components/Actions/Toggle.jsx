// ============================================================
// TOGGLE COMPONENT
// Componente reutilizable tipo "switch/checkbox".
// Se encarga de:
// - Renderizar un <input type="checkbox"> envuelto en un <label>
// - Soportar modo CONTROLADO (checked) y NO CONTROLADO (defaultChecked)
// - Permitir pasar props extra al input mediante ...rest
// - Mostrar contenido adicional (texto/íconos) mediante children
// ============================================================

// Importación del CSS que da estilos al componente (botón/estados/animación)
import "./Actions.css"

// ------------------------------------------------------------
// Toggle
// Props:
// - name (string | undefined):
//      atributo name del checkbox (útil en formularios).
// - className (string):
//      clases extra para personalizar el wrapper <label>.
//      por defecto "".
// - children (ReactNode):
//      contenido que se pinta al lado del toggle (texto, icono, etc.).
// - checked (boolean | undefined):
//      si viene definido, el componente funciona en modo CONTROLADO.
//      el estado lo gestiona el padre.
// - defaultChecked (boolean | undefined):
//      valor inicial si el componente es NO CONTROLADO.
//      solo se usa cuando checked NO está definido.
// - onChange (function | undefined):
//      callback cuando cambia el checkbox.
// - ...rest (object):
//      props extra que se pasan al <input> (id, disabled, aria-*, data-*, etc.)
// ------------------------------------------------------------

export const Toggle = (props) => {

    const {
        name,
        className = "",
        children,
        checked,
        defaultChecked,
        onChange,
        ...rest
    } = props

    // Determina si el componente es CONTROLADO (RECOMENDACIÓN DE CHATGPT PARA EVITAR ERRORES)
    // - CONTROLADO: checked viene definido -> React manda el valor desde el padre
    // - NO CONTROLADO: checked es undefined -> el input mantiene su estado interno
    const isControlled = checked !== undefined

    return (

        // Usamos <label> para que al hacer click en cualquier parte
        // (incluido children) se active/desactive el checkbox.
        <label className={`btn ${className}`.trim()}>
            <input
                className="toggle__input"
                type="checkbox"
                name={name}
                checked={isControlled ? checked : undefined}
                defaultChecked={!isControlled ? defaultChecked : undefined}
                onChange={onChange}
                {...rest}
            />
                {children}
        </label>
    )
}