// Importación del CSS que da estilos a la home
import "./HomePage.css"
// Importamos las imágenes en PNG y WebP para usar <picture> 
import coverPng from '@/assets/img/home/cover.png';
import coverWebp from '@/assets/img/home/cover.webp';
import cookieCutPng from '@/assets/img/home/cookie-cut.webp';
import cookieCutWebp from '@/assets/img/home/cookie-cut.webp';

function HomePage() {
    return (
        <main className="home">
            <section className="home__cover">
                <div className="home__cover-img-container  entrance">
                    <picture className="home__cover-img">
                        <source srcSet={coverWebp} type="image/webp" />
                        <img src={coverPng} alt="Imagen de una cookie chorreando chocolate"/>
                    </picture> 
                </div>
            </section>
            <section className="home__claim  max-width-1920">
                <h2 className="home__claim-text">
                    Endulzamos tu día con las cookies más deliciosas. Imposible resistirse...
                </h2>
                <div className="home__claim-image-container">
                    <picture className="home__claim-image">
                        <source srcSet={cookieCutWebp} type="image/webp" />
                        <img src={cookieCutPng} alt="Imagen de una cookie cortada por la mitad"/>
                    </picture> 
                </div>
            </section>
            <section className="home__cta">
                {/* Medio círculo (mitad de abajo) */}
                <div className="home__half-circle-container">
                    <svg className="home__half-circle" width="200" height="100" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,0 A50,50 0 0 0 100,0 Z"/>
                    </svg>
                </div>
            </section>
        </main>
    )
}

export default HomePage
