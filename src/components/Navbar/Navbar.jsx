// Importación de los estilos específicos de la barra de navegación
import "./Navbar.css"
// Importa el SVG del logo de Instagram
import instagramLogo from '@/assets/svg/navbar/instagramLogo.svg'
// Importa el SVG del logo de la marca
import logoMini from '@/assets/svg/navbar/logoMini.svg'

// Componente de la barra de navegación principal
function NavBar() {
  return (
    <div className="nav">
        <div className="nav__container max-width-1920">     
            <a className="nav__link" href="/">      
                <img className="nav__icon" src={logoMini} alt="Logo de The Cookie Jar"/>    
            </a>     
            <div className="nav__menu"> 
                <ul className="nav__menu-list">                
                    <li className="nav__menu-item">
                        <a className="nav__menu-link" href="/flavors">Sabores</a>
                    </li>
                    <li className="nav__menu-item">
                        <a className="nav__menu-link" href="/locations">Visítanos</a>
                    </li>                                   
                </ul>
                <a className="nav__link" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <img className="nav__icon" src={instagramLogo} alt="Logo de instagram"/>
                </a>
            </div>
        </div>
    </div>
  )
}

export default NavBar
