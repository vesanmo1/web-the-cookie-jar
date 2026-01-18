// ============================================================
// SUCCESSFUL PUT PAGE
//
// Página de confirmación tras editar (PUT) una cookie.
// Renderiza el componente reutilizable <SuccessMessage /> con:
// - Un título de éxito
// - Un botón para volver a la página anterior (navigate(-1))
// ============================================================


// Componente reutilizable de mensaje de éxito (estructura + estilos comunes)
import { SuccessMessage } from "@/components/SuccessMessage/SuccessMessage"

// Botón reutilizable (acción dentro del mensaje)
import { Button } from "@/components/Actions/Button"

// React Router:
// - useNavigate: navegación programática (volver atrás)
import { useNavigate } from "react-router-dom"


// ============================================================
// SuccessfulPutPage
// ============================================================
export const SuccessfulPutPage = () => {

    // navigate(-1) vuelve a la ruta anterior del historial
    const navigate = useNavigate();

    return (
        <SuccessMessage
            successTitle="¡Receta mejorada con éxito!"
        >
            <Button
                className="success-message__action  pill-btn  ghost--accent-black"
                onClick={() => navigate(-1)}
            >
                Volver a editar
            </Button>
        </SuccessMessage>
    )
}