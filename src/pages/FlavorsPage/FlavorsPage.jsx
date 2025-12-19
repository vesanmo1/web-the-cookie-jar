// Importación de los estilos específicos de esta página
import "./FlavorsPage.css"
// Hook de React para manejar estado (el filtro seleccionado)
import { useState } from "react"
// Componente que pinta el listado de cookies
import { CookiesCatalogue } from "@/components/CookiesCatalogue/CookiesCatalogue"
// Componente botón/enlace que se usa dentro de cada tarjeta de cookie
import { Link } from "@/components/ButtonLink/Link"
// Componente botón que se usa para filtrar por tipo de cookies ("Todas", "Sin gluten", "Veganas")
import { Button } from "@/components/ButtonLink/Button"
// Función que devuelve una clase de tema de color según el índice
import { themeClass } from "@/features/colorPattern"
// Función que devuelve el texto del CTA según el índice (Explora mi interior, etc.)
import { getCtaByIndex } from "@/features/ctaPattern"

// Componente principal de la página de sabores
export const FlavorsPage = () => {

    // USO DE CHATGPT PARA LOS FILTROS
    // Estado que guarda el filtro actual ("Todas", "Sin gluten", "Veganas")
    const [filter, setFilter] = useState("Todas")

    // Función que actualiza el filtro cuando se pulsa un botón
    const handleFilter = (value) => {
        setFilter(value)
    }

    return (
        <main className="flavors">
            {/* Sección de introducción de la página (título + subtítulo) */}
            <section className="flavors__intro">
                <h1 className="title">Todas nuestras cookies</h1>
                <h2 className="subtitle">Cuesta escoger, ¿eh? Tómate tu tiempo.</h2>
            </section>
            {/* Filtros de tipos de cookies (todas, veganas o sin gluten) */}
            <nav className="flavors__filters">
                <Button
                    className={`pill-btn  flavors__filter-button ${filter === "Todas" ? "pill-btn--black" : ""}`}
                    onClick={() => handleFilter("Todas")}
                >
                    Todas
                </Button>
                <Button
                    className={`pill-btn flavors__filter-button ${filter === "sin-gluten" ? "pill-btn--black" : ""}`}
                    onClick={() => handleFilter("sin-gluten")}
                >
                    Sin gluten
                </Button>
                <Button
                    className={`pill-btn flavors__filter-button ${filter === "vegana" ? "pill-btn--black" : ""}`}
                    onClick={() => handleFilter("vegana")}
                >
                    Veganas
                </Button>
            </nav>
            {/* Catálogo de cookies */}
            <section className="flavors__catalogue  max-width-1920">           
                <CookiesCatalogue                
                    filter={filter}
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