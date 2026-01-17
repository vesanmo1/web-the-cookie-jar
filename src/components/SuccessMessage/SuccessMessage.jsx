import "./SuccessMessage.css"
import { Link } from "@/components/Actions/Link"

export const SuccessMessage = ( props ) => {

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