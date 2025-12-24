// Importación del CSS que da estilos al componente
import "./CookiesCatalogue.css"
// Hooks de React:
// - useEffect: para ejecutar código cuando cambia algo (por ejemplo el filtro)
// - useContext: para leer datos/funciones del Context
import { useEffect, useContext } from "react"
// Importamos el contexto global de cookies
import { CookiesContext } from "@/context/CookiesContext"
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

    // Las cookies viven en el CookiesContext (estado global).
    // Aquí "leemos" del Context:
    const { cookies, requestCookies } = useContext(CookiesContext)

    // La petición la hace requestCookies (que está en el Context).
    // Cada vez que cambia "filter", pedimos las cookies con ese filtro:
    useEffect(() => {
        requestCookies(filter) 
    }, [filter])

    // Usamos directamente "cookies" del Context
    const cookiesToRender = cookies


    // Render del componente
    return (    
        <section className="cookies-catalogue">
            { cookiesToRender.length === 0 && (
                <p className="cookies-catalogue__empty">
                    Cargando...
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







                

                