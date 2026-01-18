// ============================================================
// FLAVOR DETAILS PAGE
//
// Página pública de detalle de una cookie (/flavors/:_id).
// Se encarga de:
// 1) Leer el _id desde la URL
// 2) Pedir el listado de cookies al backend (vía requestCookies del Context)
// 3) Encontrar la cookie correspondiente al _id y guardarla en estado local
// 4) Calcular cookie anterior/siguiente para navegación circular
// 5) Si el _id no existe o hay error -> navegar a /404
// ============================================================


// Importación de los estilos específicos de la página
import "./FlavorDetailsPage.css" 

// Hooks de React:
// - useState: guardar datos en estado (cookie actual, índice, prev/next...)
// - useEffect: ejecutar código cuando cambia el _id de la URL
// - useContext: leer datos del Context global (requestCookies)
import { useEffect, useContext, useState } from "react"

// React Router:
// - useParams: leer el _id que viene en la URL (/flavors/:_id)
// - useNavigate: redirigir a /404 en caso de error o id inválido
import { useParams, useNavigate } from "react-router-dom"

// Context global de cookies (requestCookies)
import { CookiesContext } from "@/context/CookiesContext"

// Función que devuelve una clase de color según el índice
import { themeClassLight } from "@/utils/colorPattern"

// Función que asegura que haya un salto de línea antes de la última palabra
import { formatCookieName } from "@/utils/formatCookieName"

// Componente imagen de la cookie
import { CookieImage } from  "@/components/CookieImage/CookieImage"

// Link custom para navegar entre rutas sin recargar
import { Link } from "@/components/Actions/Link"

// Componente que renderiza la categoría/tipo (vegana, sin gluten, etc.)
import { CookieType } from "@/components/CookieType/CookieType"

// Iconos de navegación
import { ArrowLeftIcon } from "@/assets/svg/button-icons/ArrowLeftIcon"
import { ArrowRightIcon } from "@/assets/svg/button-icons/ArrowRightIcon"


// ============================================================
// FlavorDetailsPage
// ============================================================
export const FlavorDetailsPage = () => {

    // Leemos el id de la cookie desde la URL
    // Ejemplo: /flavors/123 -> _id = "123"
    const { _id } = useParams()    
    const navigate = useNavigate()

    // Del Context:
    // - requestCookies: pide al backend y devuelve la respuesta
    // Nota: "cookies" se importa pero aquí no se usa, porque se trabaja con answer.data
    const { cookies, requestCookies } = useContext(CookiesContext)

    // Guardamos la cookie que coincide con el _id de la URL 
    const [ cookie , setCookie ] = useState(null)

    // Guardamos el índice donde está esa cookie dentro del array
    const [cookieIndex, setCookieIndex] = useState(null)

    // USO DE CHATGPT PARA LOS BOTONES DE ANTERIOR Y SIGUIENTE
    // Guardamos el id de la cookie anterior y siguiente (para los botones)
    const [prevId, setPrevId] = useState(null)
    const [nextId, setNextId] = useState(null)

    // ============================================================
    // getCookie
    // 1) Pide las cookies al backend (requestCookies)
    // 2) Busca la cookie cuyo _id coincide con el de la URL
    // 3) Calcula anterior/siguiente para navegación circular
    // 4) Si no existe -> /404
    // ============================================================
    const getCookie = async () => {
        console.clear()
        console.log(`Ejecutando getCookie`)

        try {

            // Pedimos cookies al backend
            const answer = await requestCookies()
            const cookiesArray = answer.data

            // 1) Nos quedamos solo con visibles
            const visibleCookies = cookiesArray.filter(c => c.visible)

            // 2) Buscamos el id dentro del array visible
            const index = visibleCookies.findIndex(c => c._id === _id)

            // Si no existe (o es oculta) -> 404
            if (index === -1) {
                navigate("/404", { replace: true })
                return
            }

            // 3) Cookie actual (visible)
            const currentCookie = visibleCookies[index]
            setCookie(currentCookie)
            setCookieIndex(index) // OJO: ahora es índice dentro de visibles

            // 4) Prev/Next circular solo entre visibles
            const total = visibleCookies.length
            const prevIndex = (index - 1 + total) % total
            const nextIndex = (index + 1) % total

            setPrevId(visibleCookies[prevIndex]._id)
            setNextId(visibleCookies[nextIndex]._id)
            
        } catch (error) {
            console.log( error )      
            navigate("/404", { replace: true })      
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

// ============================================================
// Cookie (detalle)
// Componente interno que renderiza el detalle de UNA cookie,
// incluyendo la navegación a anterior/siguiente.
// ============================================================
const Cookie = ( props ) => {
    const { index , image_webp , image_png , types , cookie_name , description , prevId , nextId } = props
    return (         
        <article className={`cookie-details cookie--${themeClassLight(index)}`}> 
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
                    <Link className="pill-btn  ghost--accent-black  cookie-details__btn" to={`/flavors/${prevId}`}>
                        <ArrowLeftIcon aria-hidden="true" />
                        <span>Anterior</span>
                    </Link>
                )}
                {nextId && (
                    <Link className="pill-btn  ghost--accent-black  cookie-details__btn" to={`/flavors/${nextId}`}>
                        <span>Siguiente</span>
                        <ArrowRightIcon aria-hidden="true" />                        
                    </Link>
                )}
            </nav>                                       
        </article>
    )
}
