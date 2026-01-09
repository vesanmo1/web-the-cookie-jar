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
import { useContext, useEffect, useRef, useState } from "react"

// Importamos el contexto global de cookies
import { CookiesContext } from "@/context/CookiesContext"

// Componentes botón/enlace 
import { Link } from "@/components/Actions/Link"
import { Button } from "@/components/Actions/Button"

// Fields
import { VisibleField } from "./components/VisibleField"
import { ImagePngField } from "./components/ImagePngField"
import { TypesField } from "./components/TypesField"
import { NameField } from "./components/NameField"
import { DescriptionField } from "./components/DescriptionField"

export const CookieFormPost = () => {

    // ===========================================================
    // HOOKS 
    // ===========================================================

    // 1) Sacamos del Context:
    // - postCookie: función que hace el POST contra la API (y sube a Cloudinary en backend)
    // - postForm: ref del formulario para poder leer sus campos desde el Context
    const { postCookie, postForm } = useContext(CookiesContext)

    // 2) Ref al input type="file" (está oculto)
    // Lo usamos para abrir el selector con un botón custom y para limpiar el input
    const fileInputRef = useRef(null)

    // 3) Estados locales:
    // - preview: URL temporal (blob) para mostrar la imagen ANTES de subirla
    // - showSuccess: controla si se muestra el popup de éxito
    const [ preview , setPreview ] = useState(null)
    const [ showSuccess , setShowSuccess ] = useState(false) 

    const [visible, setVisible] = useState(true)   
    const [vegana, setVegana] = useState(false)       
    const [sinGluten, setSinGluten] = useState(false) 
    
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview)
        }
    }, [preview])

    // ============================================================
    // FUNCIONES
    // ============================================================

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
        const file = e.target.files?.[0]

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

        setPreview(URL.createObjectURL(file))

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

        setPreview(null)

        if ( fileInput.current ) fileInput.current.value = ""
    }

    // ============================================================
    // SUBMIT COOKIE
    // 1) Llama a postCookie del Context y le pasa clearPreview como callback
    // 2) Si la respuesta es OK, abre el popup de éxito
    // NOTA: postCookie debe aceptar (e, onSuccess) y ejecutar onSuccess tras POST OK
    // ============================================================
    const submitCookie = async ( e ) => {

        e.preventDefault()
        const answer = await postCookie( e , clearPreview )

        // Si no hay error => mostramos popup
        if ( answer && !answer.error ) {

        setVisible(true)
        setVegana(false)
        setSinGluten(false)
        setShowSuccess(true)

        }
    }

    // ============================================================
    // RENDER
    // ============================================================

    return (
        <section className="cookie-form max-width-1920">
            <form
                className="cookie-form__form"
                onSubmit={submitCookie}
                ref={postForm}
                encType="multipart/form-data"
            >
                <VisibleField
                visible={visible}
                onChange={(e) => setVisible(e.target.checked)}
                />

                <div className="cookie-form__content">
                    <ImagePngField
                        fileInputRef={fileInputRef}
                        preview={preview}
                        onFileChange={previewImage}
                        onOpenFilePicker={openFilePicker}
                        onClearPreview={clearPreview}
                    />

                    <div className="cookie-form__fields">
                        <TypesField
                        vegana={vegana}
                        sinGluten={sinGluten}
                        onChangeVegana={(e) => setVegana(e.target.checked)}
                        onChangeSinGluten={(e) => setSinGluten(e.target.checked)}
                        />

                        <NameField />
                        <DescriptionField />
                    </div>
                </div>

                <Button
                type="submit"
                className="cookie-form__btn pill-btn fit-btn solid-black--accent-vanilla"
                >
                Añadir
                </Button>
            </form>

            {showSuccess && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h2>Cookie subida correctamente</h2>

                        <div className="modal-actions">
                        <Button
                            type="button"
                            onClick={() => {
                            setShowSuccess(false)
                            resetFormUI()
                            }}
                        >
                            Subir otra cookie
                        </Button>

                        <Link to="/panel-control">Volver al panel de control</Link>
                        </div>
                    </div>
                </div>
            )}
    </section>
    )
}