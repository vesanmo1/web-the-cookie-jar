// Componente principal: muestra el catálogo de cookies
// Recibe:
// - renderCookieChildren: una función opcional para pintar contenido dentro de cada cookie
// - filter: el filtro activo (Todas, Vegana, Sin gluten)
const CookieImage = ({ image_webp, image_png, cookie_name }) => {

    return (
        <div className="cookie__info-container">
            <div className="cookie__image-container">
                <picture className="cookie__image">
                    <source srcSet={image_webp} type="image/webp" />
                    <img src={image_png} alt={`Imagen de la galleta: ${cookie_name}`} />
                </picture>
                {/* fill por CSS según la clase cookie--{theme} */}
                <svg className="cookie__circle" viewBox="0 0 100 100" width="100%" preserveAspectRatio="xMidYMid meet">
                    <circle cx="50%" cy="50%" r="40%"/>
                </svg>
            </div>            
        </div>
    )
}

export default CookieImage;