// ============================================================
// DESCRIPTION FIELD
//
// Componente reutilizable para el campo "Description".
// Pinta:
// - Un <label> asociado al textarea
// - Un <textarea> con límite de caracteres
//
// Para qué sirve:
// - Reutilizar siempre el mismo bloque de “Descripción” en formularios
// - Permitir cambiar clases CSS desde fuera (por props)
// - Pasar props extra al textarea con ...rest (value, onChange, required, etc.)
// ============================================================
export function DescriptionField ( props ) {

    // Clases opcionales para personalizar el layout desde el padre:
    // - containerDescriptionClassName: clase del <div> contenedor
    // - labelDescriptionClassName: clase del <label>
    // - textareaDescriptionClassName: clase del <textarea>
    // - ...rest: props extra para el <textarea> (onChange, value, disabled, etc.)
    const {
        containerDescriptionClassName = "",
        labelDescriptionClassName = "",
        textareaDescriptionClassName = "",
        ...rest
    } = props

    return (
        <div className={containerDescriptionClassName}>
            <label className={labelDescriptionClassName} htmlFor="cookie-description">
                Description:
            </label>

            <textarea
                id="cookie-description"
                className={textareaDescriptionClassName}
                name="description"
                placeholder="Debe tener entre 350 y 400 caracteres."
                maxLength={400}
                {...rest}
            />
        </div>
    )
}