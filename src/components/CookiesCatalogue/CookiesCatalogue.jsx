import "./CookiesCatalogue.css"

import { useEffect, useState } from "react"

function CookiesCatalogue( {renderCookieChildren} ) {

    const [ cookies , setCookies ] = useState([])

    const requestCookies = async () => {
        console.clear()
        console.log(`Ejecutando requestCookies`)

        try {
            let options = {
                method  : `get`,
                headers : {
                    "secret-api-key" : "12345"
                }
            }

            const petition  = await fetch(`http://localhost:3000/cookies` , options )
            const answer      = await petition.json()
            setCookies( answer.data)
            
        } catch (error) {
            console.log( error )            
        }
    }

    useEffect( ()=>{
        requestCookies()
    } , [] )


    const COLOR_PATTERN = [
        "vanilla", "violet", "light-green", "vanilla",
        "light-blue", "light-green", "violet", "light-blue"
    ];

    return (
    <div>
        <section className="cookies-catalogue">
                { cookies?.length === 0 && <p className="cookies-catalogue__empty">Ups... No hay cookies disponibles. Estamos preparando la siguiente hornada. Vuelve pronto.</p>}
                { cookies?.map( (cookie, i) =>
                    <Cookie key={cookie._id} {...cookie} theme={COLOR_PATTERN[i % COLOR_PATTERN.length]}>                        
                        {renderCookieChildren ? renderCookieChildren(cookie) : null}
                    </Cookie>
                )}
        </section>
    </div>
    )
}

export default CookiesCatalogue

const Cookie = ( props ) => {
    const { cookie_name , image_png , image_webp , types , children , theme } = props
    return (
        <article className={`cookie cookie--${theme}`}>
            <ul className="cookie__types-container">
                {types.map( (type, index) => 
                    <Type key={index} type={type} />
                )}
            </ul>
            <div className="cookie__info-container">
            <div className="cookie__image-container">
                <picture className="cookie__image">
                    <source srcSet={image_webp} type="image/webp" />
                    <img src={image_png} alt={`Imagen de la galleta: ${cookie_name}`} />
                </picture>
                {/* fill por CSS según la clase cookie--{theme} */}
                <svg className="cookie__circle" viewBox="0 0 100 100" width="100%" preserveAspectRatio="xMidYMid meet">
                    <circle cx="50%" cy="50%" r="40%"/>
                </svg>
            </div>            
                <h2 className="cookie__name poppins-bold-uppercase">
                    {formatCookieName(cookie_name)}
                </h2>
                {children}
            </div>
        </article>
    )
}

const Type = ( props ) => {
    const {type} = props
    return (
        <li className="cookie__type">{type}</li>
    )
}

//HECHO CON CHATGPT para que siempre haya un salto de línea antes de la última palabra

const formatCookieName = (cookie_name) => {
  const words = cookie_name.split(" ");
  if (words.length < 2) return cookie_name; 

  const last = words.pop();          // última palabra (Cookie)
  const firstPart = words.join(" "); // "Apple Pie"

  return (
    <>
      {firstPart}
      <br />
      {last}
    </>
  );
};



                

                