// Importación de los estilos específicos de esta página
import "./AdminEditCookiePage.css"
import { CookieFormPut } from "@/components/CookieForm/CookieFormPut"

export const AdminEditCookiePage = () => {

  return (
        <main className="edit-cookie">
            {/* CABECERA: título */}
            <header className="edit-cookie__header">
                <h1 className="title">Editar cookie</h1>
            </header>
            <CookieFormPut/>
        </main>
  )
}
