// Importación de los estilos específicos de AdminLoginPage
import { useRef, useEffect } from "react"
import "./AdminLoginPage.css"
import { useNavigate } from "react-router-dom"

export const AdminLoginPage = () => {

    const navigate = useNavigate()
    const loginForm = useRef(null)

    useEffect ( () => {

        if( localStorage.getItem( `login` ) ) {
            navigate( '/admin/flavors' )
        }

    } , [] )

    const login = (e) => {
        e.preventDefault()
        
        localStorage.setItem( `login` , `true` )
        navigate( '/admin/flavors' )
    }

    return (
        <main className="admin-layout">
            <div className="container ">

                <form ref={loginForm} onSubmit={login}>                
                    <input type="text"      name="user"     placeholder="Usuario"/>
                    <input type="password"  name="pass"     placeholder="Contraseña"/>
                    <input type="submit"  value="Entrar" />
                </form>
                
            </div>
        </main>
    )
}
