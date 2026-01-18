// ============================================================ 
// DELETE COOKIE BUTTON
//
// Componente de acción para borrar una cookie desde el panel admin.
// Pinta:
// 1) Botón "Borrar" (estado normal)
// 2) Bloque de confirmación cuando esa cookie está en modo confirmación
//
// Nota:
// - La confirmación NO se gestiona internamente aquí.
//   El estado confirmId / setConfirmId viene del padre para asegurar que
//   SOLO una cookie puede estar confirmando a la vez.
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

// Componente botón reutilizable
import { Button } from "@/components/Actions/Button"

// Iconos SVG
import { DeleteIcon } from "@/assets/svg/button-icons/DeleteIcon"
import { UndoIcon } from "@/assets/svg/button-icons/UndoIcon"


// ============================================================
// DeleteCookieButton
// Props:
// - cookieId (string): id de la cookie a borrar
// - confirmId (string | null): id de la cookie que está confirmando ahora mismo
// - setConfirmId (function): setter para abrir/cerrar confirmación
// - index (number): índice de la cookie (para tema visual por patrón)
// ============================================================
export const DeleteCookieButton = (props) => {

    // Datos que recibimos desde el padre
    const { cookieId, confirmId, setConfirmId, index } = props

    // Función del Context que borra en el backend y actualiza el estado global
    const { deleteCookie } = useContext(CookiesContext)

    // Esta cookie está en modo confirmación si su id coincide con confirmId
    // Esto hace que SOLO una cookie pueda mostrar confirmación a la vez
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
