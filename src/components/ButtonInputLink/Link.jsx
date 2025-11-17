import "./Button.css"

function Link ( { variant = "" , className = "" , children , href } ) {
    return (
        <a className={ `btn ${variant} ${className}`.trim() } href={href} >
            {children}
        </a>
    )
}

export default Link