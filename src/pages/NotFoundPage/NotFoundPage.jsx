import "./NotFoundPage.css"

import Link from "@/components/ButtonInputLink/Link"

import error404Png from '../../assets/img/Error404/Error404.png';
import error404Webp from '../../assets/img/Error404/Error404.webp';

function NotFoundPage() {
    return (
        <>
            <NotFoundMessage/>
        </>
    )
}

export default NotFoundPage

const NotFoundMessage = () => {
    return (
        <div className="not-found">
            <div className="not-found__content max-width-1920">
                <picture className="not-found__img">
                    <source srcSet={error404Webp} type="image/webp" />
                    <img src={error404Png} alt="Imagen error 404" />
                </picture>
                <div className="not-found__text">
                    <h1 className="not-found__title poppins-bold-uppercase">Esta página no existe</h1>
                    <p className="not-found__paragraph">
                        ¡Oh no! Parece que has llegado al fondo del tarro de galletas. 
                        No te preocupes, sigue nuestras miguitas para encontrar el camino 
                        de vuelta a la página de inicio.
                    </p>
                </div>
                <Link variant="btn--outline-black" href="/">
                    Volver a inicio
                </Link>
            </div>
        </div>
    )
}


    