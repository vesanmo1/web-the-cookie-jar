// ============================================================
// FOOTER
//
// Componente del pie de página de la web.
// Qué muestra:
// 1) Logo de la marca
// 2) Enlace interno a "Locations" + direcciones y teléfonos
// 3) Bloque de redes sociales (enlace externo a Instagram)
//
// Notas:
// - NavLink se usa para navegar dentro de la app sin recargar la página
// - El enlace a Instagram abre en una pestaña nueva (target="_blank")
//   y usa rel="noopener noreferrer" por seguridad
// ============================================================

// Importación de los estilos específicos del footer
import "./Footer.css"

// Importa NavLink para crear enlaces internos (React Router)
import { NavLink } from "react-router-dom"

// Importa el componente SVG del logo de la marca
import { LogoFullSize } from "@/assets/svg/logos/LogoFullSize.jsx"

// ------------------------------------------------------------
// Footer
// No recibe props: es un footer fijo con información estática.
// ------------------------------------------------------------
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