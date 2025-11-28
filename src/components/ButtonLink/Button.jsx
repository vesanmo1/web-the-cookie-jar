import "./Button.css"

function Button ( { variant , children , ...props } ) {
    return (
        <button className={ `btn ${variant}`.trim() } { ...props }>
            {children}
        </button>
    )
}

export default Button