// Importación del CSS que da estilos al componente
import "./CookiesCatalogue.css"
// React hooks para manejar estado y efectos
import { useEffect, useState } from "react"
// Función que devuelve una clase de color según el índice
import { themeClass } from "@/features/colorPattern"
// Función que asegura que haya un salto de línea antes de la última palabra
import { formatCookieName } from "@/features/formatCookieName"
// Componente Imagen que se usa dentro de cada tarjeta de cookie
import { CookieImage } from  "@/components/CookieImage/CookieImage"
// Componente que renderiza la categoría a la que pertenece la cookie (todas, vegana, sin gluten)
import { CookieType } from "@/components/CookieType/CookieType"

// Componente principal: muestra el catálogo de cookies
// Recibe:
// - renderCookieChildren: una función opcional para pintar contenido dentro de cada cookie
// - filter: el filtro activo (Todas, Vegana, Sin gluten)
export const CookiesCatalogue = ( {renderCookieChildren, filter} ) => {

    // Estado donde guardamos todas las cookies recibidas del backend    
    const [ cookies , setCookies ] = useState([])

    // Función que hace la petición al servidor para obtener las cookies
    const requestCookies = async () => {
        console.clear()
        console.log(`Ejecutando requestCookies con filtro: ${filter}`)

        try {
            let options = {
                method  : `get`,
                headers : {
                    "secret-api-key" : "12345"
                }
            }

            // Decidimos endpoint según el filtro
            let url = "http://localhost:3000/cookies"

            if (filter === "vegana") {
                url = "http://localhost:3000/cookies/type/vegana"
            } else if (filter === "sin-gluten") {
                url = "http://localhost:3000/cookies/type/sin-gluten"
            }

            // Llamada a la API local
            const petition  = await fetch( url , options )
            const answer    = await petition.json()

            // Guardamos el array de cookies en el estado
            setCookies( answer.data )
            
        } catch (error) {
            console.log( error )            
        }
    }

    // useEffect se ejecuta cada vez que cambia "filter"
    // Aquí hacemos la petición al backend
    useEffect( () => {
        requestCookies()
    } , [ filter ] )

    // El servidor devuelve la lista filtrada
    const cookiesToRender = cookies


    // Render del componente
    return (    
        <section className="cookies-catalogue">
            { cookiesToRender.length === 0 && (
                <p className="cookies-catalogue__empty">
                    Ups... No hay cookies disponibles con este filtro.
                </p>
            )}

            { cookiesToRender.length !== 0 && cookiesToRender.map((cookie, index) =>
                <Cookie key={cookie._id} {...cookie} themeClass={themeClass(index)}>                        
                    {renderCookieChildren ? renderCookieChildren(cookie , index) : null}
                </Cookie>
            )}
        </section>   
    )
}

// Componente que renderiza una cookie individual
const Cookie = ( props ) => {
    const { cookie_name , image_png , image_webp , types , children , themeClass } = props
    return (
        <article className={`cookie cookie--${themeClass}`}>
            <ul className="cookie__types-container">
                {types.map((type, index) => (
                    <CookieType key={index} type={type} />
                ))}
            </ul>
            <div className="cookie__info-container">
                <CookieImage
                    image_webp={image_webp}
                    image_png={image_png}
                    cookie_name={cookie_name}
                />            
                <h2 className="cookie__name poppins-bold-uppercase">
                    {formatCookieName(cookie_name)}
                </h2>
                {children}
            </div>
        </article>
    )
}







                

                