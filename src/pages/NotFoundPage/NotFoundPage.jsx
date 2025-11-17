import "./NotFoundPage.css"

import Link from "@/components/ButtonInputLink/Link"

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
            <div className="not-found__content">
                <img className="not-found__img" src="" alt="" />
                <div className="not-found__text">
                    <h1 className="not-found__title poppins-bold-uppercase">Esta página no existe</h1>
                    <p className="not-found__paragraph">
                        ¡Oh no! Parece que has llegado al fondo del tarro de galletas. 
                        No te preocupes, sigue nuestras miguitas para encontrar el camino 
                        de vuelta a la página de inicio.
                    </p>
                </div>
                <Link className="not-found__link plus-jakarta-bold" variant="btn--outline-black" href="/">
                    Volver a inicio
                </Link>
            </div>
        </div>
    )
}


    