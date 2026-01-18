// ============================================================
// NOT FOUND PAGE (404)
//
// Página de error para rutas no encontradas.
// Se usa cuando:
// - El usuario entra a una URL que no existe (Route path="*")
// - O cuando rediriges manualmente a /404 desde otras páginas
//
// Muestra:
// 1) Imagen 404 con <picture> (webp + png fallback)
// 2) Mensaje de error y explicación
// 3) Botón para volver a la Home (/)
// ============================================================


// Importación del CSS que da estilos a NotFoundPage
import "./NotFoundPage.css"

// Reutilizamos el componente Link estilizado como botón
import { Link } from "@/components/Actions/Link"

// Importamos las imágenes en PNG y WebP para usar <picture>
import error404Png from "@/assets/img/error404/error404.png"
import error404Webp from "@/assets/img/error404/error404.webp"


// ============================================================
// NotFoundPage
// ============================================================
export const NotFoundPage = () => {
    return (
        <section className="not-found">
            <div className="not-found__content max-width-1920">
                <picture className="not-found__img">
                    <source srcSet={error404Webp} type="image/webp" />
                    <img src={error404Png} alt="Imagen error 404" />
                </picture>
                <div className="not-found__text">
                    <h1 className="title">Esta página no existe</h1>
                    <p className="subtitle">
                        ¡Oh no! Parece que has llegado al fondo del tarro de galletas. 
                        No te preocupes, sigue nuestras miguitas para encontrar el camino 
                        de vuelta a la página de inicio.
                    </p>
                </div>
                <Link className="pill-btn  ghost--accent-black" to={"/"}>
                    Volver a inicio
                </Link>
            </div>
        </section>
    )
}