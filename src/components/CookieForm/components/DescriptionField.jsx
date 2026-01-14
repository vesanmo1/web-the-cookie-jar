export function DescriptionField ( props ) {

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
            placeholder="La descripción debe tener entre 350 y 400 caracteres"
            maxLength={400}
            {...rest}
            />
        </div>
    )
}