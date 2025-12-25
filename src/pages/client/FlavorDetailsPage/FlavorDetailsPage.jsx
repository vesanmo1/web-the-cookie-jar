// Importación de los estilos específicos de la página
import "./FlavorDetailsPage.css"
// Hooks de React:
// - useState: guardar datos en estado (cookie actual, ids anterior/siguiente...)
// - useEffect: ejecutar código cuando cambia algo (por ejemplo el _id de la URL)
// - useContext: leer datos del Context global (cookies y requestCookies)
import { useEffect, useContext, useState } from "react"
// Importación de useParams para leer el _id que viene en la URL (/flavors/:_id)
import { useParams } from "react-router-dom"
// Importamos el contexto global de cookies
import { CookiesContext } from "@/context/CookiesContext"
// Función que devuelve una clase de color según el índice
import { themeClass } from "@/features/colorPattern"
// Función que asegura que haya un salto de línea antes de la última palabra
import { formatCookieName } from "@/features/formatCookieName"
//Componente Imagen que se usa dentro de cada tarjeta de cookie
import { CookieImage } from  "@/components/CookieImage/CookieImage"
// Componente botón/enlace que se usa para pasar a la siguiente cookie (o anterior)
import { Link } from "@/components/ButtonLink/Link"
// Componente que renderiza la categoría a la que pertenece la cookie (todas, vegana, sin gluten)
import { CookieType } from "@/components/CookieType/CookieType"
// Importa el componente SVG flecha izquierda
import { ArrowLeftIcon } from '@/assets/svg/button-icons/ArrowLeftIcon'
// Importa el componente SVG flecha derecha
import { ArrowRightIcon } from '@/assets/svg/button-icons/ArrowRightIcon'

export const FlavorDetailsPage = () => {
    // Leemos el id de la cookie desde la URL
    // Ejemplo: /flavors/123 -> _id = "123"
    const { _id } = useParams()    

    // Del Context obtenemos:
    // - cookies: array de cookies (estado global)
    // - requestCookies: función que pide las cookies al backend y actualiza el Context
    const { cookies, requestCookies } = useContext(CookiesContext)

    // Guardamos la cookie que coincide con el _id de la URL 
    const [ cookie , setCookie ] = useState(null)
    // Guardamos el índice donde está esa cookie dentro del array
    const [cookieIndex, setCookieIndex] = useState(null)

    // USO DE CHATGPT PARA LOS BOTONES DE ANTERIOR Y SIGUIENTE
    // Guardamos el id de la cookie anterior y siguiente (para los botones)
    const [prevId, setPrevId] = useState(null)
    const [nextId, setNextId] = useState(null)

    // Función que:
    // 1) pide las cookies al backend (vía Context)
    // 2) busca la cookie que coincide con el _id
    // 3) calcula anterior/siguiente para navegación circular
    const getCookie = async () => {
        console.clear()
        console.log(`Ejecutando getCookie`)

        try {
            // Llamamos a requestCookies en el CookiesContext
            const answer = await requestCookies()
            const cookiesArray = answer.data

            // Buscamos el índice de la cookie cuyo _id coincide con el de la URL
            const index = cookiesArray.findIndex((cookie) => cookie._id === _id)

            // Guardamos la cookie actual
            const currentCookie = cookiesArray[index]
            setCookie(currentCookie)

            // Guardamos el índice actual
            setCookieIndex(index)

            // USO DE CHATGPT PARA LOS BOTONES DE ANTERIOR Y SIGUIENTE
            // NAVEGACIÓN CIRCULAR (anterior/siguiente)
            // total = número total de cookies
            const total = cookiesArray.length

            // índice de la anterior (si está en 0, salta a la última)
            const prevIndex = (index - 1 + total) % total
            // índice de la siguiente (si está en la última, salta a la primera)
            const nextIndex = (index + 1) % total

            // Guardamos los ids de la cookie anterior y la siguiente (para construir las rutas)
            setPrevId(cookiesArray[prevIndex]._id)
            setNextId(cookiesArray[nextIndex]._id)
            
        } catch (error) {
            console.log( error )            
        }
    }

    // Este efecto se ejecuta:
    // - al entrar por primera vez a la página
    // - cada vez que cambie el _id de la URL (cuando navegas a otra cookie)
    useEffect( () => {
        getCookie()
    } , [_id] )

    return (
        <>
            {cookie && (
                <Cookie
                    {...cookie}
                    index={cookieIndex}
                    prevId={prevId}
                    nextId={nextId}
                />
            )}
        </>
    )
}

const Cookie = ( props ) => {
    const { index , image_webp , image_png , types , cookie_name , description , prevId , nextId } = props
    return (         
        <article className={`cookie-details cookie--${themeClass(index)}`}> 
            <div className="cookie-details__container max-width-1920">
                <div className="cookie-details__image">
                    <CookieImage
                        image_webp={image_webp}
                        image_png={image_png}
                        cookie_name={cookie_name}
                    /> 
                </div>
                <div className="cookie-details__content">                      
                    <ul className="cookie-details__types-container">
                        {types.map((type, index) => (
                            <CookieType key={index} type={type} />
                        ))}
                    </ul>  
                    <h2 className="cookie-details__title poppins-bold-uppercase">
                        {formatCookieName(cookie_name)}
                    </h2>   
                    <p className="cookie-details__description">{description}</p>                 
                </div>                   
            </div> 
            <nav className="cookie-details__nav max-width-1920">
                {prevId && (
                    <Link className="pill-btn  btn--outline-black  cookie-details__btn" route={`/flavors/${prevId}`}>
                        <ArrowLeftIcon aria-hidden="true" />
                        <span>Anterior</span>
                    </Link>
                )}
                {nextId && (
                    <Link className="pill-btn  btn--outline-black  cookie-details__btn" route={`/flavors/${nextId}`}>
                        <span>Siguiente</span>
                        <ArrowRightIcon aria-hidden="true" />                        
                    </Link>
                )}
            </nav>                                       
        </article>
    )
}
