// Importación de los estilos específicos de esta página
import "./AdminAddCookiePage.css"
import { CookieFormPost } from "@/components/CookieForm/CookieFormPost"

export const AdminAddCookiePage = () => {
    return (
        <main className="add-cookie">
            {/* CABECERA: título */}
            <header className="add-cookie__header">
                <h1 className="title">Añadir nueva cookie</h1>
            </header>
            <CookieFormPost/>
        </main>
    )
}

