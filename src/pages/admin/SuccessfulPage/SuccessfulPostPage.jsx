// ============================================================
// SUCCESSFUL POST PAGE
//
// Página de confirmación tras crear (POST) una cookie.
// Renderiza el componente reutilizable <SuccessMessage /> con:
// - Un título de éxito
// - Un botón/enlace para volver a crear otra cookie
// ============================================================


// Componente reutilizable de mensaje de éxito (estructura + estilos comunes)
import { SuccessMessage } from "@/components/SuccessMessage/SuccessMessage"

// Link custom para navegar sin recargar
import { Link } from "@/components/Actions/Link"


// ============================================================
// SuccessfulPostPage
// ============================================================
export const SuccessfulPostPage = () => {

    return (
        <SuccessMessage
            successTitle="¡Cookie horneada con éxito!"
        >
            <Link
                className="success-message__action  pill-btn  ghost--accent-black"
                to="/admin/flavors/new"
            >
                Añadir otra cookie
            </Link>
        </SuccessMessage>
    )
}