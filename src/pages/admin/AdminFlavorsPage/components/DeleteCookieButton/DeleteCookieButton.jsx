// ============================================================
// DELETE COOKIE BUTTON
// Este componente pinta:
// 1) El botón "Borrar" normal
// 2) Si el usuario lo pulsa, muestra un bloque de confirmación
// ============================================================

// Importación de los estilos específicos de este componente
import "./DeleteCookieButton.css"
// HOOKS DE REACT:
// - useContext: para usar funciones del CookiesContext (peticiones y estado global)
import { useContext } from "react" 
// Importamos el contexto global de cookies
import { CookiesContext } from "@/context/CookiesContext"
// Función utilitaria: devuelve una clase de color según el índice (patrón visual)
import { themeClassLight } from "@/utils/colorPattern"
// Componente botón
import { Button } from "@/components/Actions/Button"
// Importa el componente SVG del botón "Borrar"
import { DeleteIcon } from "@/assets/svg/button-icons/DeleteIcon"
// Importa el componente SVG del botón "Borrar"
import { UndoIcon } from "@/assets/svg/button-icons/UndoIcon"

export const DeleteCookieButton = (props) => {
    // 1) Datos que recibimos desde el padre (AdminFlavorsPage)
    // - cookieId: id de la cookie sobre la que estamos actuando
    // - confirmId: id de la cookie que está "pidiendo confirmación" ahora mismo
    // - setConfirmId: función para cambiar ese confirmId
    const { cookieId, confirmId, setConfirmId, index } = props

    // 2) Función del Context que realmente borra en el backend
    // (y luego actualiza el estado global cookies)
    const { deleteCookie } = useContext(CookiesContext)
    // 3) Esta cookie está en modo confirmación si su id coincide con confirmId
    // Esto hace que SOLO una cookie pueda mostrar confirmación a la vez.
    const isConfirming = confirmId === cookieId

    return (
        <div className="delete-control">
            {/* ==========================
                BOTÓN "BORRAR" (estado normal)
                ========================== */}
            <Button
                className={`delete-control__btn  circular-btn  solid-black--accent-${themeClassLight(index)}`}
                // Al hacer click:
                // - Si esta cookie ya está confirmando => cerramos confirmación (confirmId = null)
                // - Si NO está confirmando => activamos confirmación para esta cookie (confirmId = cookieId)
                onClick={() => setConfirmId(isConfirming ? null : cookieId)}
            >
                <DeleteIcon className="delete-control__icon" aria-hidden="true" />
                <span className="delete-control__text">Borrar</span>
            </Button>

            {/* ==========================
                BLOQUE DE CONFIRMACIÓN
                Solo aparece si isConfirming es true
                ========================== */}
                <div className={`confirm-delete ${isConfirming ? "active" : ""}`}>
                    <p className={`confirm-delete__text  confirm-delete__text--${themeClassLight(index)}`}> ¿Seguro que quieres borrar esta cookie? </p>

                    <div className="confirm-delete__actions">

                        {/* CANCELAR:
                        Solo cerramos el bloque de confirmación */}
                        <Button 
                            className={`confirm-delete__btn  circular-btn  ghost--accent-${themeClassLight(index)}`} 
                            onClick={() => setConfirmId(null)}
                        >
                            <UndoIcon className="delete-control__icon" aria-hidden="true" />
                            <span className="delete-control__text">Cerrar</span>
                        </Button>

                        {/* BORRAR DEFINITIVO:
                            1) llamamos a deleteCookie(cookieId) para borrar en backend
                            2) cerramos la confirmación (confirmId = null) */}
                        <Button
                            className={`confirm-delete__btn  circular-btn  solid-${themeClassLight(index)}--accent--black`}
                            onClick={() => {
                                deleteCookie(cookieId)
                                setConfirmId(null)
                            }}
                        >
                            <DeleteIcon className="delete-control__icon" aria-hidden="true" />
                            <span className="delete-control__text">Borrar</span>
                        </Button>

                    </div>
                </div>
        </div>
    )
}
