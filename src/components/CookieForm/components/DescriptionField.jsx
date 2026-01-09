export function DescriptionField() {
    return (
        <div className="cookie-form__field">
            <label className="cookie-form__label" htmlFor="cookie-description">
            DESCRIPCIÓN
            </label>

            <textarea
            id="cookie-description"
            className="cookie-form__textarea"
            name="description"
            placeholder="Añade una breve descripción"
            maxLength={400}
            />
        </div>
    );
}