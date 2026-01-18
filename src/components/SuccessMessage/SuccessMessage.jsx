// ============================================================
// SUCCESS MESSAGE
//
// Componente para mostrar un mensaje de éxito (pantalla/overlay).
//
// Qué hace:
// 1) Pinta un fondo (normalmente oscuro o con blur, según CSS)
// 2) Pinta una caja central con:
//    - un título (successTitle)
//    - una zona de acciones con botones/enlaces
// 3) Incluye siempre un enlace al panel de edición
// 4) Permite añadir más acciones usando children (botón extra, link, etc.)
// ============================================================

// Estilos del componente
import "./SuccessMessage.css"

// Link reutilizable (NavLink con estilo de botón)
import { Link } from "@/components/Actions/Link"

export const SuccessMessage = ( props ) => {

    // Props:
    // - successTitle: texto principal del mensaje
    // - children: contenido extra en la zona de acciones (secondary button)
    const { successTitle, children } = props

    return (
        <div className="success-message__background">
            <div className="success-message">
                <h1 className="success-message__title  poppins-bold-uppercase">
                    {successTitle}
                </h1>
                <div className="success-message__actions">
                    <Link
                        className="success-message__action  pill-btn  solid-black--accent-vanilla"
                        to="/admin/flavors"
                    >
                        Panel de edición
                    </Link>
                    {children}
                </div>
            </div>
        </div>
    )
}