// Importación de los estilos específicos de la página de localizaciones
import "./LocationsPage.css"
// Importa las imágenes de la tienda de Gran Vía (formatos JPG y WebP)
import granViaJpg from '@/assets/img/locations/gran-via.jpg'
import granViaWebp from '@/assets/img/locations/gran-via.webp'
// Importa las imágenes de la tienda de Blasco Ibáñez (formatos JPG y WebP)
import blascoJpg from '@/assets/img/locations/blasco.jpg'
import blascoWebp from '@/assets/img/locations/blasco.webp'

// Componente principal de la página de localizaciones
export const LocationsPage = () => {
    return (
        <section className="locations">

            {/* Intro de la página: título + subtítulo */}
            <header className="locations__header  max-width-1920">
                <h1 className="title">Ven a visitarnos</h1>
                <h2 className="subtitle">Y llévate un pedacito de felicidad contigo.</h2>
            </header>

            {/* Listado de tarjetas de localizaciones */}
            <section className="locations__cards  max-width-1920">
                {/* Tarjeta de la tienda de Gran Vía */}
                <LocationCard 
                    street={<>    
                                <div>Gran Vía</div>
                                <div>Marqués</div>
                                <div>del Turia</div>
                            </>}  
                    address="Nº 59, 46004 valencia"  
                    phone="Teléfono: 621287470" 
                    webp={granViaWebp} 
                    jpg={granViaJpg}/>
                {/* Tarjeta de la tienda de Blasco Ibáñez */}
                <LocationCard 
                    street={<>  
                                <div>Avenida</div>
                                <div>Blasco</div>
                                <div>Ibáñez</div>   
                            </>} 
                    address="Nº 115, 46022 valencia"  
                    phone="Teléfono: 634235564"
                    webp={blascoWebp} 
                    jpg={blascoJpg}/>
            </section>

        </section>
    )
}

// Componente de tarjeta individual de localización
const LocationCard = ( props ) => {

    const { street , address , phone , webp , jpg } = props

    return (
        <article className="location-card">
            {/* Info de la tienda */}
            <div className="location-card__content  location-card__content--text">
                <h3 className="location-card__title  poppins-bold-uppercase">{street}</h3>
                <div className="location-card__info">
                    <div className="location-card__address">
                        <p>{address}</p>
                        <p>{phone}</p>
                    </div>
                    <div className="location-card__schedule">
                        <p>Horario:</p>
                        <p>de martes a domingo</p>
                        <p>de 9:00 a 20:00h.</p>
                    </div>
                </div>
            </div>
            {/* Imagen de la tienda */}
            <div className="location-card__content  location-card__content--img">
                <picture className="location-card__img">
                    <source srcSet={webp} type="image/webp"/>
                    <img src={jpg} alt="Escaparate de la tienda"/>
                </picture>
            </div>
        </article>
    )
}