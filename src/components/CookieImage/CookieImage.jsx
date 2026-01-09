// Importación del CSS que da estilos al componente
import "./CookieImage.css"

// Recibe la URL de Cloudinary (image_png) y el nombre de la galleta.
export const CookieImage = (props) => {
    
    const { image_png, cookie_name } = props

    // Cloudinary entrega automáticamente el mejor formato (webp/avif) según navegador
    const autoUrl = image_png.replace("/upload/", "/upload/f_auto/")

    return (
        <div className="cookie__image-container">
        <picture className="cookie__image">
            <source srcSet={autoUrl} />
            <img src={image_png} alt={`Imagen de la galleta: ${cookie_name}`} />
        </picture>

        <svg className="cookie__circle" viewBox="0 0 100 100" width="100%" preserveAspectRatio="xMidYMid meet">
            <circle cx="50%" cy="50%" r="40%" fill="currentColor" />
        </svg>
        </div>
    )
}
