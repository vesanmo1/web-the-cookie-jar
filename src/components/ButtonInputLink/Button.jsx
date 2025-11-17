import "./Button.css"

import React from "react"

function Button ( { variant , children , ...props } ) {
    return (
        <button className={ `btn btn--${variant}` }{ ...props }>
            {children}
        </button>
    )
}

export default Button