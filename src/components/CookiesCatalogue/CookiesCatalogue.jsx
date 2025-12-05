// Importación del CSS que da estilos al componente
import "./CookiesCatalogue.css"
// React hooks para manejar estado y efectos
import { useEffect, useState } from "react"
// Función que devuelve una clase de color según el índice
import { themeClass } from "@/features/colorPatternLight"

// Componente principal: muestra el catálogo de cookies
// Recibe:
// - renderCookieChildren: una función opcional para pintar contenido dentro de cada cookie
// - filter: el filtro activo (Todas, Vegana, Sin gluten)
function CookiesCatalogue( {renderCookieChildren, filter} ) {

    // Estado donde guardamos todas las cookies recibidas del backend    
    const [ cookies , setCookies ] = useState([])

    // Función que hace la petición al servidor para obtener las cookies
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

            // Llamada a la API local
            const petition  = await fetch(`http://localhost:3000/cookies` , options )
            const answer      = await petition.json()

            // Guardamos el array de cookies en el estado
            setCookies( answer.data)
            
        } catch (error) {
            console.log( error )            
        }
    }

    // useEffect se ejecuta solo una vez al montar el componente
    // Aquí hacemos la petición al backend
    useEffect( () => {
        requestCookies()
    } , [] )

    // FILTRO DE COOKIES
    // Si el filtro es "Todas", devolvemos todas
    // Si no, filtramos por si el tipo incluye el filtro (Vegana, Sin gluten)
    const filteredCookies = cookies.filter(cookie => {
        if (filter === "Todas") {
            return true
        } else {
            return cookie.types.includes(filter)
        }
    })

    // Render del componente
    return (    
        <section className="cookies-catalogue">
            { filteredCookies.length === 0 && (
                <p className="cookies-catalogue__empty">
                    Ups... No hay cookies disponibles con este filtro.
                </p>
            )}

            { filteredCookies.map((cookie, i) =>
                <Cookie key={cookie._id} {...cookie} themeClass={themeClass(i)}>                        
                    {renderCookieChildren ? renderCookieChildren(cookie , i) : null}
                </Cookie>
            )}
        </section>   
    )
}

export default CookiesCatalogue

// Componente que renderiza una cookie individual
const Cookie = ( props ) => {
    const { cookie_name , image_png , image_webp , types , children , themeClass } = props
    return (
        <article className={`cookie cookie--${themeClass}`}>
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

// Renderiza un tipo individual (vegana, sin gluten, etc.)
const Type = ( props ) => {
    const {type} = props
    return (
        <li className="cookie__type">{type}</li>
    )
}

//HECHO CON CHATGPT 
// Divide el nombre y coloca un salto de línea antes de la última palabra
// Ej: "Apple Pie Cookie" → "Apple Pie" + salto + "Cookie"
const formatCookieName = (cookie_name) => {
  const words = cookie_name.split(" ")
  if (words.length < 2) return cookie_name

  const last = words.pop()           // última palabra (Cookie)
  const firstPart = words.join(" ")  // "Apple Pie"

  return (
    <>
      {firstPart}
      <br />
      {last}
    </>
  )
}



                

                