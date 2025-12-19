// Importación de los estilos específicos de esta página
import "./AdminFlavorsPage.css"
// Componente que pinta el listado de cookies
import { CookiesCatalogue } from "@/components/CookiesCatalogue/CookiesCatalogue"
// Componente botón/enlace que se usa dentro de cada tarjeta de cookie
import { Link } from "@/components/ButtonLink/Link"
// Componente botón/enlace que se usa dentro de cada tarjeta de cookie
import { Button } from "@/components/ButtonLink/Button"
// Importa el SVG de "visible"
import { VisibilityOnIcon } from '@/assets/svg/button-icons/VisibilityOnIcon'

export const AdminFlavorsPage = () => {
  return (
    <main className="control-panel">
        {/* Sección de introducción de la página (título + subtítulo) */}
        <section className="control-panel__intro">
            <h1 className="title">Panel de edición</h1>
            <h2 className="subtitle">Crea, modifica, elimina.</h2>
        </section>
        {/* Catálogo de cookies */}
        <section className="  max-width-1920">           
            <CookiesCatalogue                
                renderCookieChildren={(cookie , index) => (
                    <div className="control-panel__buttons-container">
                        <Button className="circular-btn  btn--black">     
                            <VisibilityOnIcon className="visible-icon" aria-hidden="true" />      
                            <div>Visible</div>                  
                        </Button>
                        <Link className="circular-btn  btn--black" route={`/admin/flavors/edit/${cookie._id}`}>                                
                            Editar
                        </Link>
                        <Button className="circular-btn  btn--black">                                
                            Borrar
                        </Button>
                    </div>
                )}
            />
        </section>
    </main>
  )
}
