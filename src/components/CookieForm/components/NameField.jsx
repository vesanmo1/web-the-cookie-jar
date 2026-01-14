export function NameField(props) {

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
                placeholder="El nombre no puede superar los 25 caracteres. Ej: Lemon Cookie"
                maxLength={25}
                {...rest}
            />
        </div>
    )
}