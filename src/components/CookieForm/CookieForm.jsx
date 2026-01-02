// ============================================================
// COOKIE FORM

// *Se ha usado CHATGPT para el input de la imagen*
// Este componente pinta:
// 1) Formulario para crear una nueva cookie (nombre + descripción + imagen PNG)
// 2) Selector de archivo personalizado (input file oculto + botón)
// 3) Preview de la imagen antes de subirla
// 4) Popup de éxito cuando la cookie se sube correctamente
// ============================================================

// Importación de estilos específicos del formulario
import "./CookieForm.css"

// HOOKS DE REACT:
// - useContext: para consumir funciones/refs del CookiesContext
// - useRef: para referenciar el input file oculto
// - useState: para manejar estados locales (preview y popup)
import { useContext, useRef, useState } from "react"
// Importamos el contexto global de cookies
import { CookiesContext } from "@/context/CookiesContext"
// Componentes botón/enlace 
import { Link } from "@/components/ButtonLink/Link"
import { Button } from "@/components/ButtonLink/Button"

export const CookieForm = () => {

    // 1) Sacamos del Context:
    // - postCookie: función que hace el POST contra tu API (y sube a Cloudinary en backend)
    // - postForm: ref del formulario para poder leer sus campos desde el Context
    const { postCookie, postForm } = useContext(CookiesContext);

    // 2) Estados locales:
    // - preview: URL temporal (blob) para mostrar la imagen ANTES de subirla
    // - showSuccess: controla si se muestra el popup de éxito
    const [ preview , setPreview ] = useState(null)
    const [ showSuccess , setShowSuccess ] = useState(false) 

    // 3) Ref al input type="file" (está oculto)
    // Lo usamos para abrir el selector con un botón custom y para limpiar el input
    const fileInput = useRef(null)

    // ============================================================
    // PREVIEW IMAGE
    // Se ejecuta al seleccionar archivo:
    // 1) Comprueba que haya archivo (si cancelan, limpia preview)
    // 2) Valida que sea PNG
    // 3) Revoca preview anterior (evita fugas de memoria)
    // 4) Crea URL temporal y la guarda para renderizar <img>
    // ============================================================
    const previewImage = ( e ) => {

        // Guardamos el primer archivo seleccionado en el input file; si el usuario no selecciona ninguno (cancela), será null
        const file = e.target.files[0] || null

        // si cancelan o quitan archivo
        if ( !file ) {
            setPreview(null)
            return
        }

        // validación rápida de imagen png
        if ( file.type !== "image/png" ) {
            alert("La imagen debe ser PNG")
            e.target.value = ""                 // limpia el input file para quitar el archivo inválido
            setPreview(null)
            return
        }

        // si ya había preview, libera la url anterior
        if ( preview ) URL.revokeObjectURL(preview)

        // Creamos preview local (no sube nada aún)
        setPreview( URL.createObjectURL(file) )

    }

    // ============================================================
    // OPEN FILE PICKER
    // Abre el selector de archivos del input oculto
    // ============================================================
    const openFilePicker = () => fileInput.current.click()

    // ============================================================
    // CLEAR PREVIEW
    // Limpia todo lo relacionado con la imagen seleccionada:
    // - revoca la URL temporal (si existe)
    // - limpia el estado preview
    // - vacía el input file real
    // Se usa:
    // - al borrar imagen manualmente
    // - cuando el POST va OK (callback desde postCookie)
    // ============================================================
    const clearPreview = () => {

        if ( preview ) URL.revokeObjectURL(preview)

        setPreview(null)

        if ( fileInput.current ) fileInput.current.value = ""
    }

    // ============================================================
    // DELETE IMAGE
    // Botón "Borrar imagen" usa la misma limpieza que CLEAR PREVIEW
    // ============================================================
    const deleteImage = () => clearPreview()

    // ============================================================
    // SUBMIT COOKIE
    // 1) Llama a postCookie del Context y le pasa clearPreview como callback
    // 2) Si la respuesta es OK, abre el popup de éxito
    // NOTA: postCookie debe aceptar (e, onSuccess) y ejecutar onSuccess tras POST OK
    // ============================================================
    const submitCookie = async ( e ) => {

        const answer = await postCookie( e , clearPreview )

        // Si no hay error => mostramos popup
        if ( answer && !answer.error ) {
            setShowSuccess(true)
        }
    }

    return (
        <section className="cookie-form">
            {/* CABECERA: título + subtítulo */}
            <header className="cookie-form__header">
                <h1 className="title">Añadir nueva cookie</h1>
            </header>
            {/* FORM:
               - onSubmit => wrapper para poder abrir popup si va OK
               - ref={postForm} => el Context lee inputs y resetea
               - encType => necesario para multipart/form-data */}
            <form className="cookie-form__form" onSubmit={submitCookie} ref={postForm} encType="multipart/form-data">
               
                {/* 1) VISIBLE (por defecto marcado) */}                
                <label>
                    <input className="checkbox" type="checkbox" name="visible" defaultChecked />
                    <span>Visible</span>                    
                </label>
                <div className="container">
                    <div className="container__img">
                        {/* 2) INPUT FILE REAL (OCULTO):
                            - este es el input real que contiene el archivo
                            - lo ocultamos para usar un botón custom */}
                        <input
                            ref={fileInput}
                            type="file"
                            name="image_png"
                            accept="image/png"
                            onChange={previewImage}
                            style={{ display: "none" }}
                        />

                        {/* BOTÓN CUSTOM:
                        - abre el selector
                        - cambia texto según haya preview o no */}
                        <button type="button" onClick={openFilePicker}>
                            { preview ? "Cambiar imagen" : "Seleccionar imagen" }
                        </button>

                        {/* PREVIEW:
                        Solo aparece si preview existe */}           
                        { preview &&
                            <>
                                <button type="button" onClick={deleteImage}> Borrar imagen </button>
                                <img src={preview} alt="preview" className="cookie-preview" />
                            </>
                        }
                    </div>
                    <div className="container__text">
                        {/* 3) TIPO: type_vegana */}
                        <div className="container__types">
                            <label className="circle-check">
                                <input className="checkbox" type="checkbox" name="type_vegana" />
                                <span className="circle-check__ui"></span>
                                Vegana
                            </label>

                            {/* 4) TIPO: type_sin_gluten */}
                            <label className="circle-check">
                                <input className="checkbox" type="checkbox" name="type_sin_gluten" />
                                <span className="circle-check__ui"></span>
                                Sin gluten
                            </label>
                        </div>
                        {/* 5) NOMBRE */}
                        <input type="text" name="cookie_name" placeholder="Nombre" maxLength={25} />
                        {/* 6) DESCRIPCIÓN */}
                        <textarea                                                   
                            name="description"
                            placeholder="Descripción"
                            maxLength={400}                                        
                        />      
                    </div>
                </div>

                {/* Submit */}
                <input type="submit" value="añadir" />
            </form>

            {/* POPUP ÉXITO:
               Solo se muestra si showSuccess es true */}
            { showSuccess && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h2>Cookie subida correctamente</h2>

                        <div className="modal-actions">
                            {/* Cierra el popup */}
                            <Button type="button" onClick={() => setShowSuccess(false)}>
                                Subir otra cookie
                            </Button>

                            {/* Navega al panel */}
                            <Link to="/panel-control">
                                Volver al panel de control
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}