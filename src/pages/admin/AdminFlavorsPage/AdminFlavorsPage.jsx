// Importación de los estilos específicos de esta página
import "./AdminFlavorsPage.css"
// Componente que pinta el listado de cookies
import { CookiesCatalogue } from "@/components/CookiesCatalogue/CookiesCatalogue"
// Componente botón/enlace que se usa dentro de cada tarjeta de cookie
import { Link } from "@/components/ButtonLink/Link"
// Componente botón/enlace que se usa dentro de cada tarjeta de cookie
import { Button } from "@/components/ButtonLink/Button"
// Importa el componente SVG del botón "Salir del editor"
import { UndoIcon } from '@/assets/svg/button-icons/UndoIcon'
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
// Función que hace la petición al servidor para obtener las cookies
import { apiRequestCookies } from "@/api/apiRequestCookies"

export const AdminFlavorsPage = () => {

    // Estado donde guardamos todas las cookies recibidas del backend    
    const [ cookies , setCookies ] = useState([])

    // Función que hace la petición al servidor para obtener las cookies
    const requestCookies = async () => {
        console.clear()
        console.log(`Ejecutando requestCookies con filtro: ${filter}`)

        try {
            // Llamada a la API (usando client.js)
            const answer = await apiRequestCookies("/cookies")

            // Guardamos el array de cookies en el estado
            setCookies( answer.data )
            
        } catch (error) {
            console.log( error )            
        }
    }

    useEffect( ()=> {

        requestCookies()

    } , [])

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
                    renderCookieChildren={(cookie) => (
                        <div className="admin-flavors__item-actions">
                            <Button className="circular-btn  btn--black">     
                                <VisibilityOffIcon aria-hidden="true" />      
                                <span>Oculta</span>                  
                            </Button>
                            <Link className="circular-btn  btn--black" route={`/admin/flavors/edit/${cookie._id}`}>                                
                                <EditIcon aria-hidden="true" />
                                <span>Editar</span>
                            </Link>
                            <Button className="circular-btn  btn--black">                                
                                <DeleteIcon aria-hidden="true" />
                                <span>Borrar</span>
                            </Button>
                        </div>
                    )}
                />
            </section>
        </main>
    )
}
