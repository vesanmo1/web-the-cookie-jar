// ============================================================
// NAVBAR CLIENT
//
// Barra de navegación para la parte pública (clientes).
//
// Qué muestra:
// 1) Logo mini con enlace a la home "/"
// 2) Menú con enlaces internos:
//    - /flavors   -> "Sabores"
//    - /locations -> "Visítanos"
// 3) Enlace externo a Instagram con su icono
//
// Notas:
// - NavLink se usa para navegar dentro de la app sin recargar la página
// - El enlace a Instagram abre en una pestaña nueva (target="_blank")
//   y usa rel="noopener noreferrer" por seguridad
// ============================================================

// Importación de los estilos específicos de la barra de navegación
import "./Navbar.css"

// NavLink: enlaces internos sin recargar la página (React Router)
import { NavLink } from "react-router-dom"

// Logo versión reducida
import { LogoMini } from "@/assets/svg/logos/LogoMini.jsx"

// Icono/logo de Instagram
import { LogoInstagram } from "@/assets/svg/logos/LogoInstagram.jsx"

// ------------------------------------------------------------
// NavbarClient
// No recibe props: es la navbar fija del cliente.
// ------------------------------------------------------------
export const NavbarClient = () => {

    return (
        <nav className="nav  nav--client">
            <div className="nav__container  nav__container--client max-width-1920">     
                
                {/* Logo + link a la home */}
                <NavLink className="nav__link  nav__link--client" to={'/'}>      
                    <LogoMini 
                        className="nav__icon  nav__icon--client" 
                        aria-label="Logo de The Cookie Jar (versión reducida)" 
                        role="img" 
                    />     
                </NavLink>   

                {/* Menú principal */}  
                <ul className="nav__menu  nav__menu--client">      

                    {/* Enlace: sabores */}          
                    <li className="nav__menu-item  nav__menu-item--client">
                        <NavLink 
                            className="nav__menu-link  nav__menu-link--client" 
                            to={'/flavors'}
                        >
                            Sabores
                        </NavLink>
                    </li>

                    {/* Enlace: ubicaciones */}
                    <li className="nav__menu-item  nav__menu-item--client">
                        <NavLink 
                            className="nav__menu-link  nav__menu-link--client" 
                            to={'/locations'}
                        >
                            Visítanos
                        </NavLink >
                    </li> 

                    {/* Enlace externo: Instagram */}
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