// ============================================================
// COOKIE IMAGE
//
// Componente reutilizable para mostrar la imagen de una cookie.
// Qué hace:
// 1) Recibe la URL PNG (Cloudinary) y el nombre de la cookie
// 2) Crea una URL "auto" usando f_auto para que Cloudinary sirva el mejor formato
// 3) Renderiza un <picture> con:
//    - <source> usando la URL optimizada (autoUrl)
//    - <img> como fallback con la URL original (image_png)
// 4) Dibuja un círculo SVG decorativo detrás/encima (según CSS)
// ============================================================

// Importación del CSS que da estilos al componente
import "./CookieImage.css"

// ------------------------------------------------------------
// CookieImage
// Props:
// - image_png (string):
//      URL de la imagen en Cloudinary (normalmente apunta a un PNG).
// - cookie_name (string):
//      nombre para el atributo alt (accesibilidad).
// ------------------------------------------------------------
export const CookieImage = (props) => {
    
    const { image_png, cookie_name } = props

    // Cloudinary puede devolver automáticamente el mejor formato (webp/avif)
    // si añadimos "f_auto" en la URL.
    //
    // Ejemplo:
    //   .../upload/v123/imagen.png
    // -> .../upload/f_auto/v123/imagen.png
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
