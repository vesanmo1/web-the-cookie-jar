// Importación de los estilos específicos del footer
import "./Footer.css"
// Importa NavLink para crear enlaces internos que navegan entre rutas sin recargar la página
import { NavLink } from "react-router-dom"
// Importa el componente SVG del logo de la marca
import { LogoFullSize } from '@/assets/svg/logos/LogoFullSize.jsx'

// Componente del footer
export const Footer = () => {

    return (
        <footer className="footer">
            <div className="footer__container max-width-1920">
                {/* Columna izquierda: logo */}
                <div className="footer__content footer__content--logo">  
                    <div className="footer__logo-container">                
                        <LogoFullSize className="footer__logo" aria-label="Logotipo de The Cookie Jar" role="img" /> 
                    </div>  
                </div>
                {/* Columna derecha: texto */}
                <div className="footer__content footer__content--text">
                    {/* Bloque direcciones */}
                    <section className="footer__visit-us">
                        <NavLink className="footer__title  uppercase  link" to={'/locations'}>Ven a visitarnos:</NavLink>
                        <div className="footer__addresses">
                            <address className="footer__address">
                                <p>Avenida Blasco Ibáñez nº 115,</p>
                                <p>46022 Valencia</p>
                                <p>Teléfono: 634235564</p>                                
                            </address>
                            <address className="footer__address">
                                <p>Gran Vía Marqués del Turia nº 59,</p>
                                <p>46004 Valencia</p>
                                <p>Teléfono: 621287470</p>
                            </address>
                        </div>
                    </section>
                    {/* Bloque RRSS */}
                    <section className="footer__rrss">
                        <h2 className="footer__title  uppercase"> Sé el primero en conocer nuestras novedades:</h2>
                        <a className="link" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                            Síguenos en Instagram
                        </a>
                    </section>
                </div>
            </div>
        </footer>
    )
    
}