import { SuccessMessage } from "@/components/SuccessMessage/SuccessMessage"
import { Button } from "@/components/Actions/Button"
import { useNavigate } from "react-router-dom";

export const SuccessfulPutPage = () => {

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