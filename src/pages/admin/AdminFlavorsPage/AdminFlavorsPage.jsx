// Importación de los estilos específicos de esta página
import "./AdminFlavorsPage.css"

// Hooks de React:
// - useContext: para usar el CookiesContext
// - useState: para guardar qué cookie está pidiendo confirmación de borrado
import { useContext , useState } from "react" 

// Importamos el contexto global de cookies
import { CookiesContext } from "@/context/CookiesContext"
// Componente que pinta el listado de cookies
import { CookiesCatalogue } from "@/components/CookiesCatalogue/CookiesCatalogue"
// Componentes botón/enlace
import { Link } from "@/components/ButtonLink/Link"
import { Button } from "@/components/ButtonLink/Button"

// ICONOS:
// Importa el componente SVG del botón "Nueva cookie"
import { AddIcon } from '@/assets/svg/button-icons/AddIcon'
// Importa el componente SVG del botón "Visible"
import { VisibilityOnIcon } from '@/assets/svg/button-icons/VisibilityOnIcon'
// Importa el componente SVG del botón "Oculto"
import { VisibilityOffIcon } from '@/assets/svg/button-icons/VisibilityOffIcon'
// Importa el componente SVG del botón "Editar"
import { EditIcon } from '@/assets/svg/button-icons/EditIcon'
// Importa el componente SVG del botón "Borrar"
import { DeleteIcon } from '@/assets/svg/button-icons/DeleteIcon'


export const AdminFlavorsPage = () => {

    // Sacamos la función para borrar cookies del Context
    const { deleteCookie } = useContext(CookiesContext)
    // Aquí guardamos el ID de la cookie que estamos intentando borrar
    // - null  => no hay ninguna cookie en modo confirmación
    // - "id"  => esa cookie está mostrando el mensaje "¿Seguro?"
    const [confirmId, setConfirmId] = useState(null)
    // Guarda los Ids de las cookies que están OCULTAS
    // null => visible
    const [hiddenIds, setHiddenIds] = useState([])
    

    return (
        <main className="admin-flavors">
            {/* Sección de introducción de la página (título + subtítulo) */}
            <header className="admin-flavors__header">
                <h1 className="admin-flavors__title  title">Panel de edición</h1>
                <h2 className="admin-flavors__subtitle  subtitle">Crea, modifica, elimina.</h2>
            </header>
            {/* Navegación para salir o añadir una nueva cookie */}
            <nav className="admin-flavors__nav">
                <Link className="pill-btn  btn--black" route={"/admin/flavors/new"}>
                    <AddIcon aria-hidden="true" />
                    <span>Añadir cookie</span>
                </Link>
            </nav>
            {/* Catálogo de cookies */}
            <section className="admin-flavors__catalogue  max-width-1920">           
                <CookiesCatalogue
                    hiddenIds={hiddenIds}
                    renderCookieChildren={(cookie) => {
                        const isHidden = hiddenIds.includes(cookie._id)

                        return (
                            <div className="admin-flavors__item-actions">
                                {/* ─────────────────────────────────────────────────────────────
                                    BOTÓN TOGGLE DE VISIBILIDAD (MÚLTIPLES COOKIES)
                                    Guardamos VARIOS ids en un array: hiddenIds

                                    hiddenIds = [id1, id2, id3...]
                                    - Si el id de esta cookie está dentro → esta cookie está OCULTA
                                    - Si no está dentro → esta cookie está VISIBLE
                                ───────────────────────────────────────────────────────────── */}
                                {/* 
                                    La clase del botón también depende del estado:
                                    - Si esta cookie está oculta → estilo "outline"
                                    - Si está visible → estilo "normal"
                                */}
                                {/* 
                                    Al hacer click (TOGGLE):

                                    1) Miramos si el id de ESTA cookie ya está en hiddenIds
                                    - Si SÍ está:
                                        → la quitamos del array (la volvemos VISIBLE)
                                    - Si NO está:
                                        → la añadimos al array (la volvemos OCULTA)
                                */}
                                <Button
                                    className={`circular-btn ${isHidden ? "btn--outline-black" : "btn--black"}`}
                                    onClick={() => {
                                        setHiddenIds((prev) =>
                                        prev.includes(cookie._id)
                                            ? prev.filter((id) => id !== cookie._id) // quitar id → visible
                                            : [...prev, cookie._id]                  // añadir id → oculta
                                        )
                                    }}
                                >
                                    {/* 
                                        Aquí decidimos QUÉ mostrar dentro del botón:

                                        isHidden es un boolean:
                                        - true  → esta cookie está OCULTA
                                        - false → esta cookie está VISIBLE

                                        Si está oculta:
                                        - icono ojo cerrado + "Oculta"
                                        Si está visible:
                                        - icono ojo abierto + "Visible"
                                    */}
                                    {isHidden ? (
                                        <>
                                            <VisibilityOffIcon aria-hidden="true" />
                                            <span>Oculta</span>
                                        </>
                                    ) : (
                                        <>
                                            <VisibilityOnIcon aria-hidden="true" />
                                            <span>Visible</span>
                                        </>
                                    )}
                                </Button>

                                <Link className="circular-btn  btn--black" route={`/admin/flavors/edit/${cookie._id}`}>                                
                                    <EditIcon aria-hidden="true" />
                                    <span>Editar</span>
                                </Link>

                                {/* CONFIRMACIÓN INLINE PARA BORRAR:
                                    Si confirmId es distinto del id de esta cookie -> mostramos "Borrar" normal
                                    Si confirmId es igual -> mostramos el mensaje con Cancelar / Borrar
                                */}
                            
                                {/* 1) Estado normal: botón "Borrar" (siempre visible) */}
                                {/* Toggle que hace aparecer y desaparecer el mensaje de la cookie con el mismo id */}
                                <Button
                                    className="circular-btn btn--black"
                                    onClick={() => setConfirmId(confirmId === cookie._id ? null : cookie._id)}
                                >
                                    <DeleteIcon aria-hidden="true" />
                                    <span>Borrar</span>
                                </Button>

                                {confirmId === cookie._id && (
                                // 2) Estado confirmación: sale el texto y los 2 botones
                                    <div className="confirm-delete">
                                        <p className="confirm-delete__text">¿Seguro que quieres borrar esta cookie?</p>

                                        <div className="confirm-delete__actions">
                                            {/* Cancelar: quitamos la confirmación (volvemos al botón normal) */}
                                            <Button
                                                className="circular-btn btn--outline-black"
                                                onClick={() => setConfirmId(null)}
                                            >
                                                Cancelar
                                            </Button>

                                            {/* Borrar definitivo: llamamos al delete y cerramos confirmación */}
                                            <Button
                                                className="circular-btn btn--black"
                                                onClick={() => {
                                                    deleteCookie(cookie._id)
                                                    setConfirmId(null)
                                                }}
                                            >
                                                Borrar
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    }}
                />
            </section>
        </main>
    )
}
