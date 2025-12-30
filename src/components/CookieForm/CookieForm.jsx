import "./CookieForm.css"

// HOOKS DE REACT:
// - useContext: para usar funciones del CookiesContext (peticiones y estado global)
import { useContext } from "react" 
// Importamos el contexto global de cookies
import { CookiesContext } from "@/context/CookiesContext"

export const CookieForm = () => {

    const { postCookie, postForm } = useContext(CookiesContext);

    return (
        <div>
            <h1>Añadir nueva cookie</h1>
            <form onSubmit={postCookie} ref={postForm}>
                <input type="text"  name="cookie_name"  placeholder="Nombre"/>
                <input type="text"  name="description"  placeholder="Descripción"/>
                <input type="submit"  value="añadir"/>
            </form>
        </div>
    )
}