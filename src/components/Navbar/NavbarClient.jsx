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
    <nav className="nav">
        <div className="nav__container max-width-1920">     
            <NavLink className="nav__link" to={'/'}>      
                <LogoMini className="nav__icon" aria-label="Logo de The Cookie Jar (versión reducida)" role="img" />     
            </NavLink>     
            <div className="nav__menu"> 
                <ul className="nav__menu-list">                
                    <li className="nav__menu-item">
                        <NavLink className="nav__menu-link" to={'/flavors'}>Sabores</NavLink>
                    </li>
                    <li className="nav__menu-item">
                        <NavLink className="nav__menu-link" to={'/locations'}>Visítanos</NavLink >
                    </li>                                   
                </ul>
                <a className="nav__link" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <LogoInstagram className="nav__icon" aria-label="Logo de instagram" role="img" /> 
                </a>
            </div>
        </div>
    </nav>
  )
  
}