// ============================================================
// DELETE COOKIE BUTTON
// Este componente pinta:
// 1) El botón "Borrar" normal
// 2) Si el usuario lo pulsa, muestra un bloque de confirmación
// ============================================================

// HOOKS DE REACT:
// - useContext: para usar funciones del CookiesContext (peticiones y estado global)
import { useContext } from "react" 
// Importamos el contexto global de cookies
import { CookiesContext } from "@/context/CookiesContext"
// Componente botón
import { Button } from "@/components/ButtonLink/Button"
// Importa el componente SVG del botón "Borrar"
import { DeleteIcon } from "@/assets/svg/button-icons/DeleteIcon"

export const DeleteCookieButton = (props) => {
    // 1) Datos que recibimos desde el padre (AdminFlavorsPage)
    // - cookieId: id de la cookie sobre la que estamos actuando
    // - confirmId: id de la cookie que está "pidiendo confirmación" ahora mismo
    // - setConfirmId: función para cambiar ese confirmId
    const { cookieId, confirmId, setConfirmId } = props

    // 2) Función del Context que realmente borra en el backend
    // (y luego actualiza el estado global cookies)
    const { deleteCookie } = useContext(CookiesContext)
    // 3) Esta cookie está en modo confirmación si su id coincide con confirmId
    // Esto hace que SOLO una cookie pueda mostrar confirmación a la vez.
    const isConfirming = confirmId === cookieId

    return (
        <>
            {/* ==========================
                BOTÓN "BORRAR" (estado normal)
                ========================== */}
            <Button
                className="circular-btn btn--black"
                // Al hacer click:
                // - Si esta cookie ya está confirmando => cerramos confirmación (confirmId = null)
                // - Si NO está confirmando => activamos confirmación para esta cookie (confirmId = cookieId)
                onClick={() => setConfirmId(isConfirming ? null : cookieId)}
            >
                <DeleteIcon aria-hidden="true" />
                <span>Borrar</span>
            </Button>

            {/* ==========================
                BLOQUE DE CONFIRMACIÓN
                Solo aparece si isConfirming es true
                ========================== */}
            {isConfirming && (
                <div className="confirm-delete">
                    <p className="confirm-delete__text">¿Seguro que quieres borrar esta cookie?</p>

                    <div className="confirm-delete__actions">

                        {/* CANCELAR:
                        Solo cerramos el bloque de confirmación */}
                        <Button 
                            className="circular-btn btn--outline-black" 
                            onClick={() => setConfirmId(null)}
                        >
                            Cancelar
                        </Button>

                        {/* BORRAR DEFINITIVO:
                            1) llamamos a deleteCookie(cookieId) para borrar en backend
                            2) cerramos la confirmación (confirmId = null) */}
                        <Button
                            className="circular-btn btn--black"
                            onClick={() => {
                                deleteCookie(cookieId)
                                setConfirmId(null)
                            }}
                        >
                            Borrar
                        </Button>

                    </div>
                </div>
            )}
        </>
    )
}
