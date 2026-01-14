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
                placeholder="Max. 25 caracteres."
                maxLength={25}
                autoComplete="off"
                {...rest}
            />
        </div>
    )
}