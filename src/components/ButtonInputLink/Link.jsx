import "./Button.css"

function Link ( { variant , children , href } ) {
    return (
        <a className={ `btn ${variant}`.trim() } href={href} >
            {children}
        </a>
    )
}

export default Link