// Importa los estilos CSS comunes para botones/enlaces/toggles con apariencia de botón
import "./Actions.css"

import { useState } from "react"

// Componente Toggle reutilizable (checkbox con aspecto de botón)
// Props:
// - name: name del input (para forms / postForm.current)
// - defaultChecked: estado inicial (true/false)
// - className: clases extra (pill-btn, solid-..., ghost-...)
// - children: texto/icono dentro del “botón”
// - ...rest: cualquier otra prop (disabled, id, etc.)
export const Toggle = ( { 
    name,
    className = "",
    children,
    defaultChecked = false,
    onChange,
    ...rest
}) => {

    const [ isChecked , setIsChecked ] = useState(defaultChecked)

    const handleChange = ( e ) => {
        setIsChecked(e.target.checked)
        if ( onChange ) onChange(e)
    }

    return (
        <label className={`btn  ${className}`.trim()}>
            <input
                className="toggle__input"
                type="checkbox"
                name={name}
                defaultChecked={defaultChecked}
                onChange={handleChange}
                {...rest}
            />
                { typeof children === "function" ? children(isChecked) : children }
        </label>
    )
}