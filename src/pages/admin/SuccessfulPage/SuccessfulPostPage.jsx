import { SuccessMessage } from "@/components/SuccessMessage/SuccessMessage"
import { Link } from "@/components/Actions/Link"

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