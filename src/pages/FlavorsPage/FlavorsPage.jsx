import "./FlavorsPage.css"

import CookiesCatalogue from "../../components/CookiesCatalogue/CookiesCatalogue"
import Link from "@/components/ButtonLink/Link"

function FlavorsPage() {
    return (
        <div className="flavors">
            <h1 className="flavors__title poppins-bold-uppercase">Todas nuestras cookies</h1>
            <p className="flavors__subtitle">Cuesta escoger, ¿eh? Tómate tu tiempo.</p>
            <nav className="flavors__filters">
                <button className="flavors__filter-button flavors__filter-button--all">Todas</button>
                <button className="flavors__filter-button flavors__filter-button--gluten-free">Sin gluten</button>
                <button className="flavors__filter-button flavors__filter-button--vegan">Veganas</button>
            </nav>
            <div className="flavors__catalogue max-width-1920">           
                <CookiesCatalogue
                    renderCookieChildren={(cookie) => (
                        <Link variant="btn--outline-black" href={`/flavors/${cookie._id}`}>
                            Saber más
                        </Link>
                    )}
                />
            </div>
        </div>
    )
}

export default FlavorsPage