// Importación de los estilos específicos de esta página
import "./AdminAddCookiePage.css"
import { CookiesContext } from "@/context/CookiesContext"
import { getCookieData } from "@/utils/cookieFormUtils"

import { CookieForm } from "@/components/CookieForm/CookieForm"
import { useContext, useState } from "react"

export const AdminAddCookiePage = () => {

    // Del Context
    const { postCookie, postForm } = useContext(CookiesContext)
    const [resetSignal, setResetSignal] = useState(0)

    // ============================================================
    // SUBMIT (POST)
    // ============================================================
    const submitCookie = async ( e ) => {

        e.preventDefault()

        // Leemos valores del formulario
        const newCookie = getCookieData( postForm.current )

        // VALIDACIONES (las tuyas)
        if (!newCookie.image_png) return alert("La imagen es obligatoria")
        if (!newCookie.cookie_name.trim()) return alert("El nombre es obligatorio")
        if (newCookie.cookie_name.length > 25) return alert("El nombre no puede superar los 25 caracteres")
        if (!newCookie.description.trim()) return alert("La descripción es obligatoria")
        if (newCookie.description.length > 400) return alert("La descripción no puede superar los 400 caracteres")
        if (newCookie.description.length < 350) return alert("La descripción debe tener al menos 350 caracteres")

        const answer = await postCookie(newCookie)

        // Si fue bien, mandamos señal para que CookieForm borre la preview
        if (answer && !answer.error) {
        setResetSignal(n => n + 1)
        }
    }

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <section className="add-cookie">
            {/* CABECERA: título */}
            <header className="add-cookie__header">
                <h1 className="title">Añadir nueva cookie</h1>
            </header>
            <CookieForm
                mode="post"
                formRef={postForm}
                onSubmit={submitCookie}
                resetSignal={resetSignal}
            />
        </section>
    )
}
