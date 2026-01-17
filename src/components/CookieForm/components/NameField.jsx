// ============================================================
// NAME FIELD
//
// Componente reutilizable para el campo "Nombre" de la cookie.
// Pinta:
// - Un <label> asociado al input
// - Un <input type="text"> con límite de caracteres
//
// Qué hace:
// - Reutiliza siempre el mismo bloque de “Nombre” en formularios
// - Permite pasar clases CSS desde fuera (por props)
// - Permite pasar props extra al input con ...rest (value, onChange, required, etc.)
// ============================================================
export function NameField(props) {

    // Clases opcionales para personalizar el campo desde el padre:
    // - containerNameClassName: clase del <div> contenedor
    // - labelNameClassName: clase del <label>
    // - inputNameClassName: clase del <input>
    // - ...rest: props extra para el <input> (onChange, value, disabled, etc.)
    const {
        containerNameClassName = "",
        labelNameClassName = "",
        inputNameClassName = "",
        ...rest
    } = props

    return (
        <div className={containerNameClassName}>
            <label className={labelNameClassName} htmlFor="cookie-name">
                Nombre:
            </label>

            <input
                id="cookie-name"
                className={inputNameClassName}
                type="text"
                name="cookie_name"
                placeholder="Max. 25 caracteres."
                maxLength={25}
                autoComplete="off"
                {...rest}
            />
        </div>
    )
}