// ============================================================
// COOKIES CATALOGUE COMPONENT
// Componente reutilizable que pinta el listado de cookies.
// Se encarga de:
// - Pedir cookies al backend cuando cambia el filtro (via Context)
// - Filtrar cookies invisibles si hideInvisible = true
// - Renderizar cada cookie como una tarjeta <Cookie />
// - Permitir inyectar “contenido extra” dentro de cada cookie
//   mediante renderCookieChildren (por ejemplo botones de admin)
// ============================================================

// Importación del CSS que da estilos al componente
import "./CookiesCatalogue.css"

// HOOKS DE REACT:
// - useEffect: ejecutar acciones cuando cambian dependencias (filtro)
// - useContext: acceder al Context global de cookies
import { useEffect, useContext } from "react"
// Context global donde viven las cookies y las funciones para pedirlas
import { CookiesContext } from "@/context/CookiesContext"
// Función utilitaria: devuelve una clase de color según el índice (patrón visual)
import { themeClassLight } from "@/utils/colorPattern"
// Función utilitaria: formatea el nombre (salto de línea antes de la última palabra)
import { formatCookieName } from "@/utils/formatCookieName"
// Componente imagen (webp/png) para cada cookie
import { CookieImage } from  "@/components/CookieImage/CookieImage"
// Componente que renderiza la categoría a la que pertenece la cookie (todas, vegana, sin gluten)
import { CookieType } from "@/components/CookieType/CookieType"

// ------------------------------------------------------------
// CookiesCatalogue
// Props:
// - renderCookieChildren (function | undefined):
//      render prop opcional para pintar contenido extra dentro de cada cookie.
//      Ejemplo: botones de admin (visible/editar/borrar).
// - filter (string):
//      filtro activo para pedir cookies al backend (todas, vegana, sin-gluten).
// - hideInvisible (boolean):
//      si es true, oculta cookies con visible === false.
//      por defecto es false (se muestran todas).
// ------------------------------------------------------------
export const CookiesCatalogue = ( props ) => {

    const { renderCookieChildren, filter, hideInvisible = false } = props
    // Leemos del Context:
    // - cookies: array con las cookies en memoria global
    // - requestCookies: función que pide cookies al backend según el filtro
    const { cookies, requestCookies } = useContext(CookiesContext)

    // Efecto: cada vez que cambia el filtro, pedimos las cookies
    // correspondientes al backend.
    useEffect(() => {
        requestCookies(filter) 
    }, [filter])

    // Preparamos qué cookies se van a renderizar:
    //
    // - Si hideInvisible = true:
    //     mostramos SOLO las cookies “visibles”.
    //     Consideramos visible por defecto si el campo no existe.
    // - Si hideInvisible = false:
    //     renderizamos todas sin filtrar.
    //
    // Implementación:
    // - (c.visible ?? true):
    //     * si c.visible es null/undefined -> usamos true (visible por defecto)
    //     * si c.visible es true/false     -> se respeta ese valor
    // - Luego comparamos === true para quedarnos solo con las visibles.
    //   Resultado:
    //     * visible = true        -> se muestra
    //     * visible = false       -> se oculta
    //     * visible = undefined   -> se muestra (no viene el campo)
    //     * visible = null        -> se muestra (se trata como “no definido”)
    const cookiesToRender = hideInvisible
    ? cookies.filter(c => (c.visible ?? true) === true)
    : cookies


    // Render:
    // - Mientras llega la data mostramos "Cargando..."
    // - Si hay cookies, pintamos cada tarjeta con <Cookie />
    // - Dentro de cada cookie inyectamos renderCookieChildren si existe
    return (    
        <section className="cookies-catalogue">
            {/* Estado vacío mientras llega la data (o si no hay resultados) */}
            { cookiesToRender.length === 0 && (
                <p className="cookies-catalogue__empty">
                    Cargando...
                </p>
            )}
            {/* Listado de cookies */}
            { cookiesToRender.length !== 0 && cookiesToRender.map((cookie, index) =>
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
// Componente interno que renderiza una cookie individual.
// Recibe todas las props de la cookie (por spread) y:
// - themeClassLight: clase para el color/tema visual
// - children: contenido extra inyectado por el padre (render prop)
// ------------------------------------------------------------
const Cookie = ( props ) => {
    // Desestructuramos los datos que necesitamos para pintar la tarjeta
    const { cookie_name , image_png , image_webp , types , children , themeClassLight , visible } = props
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







                

                