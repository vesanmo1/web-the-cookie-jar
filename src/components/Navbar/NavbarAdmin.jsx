import { useNavigate } from "react-router-dom"

export const NavbarAdmin = () => {

    const navigate = useNavigate()

    const logOut = () => {

        localStorage.removeItem( `login` )
        navigate( `/admin` )
    }

    return (
    <div>
        <h1>NavbarAdmin</h1>
        <button onClick={ logOut }>Cerrar sesión</button>
    </div>
)
}