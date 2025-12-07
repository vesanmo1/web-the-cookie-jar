// Importación del CSS que da estilos al componente
import "./NotFoundPage.css"
// Reutilizamos el componente Link estilizado como botón
import Link from "@/components/ButtonLink/Link"
// Importamos las imágenes en PNG y WebP para usar <picture> 
import error404Png from '@/assets/img/error404/error404.png';
import error404Webp from '@/assets/img/error404/error404.webp';

// Componente de página para rutas no encontradas (404)
function NotFoundPage() {
    return (
        <main className="not-found">
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
                <Link variant="btn--outline-black" route={"/"}>
                    Volver a inicio
                </Link>
            </div>
        </main>
    )
}

export default NotFoundPage



    