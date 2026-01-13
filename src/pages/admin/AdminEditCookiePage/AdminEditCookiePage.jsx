// Importación de estilos específicos de esta página
import "./AdminEditCookiePage.css"

import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"

import { CookiesContext } from "@/context/CookiesContext"
import { getCookieData } from "@/utils/cookieFormUtils"

import { CookieForm } from "@/components/CookieForm/CookieForm"

export const AdminEditCookiePage = () => {

    // 1) Sacamos el _id desde la URL
    const { _id } = useParams()

    // 2) Sacamos del Context lo necesario
    const {
        cookies,
        requestCookies,
        putForm,
        fillOutForm,
        putCookie,
    } = useContext(CookiesContext)

    // 3) Si refrescas la página, cookies puede venir vacío -> pedimos al backend
    useEffect(() => {
        if (!cookies.length) requestCookies()
    }, [])

    // 4) Cuando ya existen cookies, rellenamos el formulario con fillOutForm(_id)
    useEffect(() => {
        if (_id && cookies.length) fillOutForm(_id)
    }, [_id, cookies])

    // ============================================================
    // SUBMIT (PUT)
    // ============================================================
    const submitPut = async ( e ) => {

      e.preventDefault()

      // Leemos valores del formulario PUT
      const updated = getCookieData( putForm.current )

          // ===================== VALIDACIONES =====================

      if (!updated.cookie_name.trim()) return alert("El nombre es obligatorio")
      if (updated.cookie_name.length > 25) return alert("El nombre no puede superar los 25 caracteres")

      if (!updated.description.trim()) return alert("La descripción es obligatoria")
      if (updated.description.length > 400) return alert("La descripción no puede superar los 400 caracteres")
      if (updated.description.length < 350) return alert("La descripción debe tener al menos 350 caracteres")

          // ========================================================

        await putCookie( e )
    }

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <main className="add-cookie">
            {/* CABECERA: título */}
            <header className="add-cookie__header">
                <h1 className="title">Editar cookie</h1>
            </header>
            <CookieForm
                mode="put"
                formRef={putForm}
                onSubmit={submitPut}
                submitText="Guardar"
            />
        </main>
    )
}