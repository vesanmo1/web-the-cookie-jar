// ============================================================
// ADMIN EDIT COOKIE PAGE
//
// Página de administración para editar (PUT) una cookie existente.
// Se encarga de:
// 1) Leer el _id desde la URL (/admin/flavors/edit/:_id)
// 2) Asegurar que existe la lista de cookies en memoria:
//    - si vienes de refresh y cookies está vacío, pide al backend
// 3) Rellenar el formulario de edición con los datos de esa cookie (fillOutForm)
// 4) Validar campos antes de guardar
// 5) Llamar a putCookie() del Context para actualizar en backend
// 6) Si todo va bien, navegar a /admin/put-successful
// ============================================================


// Importación de estilos específicos de esta página
import "./AdminEditCookiePage.css"

import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { CookiesContext } from "@/context/CookiesContext"
import { getCookieData } from "@/utils/cookieFormUtils"

import { CookieForm } from "@/components/CookieForm/CookieForm"


// ============================================================
// AdminEditCookiePage
// ============================================================
export const AdminEditCookiePage = () => {

    // Sacamos el _id desde la URL
    const { _id } = useParams()

    // Navegación tras guardar
    const navigate = useNavigate()

    // Del Context:
    // - cookies: lista en memoria (puede venir vacía si recargas)
    // - requestCookies: trae cookies del backend
    // - putForm: ref al formulario PUT
    // - fillOutForm: rellena inputs del formulario con datos existentes
    // - putCookie: hace PUT al backend (lee el formulario internamente)
    const {
        cookies,
        requestCookies,
        putForm,
        fillOutForm,
        putCookie,
    } = useContext(CookiesContext)

    // Si refrescas la página, cookies puede venir vacío -> pedimos al backend
    // NOTA:
    // - Me di cuenta que al refrescar se borraban los datos de la cookie
    //   y pregunté a CHATGPT cómo resolver el problema
    useEffect(() => {
        if (!cookies.length) requestCookies()
    }, [])

    // Cuando ya existen cookies, rellenamos el formulario con fillOutForm(_id)
    useEffect(() => {
        if (_id && cookies.length) {
            requestAnimationFrame(() => fillOutForm(_id))
        }
    }, [_id, cookies])

    // ============================================================
    // SUBMIT (PUT)
    // - Previene submit nativo
    // - Valida los campos (sin exigir imagen nueva)
    // - Llama a putCookie() del Context para actualizar
    // ============================================================
    const submitPut = async ( e ) => {

        e.preventDefault()

        // Leemos valores del formulario PUT (para validar)
        const updated = getCookieData( putForm.current )

        // ===================== VALIDACIONES =====================

        if (!updated.cookie_name.trim()) return alert("El nombre es obligatorio")
        if (updated.cookie_name.length > 25) return alert("El nombre no puede superar los 25 caracteres")

        if (!updated.description.trim()) return alert("La descripción es obligatoria")
        if (updated.description.length > 400) return alert("La descripción no puede superar los 400 caracteres")
        if (updated.description.length < 350) return alert("La descripción debe tener al menos 350 caracteres")

        // ========================================================


        // Guardamos usando la función del Context (PUT al backend)
        // Nota: putCookie ya hace e.preventDefault() internamente,
        // pero aquí lo mantenemos para evitar el submit nativo igualmente.
        const answer = await putCookie(e)

        // Si todo fue bien, redirigimos a la página de éxito
        if (answer?.data) {
            navigate("/admin/put-successful")
        } else {
            alert("No se pudo guardar la cookie")
        }
    }

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <section className="edit-cookie">

            {/* CABECERA: título */}
            <header className="edit-cookie__header">
                <h1 className="title">Editar cookie</h1>
            </header>

            {/* Formulario reutilizable en modo PUT */}
            <CookieForm
                mode="put"
                formRef={putForm}
                onSubmit={submitPut}
            />
        </section>
    )
}