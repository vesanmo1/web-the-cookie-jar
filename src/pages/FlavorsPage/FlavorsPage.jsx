import "./FlavorsPage.css"

import CookiesCatalogue from "@/components/CookiesCatalogue/CookiesCatalogue"
import Link from "@/components/ButtonLink/Link"

import { themeClass } from "@/features/colorPatternDark"
import { getCtaByIndex } from "@/features/ctaPattern"

function FlavorsPage( props ) {
    return (
        <div className="flavors">
            <div className="flavors__intro">
                <h1 className="flavors__title poppins-bold-uppercase">Todas nuestras cookies</h1>
                <p className="flavors__subtitle">Cuesta escoger, ¿eh? Tómate tu tiempo.</p>
            </div>
            <nav className="flavors__filters">
                <button className="flavors__filter-button active">Todas</button>
                <button className="flavors__filter-button">Sin gluten</button>
                <button className="flavors__filter-button">Veganas</button>
            </nav>
            <div className="flavors__catalogue max-width-1920">           
                <CookiesCatalogue
                    renderCookieChildren={(cookie , i) => (
                        <Link className="flavors__catalogue-button" variant={`btn--outline-${themeClass(i)}`} href={`/flavors/${cookie._id}`}>
                            {getCtaByIndex(i)}
                        </Link>
                    )}
                />
            </div>
        </div>
    )
}

export default FlavorsPage