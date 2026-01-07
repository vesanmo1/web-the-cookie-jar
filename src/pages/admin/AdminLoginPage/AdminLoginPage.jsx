// Importación de los estilos específicos de AdminLoginPage
import { useRef } from "react"
import "./AdminLoginPage.css"

export const AdminLoginPage = () => {

        const loginForm = useRef(null)

        const login = (e) => {
            e.preventDefault()
            
            localStorage.setItem( `login` , `true` )
        }

    return (
        <main className="admin-layout">
            <div className="container ">
                <h1>AdminLoginPage</h1>

                <form ref={loginForm} onSubmit={login}>                
                    <input type="text"      name="user"     placeholder="Usuario"/>
                    <input type="password"  name="pass"     placeholder="Contraseña"/>
                    <input type="submit"  value="Entrar" />
                </form>
                
            </div>
        </main>
    )
}
