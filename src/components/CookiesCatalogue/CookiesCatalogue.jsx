// ============================================================ 
// COOKIES CATALOGUE COMPONENT 
//
// Componente reutilizable que pinta el listado de cookies.
// Se encarga de:
// - Pedir cookies al backend cuando cambia el filtro (via Context)
// - (Opcional) ocultar cookies invisibles si hideInvisible = true
// - Renderizar cada cookie como una tarjeta <Cookie />
// - Permitir meter “contenido extra” dentro de cada cookie
//   con renderCookieChildren (por ejemplo botones de admin)
// ============================================================

// Importación del CSS que da estilos al componente
import "./CookiesCatalogue.css"

// HOOKS DE REACT:
// - useEffect: ejecutar acciones cuando cambian dependencias (filtro)
// - useContext: acceder al Context global de cookies
import { useEffect, useContext } from "react"

// Context global donde viven las cookies y la función para pedirlas
import { CookiesContext } from "@/context/CookiesContext"

// Función utilitaria: devuelve una clase de color según el índice
import { themeClassLight } from "@/utils/colorPattern"

// Función utilitaria: formatea el nombre (salto de línea antes de la última palabra)
import { formatCookieName } from "@/utils/formatCookieName"

// Componente para mostrar la imagen de la cookie (optimiza formatos en Cloudinary)
import { CookieImage } from "@/components/CookieImage/CookieImage"

// Componente que pinta el tipo/categoría (vegana, sin gluten, etc.)
import { CookieType } from "@/components/CookieType/CookieType"

// ------------------------------------------------------------
// CookiesCatalogue
// Props:
// - renderCookieChildren (function | undefined):
//      función opcional para pintar contenido extra dentro de cada cookie.
//      Ejemplo: botones de admin (editar/borrar/visible).
// - filter (string):
//      filtro activo para pedir cookies al backend.
// - hideInvisible (boolean):
//      si es true, oculta cookies con visible === false.
//      por defecto es false (se muestran todas).
// ------------------------------------------------------------
export const CookiesCatalogue = ( props ) => {

    const { renderCookieChildren, filter, hideInvisible = false } = props

    // Leemos del Context:
    // - cookies: array con las cookies en memoria global
    // - cookiesLoaded: boolean para saber si ya terminó la carga
    // - requestCookies: función que pide cookies al backend según el filtro
    const { cookies, cookiesLoaded, requestCookies } = useContext(CookiesContext)

    // Efecto: cada vez que cambia el filtro, pedimos las cookies al backend
    useEffect(() => {
        requestCookies(filter) 
    }, [filter])

    // Decidimos qué cookies vamos a renderizar:
    // - Si hideInvisible = true:
    //     dejamos solo las cookies visibles.
    //     Si no existe el campo visible, asumimos que es visible (true).
    // - Si hideInvisible = false:
    //     renderizamos todas. (para la página admin donde a las cookies ocultas 
    //     les damos otros estilos pero las mantenemos visibles)
    const cookiesToRender = hideInvisible
    ? cookies.filter(c => (c.visible ?? true) === true)
    : cookies


    // Render:
    // - Mientras carga -> mostramos mensaje de “horno”
    // - Si ya cargó y no hay cookies -> mostramos mensaje vacío
    // - Si hay cookies -> pintamos <Cookie /> por cada una
    return (    
        <section className="cookies-catalogue">
            {/* Mientras se hace la petición */}
            {!cookiesLoaded && (
                <p className="cookies-catalogue__empty">
                    Un momento, estamos sacando la cookies del horno.
                </p>
            )}
            {/* Cuando ya terminó y no hay cookies (o hubo error) */}
            {cookiesLoaded && cookiesToRender.length === 0 && (
                <p className="cookies-catalogue__empty">
                    Ups... hoy el horno no ha sacado ninguna cookie.
                </p>
            )}
            {/* Listado de cookies */}
            {cookiesLoaded && cookiesToRender.length !== 0 && cookiesToRender.map((cookie, index) =>
                <Cookie key={cookie._id} {...cookie} themeClassLight={themeClassLight(index)}>  
                    {/* Contenido extra opcional (admin actions, etc.) */}                      
                    {renderCookieChildren ? renderCookieChildren(cookie , index) : null}
                </Cookie>
            )}
        </section>   
    )
}

// ------------------------------------------------------------
// Cookie
//
// Componente interno que renderiza UNA cookie.
// Recibe todas las props de la cookie (por spread) y además:
// - themeClassLight: clase para el color/tema visual
// - children: contenido extra que mete el padre (botones, etc.)
//
// Nota importante:
// - El componente puede marcarse como "hidden" con CSS si visible === false.
//   (Esto solo afecta al estilo; si hideInvisible=true, ni siquiera se renderiza.)
// ------------------------------------------------------------
const Cookie = ( props ) => {

    // Desestructuramos los datos que necesitamos para pintar la tarjeta
    const { cookie_name , image_png , image_webp , types , children , themeClassLight , visible } = props
    
    // Si visible viene como false, añadimos una clase para “oculta”.
    // Si visible no viene, asumimos true.
    const isHidden = (visible ?? true) === false
    
    return (
        <article className={`cookie cookie--${themeClassLight} ${isHidden ? "cookie--hidden" : ""}`}>
            {/* Tipos/Categorías (vegana, sin gluten, etc.) */}
            <ul className="cookie__types">
                {types.map((type, index) => (
                    <CookieType key={index} type={type} />
                ))}
            </ul>
            {/* Info principal: imagen + nombre + contenido extra */}
            <div className="cookie__body">

                <div className="cookie__main">
                    <CookieImage
                        image_webp={image_webp}
                        image_png={image_png}
                        cookie_name={cookie_name}
                    />            
                    <h2 className="cookie__name poppins-bold-uppercase">
                        {formatCookieName(cookie_name)}
                    </h2>
                </div>
                {/* Contenido extra (botones, etiquetas, etc.) */}
                {children}
            </div>
        </article>
    )
}