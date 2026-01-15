// Importación de los estilos específicos de la barra de navegación
import "./Navbar.css"
// Importa NavLink para crear enlaces internos que navegan entre rutas sin recargar la página
import { NavLink } from "react-router-dom"
import { Button } from "@/components/Actions/Button"
// Importa el componente SVG del logo versión reducida
import { LogoMini } from '@/assets/svg/logos/LogoMini.jsx'
import { BurgerMenuIcon } from '@/assets/svg/button-icons/BurgerMenuIcon.jsx'

import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const NavbarAdmin = () => {

    const navigate = useNavigate()
    const [menuOpen, setmenuOpen] = useState(false)

    const logOut = () => {

        localStorage.removeItem( `login` )
        navigate("/admin", { replace: true })
    }

    return (
        <nav className="nav  nav--admin"> 
            <div className="nav__container  nav__container--admin  max-width-1920">   
                <div className="nav__brand">   
                    <LogoMini 
                        className="nav__icon  nav__icon--admin" 
                        aria-label="Logo de The Cookie Jar (versión reducida)" 
                        role="img" 
                    />    
                    <p className="nav__role">Admin</p>
                </div>
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
                <ul className={`nav__menu  nav__menu--admin  ${menuOpen ? "active" : ""}`}>           
                    <li className="nav__menu-item  nav__menu-item--admin">
                        <NavLink 
                            className="nav__menu-link  nav__menu-link--admin" 
                            to={'/admin/flavors'}
                        >
                            Panel de edición
                        </NavLink>
                    </li>
                    <li className="nav__menu-item  nav__menu-item--admin">
                        <NavLink 
                            className="nav__menu-link  nav__menu-link--admin" 
                            to={'/admin/flavors/new'}
                        >
                            Añadir Cookie
                        </NavLink >
                    </li> 
                    <li className="nav__menu-item  nav__menu-item--admin">
                        <Button 
                            className="pill-btn  fit-btn  solid-black--accent-vanilla"
                            onClick={ logOut }
                        >
                            Cerrar sesión
                        </Button>
                    </li>                                   
                </ul>            
            </div>
        </nav>
    )
}