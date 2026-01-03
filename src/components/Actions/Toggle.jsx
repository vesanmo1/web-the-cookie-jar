import "./Actions.css"

export const Toggle = ({ name, className = "", children, defaultChecked, onChange, ...rest }) => {
    return (
        <label className={`btn ${className}`.trim()}>
            <input
                className="toggle__input"
                type="checkbox"
                name={name}
                defaultChecked={defaultChecked}
                onChange={onChange}
                {...rest}
            />
                {children}
        </label>
    )
}