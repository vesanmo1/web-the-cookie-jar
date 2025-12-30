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
            <form onSubmit={postCookie} ref={postForm} encType="multipart/form-data">
                <input type="text" name="cookie_name" placeholder="Nombre" maxLength={25} />
                <textarea                                                   
                    name="description"
                    placeholder="Descripción"
                    maxLength={400}                                        
                />
                <input type="file" name="image_png" accept="image/png" />
                <input type="submit"  value="añadir"/>
            </form>
        </div>
    )
}