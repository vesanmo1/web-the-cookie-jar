// Importación de los estilos específicos de la barra de navegación
import "./Navbar.css"
// Importa NavLink para crear enlaces internos que navegan entre rutas sin recargar la página
import { NavLink } from "react-router-dom"
import { Button } from "@/components/Actions/Button"
// Importa el componente SVG del logo versión reducida
import { LogoMini } from '@/assets/svg/logos/LogoMini.jsx'

import { useNavigate } from "react-router-dom"

export const NavbarAdmin = () => {

    const navigate = useNavigate()

    const logOut = () => {

        localStorage.removeItem( `login` )
        navigate("/admin", { replace: true })
    }

    return (
    <nav className="nav"> 
        <div className="nav__container max-width-1920">   
            <div className="container__nav">   
                <LogoMini className="nav__icon" aria-label="Logo de The Cookie Jar (versión reducida)" role="img" />    
                <p>Admin</p>
            </div>
                <ul className="nav__menu-list">                
                    <li className="nav__menu-item">
                        <NavLink className="nav__menu-link" to={'/flavors'}>Panel de edición</NavLink>
                    </li>
                    <li className="nav__menu-item">
                        <NavLink className="nav__menu-link" to={'/locations'}>Añadir Cookie</NavLink >
                    </li> 
                    <li className="nav__menu-item">
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