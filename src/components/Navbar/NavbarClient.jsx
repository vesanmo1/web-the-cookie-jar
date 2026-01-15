// Importación de los estilos específicos de la barra de navegación
import "./Navbar.css"
// Importa NavLink para crear enlaces internos que navegan entre rutas sin recargar la página
import { NavLink } from "react-router-dom"
// Importa el componente SVG del logo versión reducida
import { LogoMini } from '@/assets/svg/logos/LogoMini.jsx'
// Importa el componente SVG del logo de instagram
import { LogoInstagram } from '@/assets/svg/logos/LogoInstagram.jsx'

// Componente de la barra de navegación principal
export const NavbarClient = () => {

    return (
        <nav className="nav  nav--client">
            <div className="nav__container  nav__container--client max-width-1920">     
                <NavLink className="nav__link  nav__link--client" to={'/'}>      
                    <LogoMini 
                        className="nav__icon  nav__icon--client" 
                        aria-label="Logo de The Cookie Jar (versión reducida)" 
                        role="img" 
                    />     
                </NavLink>     
                <ul className="nav__menu  nav__menu--client">                
                    <li className="nav__menu-item  nav__menu-item--client">
                        <NavLink 
                            className="nav__menu-link  nav__menu-link--client" 
                            to={'/flavors'}
                        >
                            Sabores
                        </NavLink>
                    </li>
                    <li className="nav__menu-item  nav__menu-item--client">
                        <NavLink 
                            className="nav__menu-link  nav__menu-link--client" 
                            to={'/locations'}
                        >
                            Visítanos
                        </NavLink >
                    </li> 
                    <li className="nav__menu-item  nav__menu-item--client">
                        <a 
                            className="nav__link  nav__link--client" 
                            href="https://www.instagram.com/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <LogoInstagram 
                                className="nav__icon  nav__icon--client" 
                                aria-label="Logo de instagram" 
                                role="img" 
                            /> 
                        </a>
                    </li>                                  
                </ul>
            </div>
        </nav>
    )
}