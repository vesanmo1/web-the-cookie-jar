// Importación de los estilos específicos de la barra de navegación
import "./Navbar.css"
// Importa NavLink para crear enlaces internos que navegan entre rutas sin recargar la página
import { NavLink } from "react-router-dom"
// Importa el SVG del logo de Instagram
import instagramLogo from '@/assets/svg/navbar/instagramLogo.svg'
// Importa el SVG del logo de la marca
import logoMini from '@/assets/svg/navbar/logoMini.svg'

// Componente de la barra de navegación principal
function NavBar() {
  return (
    <nav className="nav">
        <div className="nav__container max-width-1920">     
            <NavLink className="nav__link" to={'/'}>      
                <img className="nav__icon" src={logoMini} alt="Logo de The Cookie Jar"/>    
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
                    <img className="nav__icon" src={instagramLogo} alt="Logo de instagram"/>
                </a>
            </div>
        </div>
    </nav>
  )
}

export default NavBar
