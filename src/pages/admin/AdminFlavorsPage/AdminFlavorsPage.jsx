// Importación de los estilos específicos de esta página
import "./AdminFlavorsPage.css"
// Componente que pinta el listado de cookies
import { CookiesCatalogue } from "@/components/CookiesCatalogue/CookiesCatalogue"
// Componente botón/enlace que se usa dentro de cada tarjeta de cookie
import { Link } from "@/components/ButtonLink/Link"
// Componente botón/enlace que se usa dentro de cada tarjeta de cookie
import { Button } from "@/components/ButtonLink/Button"
// Función que devuelve una clase de tema de color según el índice
import { themeClass } from "@/features/colorPattern"

export const AdminFlavorsPage = () => {
  return (
    <main className="control-panel">
        {/* Sección de introducción de la página (título + subtítulo) */}
        <section className="control-panel__intro">
            <h1 className="title">Panel de edición</h1>
            <h2 className="subtitle">Crea, modifica, elimina.</h2>
        </section>
        {/* Catálogo de cookies */}
        <section className="control-panel  max-width-1920">           
            <CookiesCatalogue                
                renderCookieChildren={(cookie , index) => (
                    <div>
                        <Button className={`cookie--${themeClass(index)}`}>                                
                            Visible
                        </Button>
                        <Link className={`cookie--${themeClass(index)}`} route={`/admin/flavors/edit/${cookie._id}`}>                                
                            Editar
                        </Link>
                        <Button className={`cookie--${themeClass(index)}`}>                                
                            Borrar
                        </Button>
                    </div>
                )}
            />
        </section>
    </main>
  )
}
