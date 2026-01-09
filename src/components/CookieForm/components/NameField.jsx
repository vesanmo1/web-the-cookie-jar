export function NameField() {
    return (
        <input
            className="cookie-form__name"
            type="text"
            name="cookie_name"
            placeholder="Nombre"
            maxLength={25}
        />
  );
}