// ============================================================
// ADMIN ADD COOKIE PAGE
//
// Página de administración para crear (POST) una nueva cookie.
// Se encarga de:
// 1) Renderizar el formulario reutilizable <CookieForm /> en modo "post"
// 2) Validar los campos antes de enviar
// 3) Llamar a postCookie() del Context para crear la cookie en backend
// 4) Si todo va bien:
//    - mandar señal de reset a CookieForm (para limpiar preview)
//    - navegar a /admin/post-successful
// ============================================================


// Importación de los estilos específicos de esta página
import "./AdminAddCookiePage.css"

// Context global: expone postCookie() y la ref del formulario postForm
import { CookiesContext } from "@/context/CookiesContext"

// Helper: lee los inputs del formulario y devuelve un objeto con los valores
import { getCookieData } from "@/utils/cookieFormUtils"

// Formulario reutilizable para POST/PUT (según props)
import { CookieForm } from "@/components/CookieForm/CookieForm"

// React:
// - useContext: consumir CookiesContext
// - useState: señal simple para reseteos (preview) en el hijo
import { useContext, useState } from "react"

// React Router:
// - useNavigate: redirigir tras éxito (POST successful)
import { useNavigate } from "react-router-dom"


// ============================================================
// AdminAddCookiePage
// ============================================================
export const AdminAddCookiePage = () => {

    // Navegación programática tras guardar
    const navigate = useNavigate()

    // Del Context:
    // - postCookie: función que crea la cookie en backend
    // - postForm: ref al formulario (para leer inputs)
    const { postCookie, postForm } = useContext(CookiesContext)

    // Señal de reset para el componente CookieForm (ej: limpiar preview de imagen)
    const [resetSignal, setResetSignal] = useState(0)

    // ============================================================
    // SUBMIT (POST)
    // - Previene el submit nativo
    // - Lee los valores desde el formRef
    // - Valida reglas del formulario
    // - Llama al Context para crear la cookie
    // ============================================================
    const submitCookie = async ( e ) => {

        e.preventDefault()

        // Leemos valores del formulario
        const newCookie = getCookieData( postForm.current )

        // ===================== VALIDACIONES =====================

        if (!newCookie.image_png) return alert("La imagen es obligatoria")
        if (!newCookie.cookie_name.trim()) return alert("El nombre es obligatorio")
        if (newCookie.cookie_name.length > 25) return alert("El nombre no puede superar los 25 caracteres")
        if (!newCookie.description.trim()) return alert("La descripción es obligatoria")
        if (newCookie.description.length > 400) return alert("La descripción no puede superar los 400 caracteres")
        if (newCookie.description.length < 350) return alert("La descripción debe tener al menos 350 caracteres")

        // ========================================================
        
        // Llamada al Context (POST al backend)
        const answer = await postCookie(newCookie)

        // Si fue bien, mandamos señal para que CookieForm borre la preview
        // y navegamos a la página de éxito
        if (answer && !answer.error) {
            setResetSignal(n => n + 1)
            navigate("/admin/post-successful")
        } else {
            alert("No se pudo guardar la cookie")
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

            {/* Formulario reutilizable en modo POST */}
            <CookieForm
                mode="post"
                formRef={postForm}
                onSubmit={submitCookie}
                resetSignal={resetSignal}
            />
        </section>
    )
}
