// ============================================================
// FLAVORS PAGE
// Página pública de “sabores” donde el usuario puede:
// - Ver el catálogo de cookies
// - Filtrar por tipo (todas / sin gluten / vegana)
// - Entrar al detalle de una cookie mediante un CTA por tarjeta
//
// Delegamos el fetch y el render del listado en <CookiesCatalogue />.
// ============================================================

// Importación de los estilos específicos de esta página
import "./FlavorsPage.css"
// HOOKS DE REACT:
// - useState: estado local para controlar el filtro seleccionado
import { useState } from "react"
// Componente que pinta el listado de cookies
import { CookiesCatalogue } from "@/components/CookiesCatalogue/CookiesCatalogue"
// Componente botón/enlace que se usa dentro de cada tarjeta de cookie
import { Link } from "@/components/ButtonLink/Link"
// Componente botón que se usa para filtrar por tipo de cookies ("Todas", "Sin gluten", "Veganas")
import { Button } from "@/components/ButtonLink/Button"
// Función utilitaria: devuelve una clase de tema de color según el índice (patrón visual)
import { themeClass } from "@/features/colorPattern"
// Función utilitaria: devuelve el texto del CTA según el índice (para variar el copy)
import { getCtaByIndex } from "@/features/ctaPattern"

// Componente principal de la página de sabores
export const FlavorsPage = () => {

    // filter guarda el filtro activo que se le pasa a CookiesCatalogue.
    // Nota: el valor debe coincidir con los valores que entiende requestCookies:
    // - "todas" (o el default)
    // - "sin-gluten"
    // - "vegana"
    const [filter, setFilter] = useState("todas")

    // handleFilter actualiza el estado del filtro.
    // Al cambiar filter, CookiesCatalogue disparará requestCookies(filter).
    const handleFilter = (value) => {
        setFilter(value)
    }

    return (
        <main className="flavors">
            {/* CABECERA: título + subtítulo */}
            <header className="flavors__header">
                <h1 className="title">Todas nuestras cookies</h1>
                <h2 className="subtitle">Cuesta escoger, ¿eh? Tómate tu tiempo.</h2>
            </header>
             {/* FILTROS: controlan el estado filter */}
            <nav className="flavors__filters" aria-label="Filtros de cookies">
                {/* FILTRO: Todas */}
                <Button
                    className={`pill-btn  flavors__filter-button ${filter === "todas" ? "btn--black" : ""}`}
                    onClick={() => handleFilter("todas")}
                    aria-pressed={filter === "todas"}
                >
                    Todas
                </Button>
                {/* FILTRO: Sin gluten */}
                <Button
                    className={`pill-btn  flavors__filter-button ${filter === "sin-gluten" ? "btn--black" : ""}`}
                    onClick={() => handleFilter("sin-gluten")}
                    aria-pressed={filter === "sin-gluten"}
                >
                    Sin gluten
                </Button>
                {/* FILTRO: Veganas */}
                <Button
                    className={`pill-btn  flavors__filter-button ${filter === "vegana" ? "btn--black" : ""}`}
                    onClick={() => handleFilter("vegana")}
                    aria-pressed={filter === "vegana"}
                >
                    Veganas
                </Button>
            </nav>
            {/* CATÁLOGO: listado de cookies */}
            <section className="flavors__catalogue  max-width-1920"> 
                {/* CookiesCatalogue:
                   - filter={filter}      -> pide cookies según el filtro (fetch via Context)
                   - hideInvisible={true} -> oculta cookies con visible === false
                   - renderCookieChildren -> inyecta el CTA dentro de cada tarjeta */}          
                <CookiesCatalogue                
                    filter={filter}
                    hideInvisible={true}
                    renderCookieChildren={(cookie , index) => (
                        <Link className={`pill-btn  cookie--${themeClass(index)}`} route={`/flavors/${cookie._id}`}>                                
                            {getCtaByIndex(index)}
                        </Link>
                    )}
                />
            </section>
        </main>
    )
}