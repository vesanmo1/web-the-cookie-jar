// ============================================================
// NAVBAR ADMIN
//
// Barra de navegación para la zona de administración.
//
// Qué hace:
// 1) Muestra el logo mini + texto "Admin" con enlace al panel
// 2) Tiene un botón “burger” para abrir/cerrar el menú (modo móvil)
// 3) Muestra enlaces del panel:
//    - Panel de edición
//    - Añadir Cookie
// 4) Incluye botón de "Salir":
//    - borra el login de localStorage
//    - redirige a /admin
// ============================================================

// Importación de los estilos específicos de la barra de navegación
import "./Navbar.css"

// NavLink: enlaces internos sin recargar la página (React Router)
import { NavLink } from "react-router-dom"

// Botón reutilizable
import { Button } from "@/components/Actions/Button"

// Logo versión reducida
import { LogoMini } from "@/assets/svg/logos/LogoMini.jsx"

// Iconos
import { BurgerMenuIcon } from "@/assets/svg/button-icons/BurgerMenuIcon.jsx"
import { LogoutIcon } from "@/assets/svg/button-icons/LogoutIcon"

// Hooks:
// - useNavigate: para navegar por código (redirigir tras logout)
// - useState: para abrir/cerrar el menú
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const NavbarAdmin = () => {

    const navigate = useNavigate()

    // Estado del menú (true = abierto, false = cerrado)
    const [menuOpen, setmenuOpen] = useState(false)

    // Cerrar sesión:
    // - borra la clave "login" del localStorage
    // - redirige a /admin reemplazando el historial (para que no vuelva atrás)
    const logOut = () => {
        localStorage.removeItem( `login` )
        navigate("/admin", { replace: true })
    }

    return (
        <nav className="nav  nav--admin"> 
            <div className="nav__container  nav__container--admin  max-width-1920">   
                
                {/* Logo + link principal al panel */}
                <NavLink className="nav__link  nav__link--admin" to={'/admin/flavors'}>    
                    <LogoMini 
                        className="nav__icon  nav__icon--admin" 
                        aria-label="Logo de The Cookie Jar (versión reducida)" 
                        role="img" 
                    />    
                    <p className="nav__role">Admin</p>
                </NavLink>
                
                {/* Botón burger: abre/cierra el menú */}
                <button 
                    className="nav__toggle" 
                    type="button" 
                    aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                    onClick={ () => setmenuOpen( prevState => !prevState ) }
                >
                    <BurgerMenuIcon 
                        className="nav__icon  
                        nav__icon--admin" 
                        aria-hidden="true" 
                    />
                </button>

                {/* Menú:
                    - Si menuOpen es true añadimos la clase "active"
                    - El CSS decide cómo se muestra/oculta */}
                <ul className={`nav__menu  nav__menu--admin  ${menuOpen ? "active" : ""}`}>           
                    
                    {/* Enlace: panel */}
                    <li className="nav__menu-item  nav__menu-item--admin">
                        <NavLink 
                            className="nav__menu-link  nav__menu-link--admin" 
                            to={'/admin/flavors'}
                        >
                            Panel de edición
                        </NavLink>
                    </li>

                    {/* Enlace: crear cookie */}
                    <li className="nav__menu-item  nav__menu-item--admin">
                        <NavLink 
                            className="nav__menu-link  nav__menu-link--admin" 
                            to={'/admin/flavors/new'}
                        >
                            Añadir Cookie
                        </NavLink >
                    </li> 

                    {/* Botón: logout */}
                    <li className="nav__menu-item  nav__menu-item--admin">
                        <Button 
                            className="pill-btn  fit-btn  solid-black--accent-vanilla"
                            onClick={ logOut }
                        >
                            <LogoutIcon aria-hidden="true" />
                            <span>Salir</span>
                        </Button>
                    </li>                                   
                </ul>            
            </div>
        </nav>
    )
}