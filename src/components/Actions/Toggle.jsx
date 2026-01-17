import "./Actions.css"

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

    const isControlled = checked !== undefined

    return (
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