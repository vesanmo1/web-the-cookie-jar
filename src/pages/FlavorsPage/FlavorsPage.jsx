// Importa los estilos específicos de esta página
import "./FlavorsPage.css"
// Hook de React para manejar estado (el filtro seleccionado)
import { useState } from "react"
// Componente que pinta el listado de cookies
import CookiesCatalogue from "@/components/CookiesCatalogue/CookiesCatalogue"
// Componente botón/enlace que se usa dentro de cada tarjeta de cookie
import Link from "@/components/ButtonLink/Link"

// Función que devuelve una clase de tema de color según el índice
import { themeClass } from "@/features/colorPatternDark"
// Función que devuelve el texto del CTA según el índice (Explora mi interior, etc.)
import { getCtaByIndex } from "@/features/ctaPattern"

// Componente principal de la página de sabores
function FlavorsPage() {

    // Estado que guarda el filtro actual ("Todas", "Sin gluten", "Vegana")
    const [filter, setFilter] = useState("Todas")

    // Función que actualiza el filtro cuando se pulsa un botón
    const handleFilter = (value) => {
        setFilter(value)
    }

    return (
        <div className="flavors">
            <div className="flavors__intro">
                <h1 className="flavors__title poppins-bold-uppercase">Todas nuestras cookies</h1>
                <p className="flavors__subtitle">Cuesta escoger, ¿eh? Tómate tu tiempo.</p>
            </div>
            <nav className="flavors__filters">
                <button
                    className={`flavors__filter-button ${filter === "Todas" ? "active" : ""}`}
                    onClick={() => handleFilter("Todas")}
                >
                    Todas
                </button>
                <button
                    className={`flavors__filter-button ${filter === "Sin gluten" ? "active" : ""}`}
                    onClick={() => handleFilter("Sin gluten")}
                >
                    Sin gluten
                </button>
                <button
                    className={`flavors__filter-button ${filter === "Vegana" ? "active" : ""}`}
                    onClick={() => handleFilter("Vegana")}
                >
                    Veganas
                </button>
            </nav>
            <div className="flavors__catalogue max-width-1920">           
                <CookiesCatalogue
                    filter={filter}
                    renderCookieChildren={(cookie , i) => (
                        <Link 
                            className="flavors__catalogue-button" 
                            variant={`btn--outline-${themeClass(i)}`} 
                            href={`/flavors/${cookie._id}`}
                        >
                            {getCtaByIndex(i)}
                        </Link>
                    )}
                />
            </div>
        </div>
    )
}

export default FlavorsPage