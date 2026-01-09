export function NameField ( props ) {

    const { className = "", ...rest } = props;

    return (
        <input
            className="cookie-form__name"
            type="text"
            name="cookie_name"
            placeholder="Nombre"
            maxLength={25}
            {...rest}
        />
  )
}