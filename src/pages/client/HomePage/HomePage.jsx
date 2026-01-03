// Importación del CSS que da estilos a la home
import "./HomePage.css"
// Importamos las imágenes en PNG y WebP para usar <picture> 
import coverPng from '@/assets/img/home/cover.png'
import coverWebp from '@/assets/img/home/cover.webp'
import cookieCutPng from '@/assets/img/home/cookie-cut.webp'
import cookieCutWebp from '@/assets/img/home/cookie-cut.webp'
// Reutilizamos el componente Link estilizado como botón
import { Link } from "@/components/Actions/Link"

export const HomePage = () => {
    return (
        <main className="home">
            <section className="home__cover">
                <div className="home__cover-media  entrance">
                    <picture className="home__cover-picture">
                        <source srcSet={coverWebp} type="image/webp" />
                        <img className="home__cover-image" src={coverPng} alt="Imagen de una cookie chorreando chocolate"/>
                    </picture> 
                </div>
            </section>
            <section className="home__claim  max-width-1920">
                <h2 className="home__claim-text">
                    Endulzamos tu día con las cookies más deliciosas. Imposible resistirse...
                </h2>
                <div className="home__claim-media">
                    <picture className="home__claim-picture">
                        <source srcSet={cookieCutWebp} type="image/webp" />
                        <img className="home__claim-image" src={cookieCutPng} alt="Imagen de una cookie cortada por la mitad"/>
                    </picture> 
                </div>
            </section>
            <section className="home__cta">
                {/* Medio círculo (mitad de abajo) */}
                <div className="home__cta-media">
                    <svg className="home__cta-half-circle" width="200" height="100" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,0 A50,50 0 0 0 100,0 Z"/>
                    </svg>
                </div>
                <div className="home__cta-content  max-width-1920">
                    <div className="home__cta-text">
                        <h2 className="home__cta-title  poppins-bold-uppercase">
                            Tenemos 12 sabores disponibles
                        </h2>
                        <h3 className="home__cta-subtitle">
                            Con un sabor nuevo cada mes para no dejar nunca de sorprenderte.
                        </h3>
                    </div>
                    <Link className="home__cta-link  pill-btn  solid-vanilla--accent--black" route={"/flavors"}>
                        Descúbrelos todos aquí
                    </Link>
                </div>
            </section>
        </main>
    )
}
