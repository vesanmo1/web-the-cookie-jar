// ============================================================
// ADMIN FLAVORS PAGE
// Página de administración donde vemos todas las cookies
// y podemos hacer acciones sobre cada una:
// - Cambiar Visible / Oculta
// - Editar
// - Borrar (con confirmación)
// ============================================================

// Importación de los estilos específicos de esta página
import "./AdminFlavorsPage.css"

// HOOKS DE REACT:
// - useState: estado local para controlar confirmación de borrado
import { useState } from "react" 

// Componente que pinta el catálogo (la lista de cookies)
import { CookiesCatalogue } from "@/components/CookiesCatalogue/CookiesCatalogue"
// Componentes Link custom para navegar a otras rutas
import { Link } from "@/components/ButtonLink/Link"
// Botón de visibilidad (lo has sacado a un componente aparte)
import { VisibilityCookieButton } from "@/components/VisibilityCookieButton/VisibilityCookieButton"
// Botón de borrar con confirmación (lo has sacado a un componente aparte)
import { DeleteCookieButton } from "@/components/DeleteCookieButton/DeleteCookieButton"

// ICONOS:
// Importa el componente SVG del botón "Nueva cookie"
import { AddIcon } from "@/assets/svg/button-icons/AddIcon"
// Importa el componente SVG del botón "Editar cookie"
import { EditIcon } from "@/assets/svg/button-icons/EditIcon"



export const AdminFlavorsPage = () => {

    // ------------------------------------------------------------
    // confirmId sirve para saber QUÉ cookie está pidiendo confirmación
    // - null -> ninguna cookie está en modo confirmación
    // - "id" -> esa cookie muestra el cuadro "¿Seguro?" con Cancelar/Borrar
    //
    // Esto hace que solo UNA cookie pueda tener confirmación abierta a la vez.
    // ------------------------------------------------------------
    const [confirmId, setConfirmId] = useState(null)
    

    return (
        <main className="admin-flavors">

            {/* CABECERA: (título + subtítulo) */}
            <header className="admin-flavors__header">
                <h1 className="admin-flavors__title  title">Panel de edición</h1>
                <h2 className="admin-flavors__subtitle  subtitle">Crea, modifica, elimina.</h2>
            </header>

            {/* NAV: botón para ir a la página de crear una cookie nueva */}
            <nav className="admin-flavors__nav">
                <Link className="pill-btn  btn--black" route={"/admin/flavors/new"}>
                    <AddIcon aria-hidden="true" />
                    <span>Añadir cookie</span>
                </Link>
            </nav>
            {/* LISTADO DE COOKIES */}
            <section className="admin-flavors__catalogue  max-width-1920">  
                {/* CookiesCatalogue pinta todas las cookies.
                renderCookieChildren es "contenido extra" que se pinta dentro de cada cookie.
                Aquí metemos los botones de admin para cada cookie. */}         
                <CookiesCatalogue
                    renderCookieChildren={(cookie) => (         

                            <div className="admin-flavors__item-actions">
                                
                                {/* BOTÓN VISIBLE / OCULTA (cambia cookie.visible en la BBDD) */}
                                <VisibilityCookieButton cookie={cookie} />

                                {/* BOTÓN EDITAR (navega a la ruta de editar esa cookie) */}
                                <Link className="circular-btn  btn--black" route={`/admin/flavors/edit/${cookie._id}`}>                                
                                    <EditIcon aria-hidden="true" />
                                    <span>Editar</span>
                                </Link>

                                {/* BOTÓN BORRAR con confirmación.
                                Le pasamos el id de la cookie y el estado confirmId del padre,
                                así solo una cookie puede estar "confirmando" a la vez. */}
                                <DeleteCookieButton 
                                    cookieId={cookie._id} 
                                    confirmId={confirmId} 
                                    setConfirmId={setConfirmId}
                                />

                            </div>
                        )
                    }
                />
            </section>
        </main>
    )
}