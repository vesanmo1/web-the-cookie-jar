// ============================================================
// COOKIE FORM COMMON
//
// Este componente es “el formulario base” que se reutiliza en:
//
// 1) POST (crear cookie)  -> mode="post"
// 2) PUT  (editar cookie) -> mode="put"
//
// IMPORTANTE:
// - Aquí NO hay llamadas a la API.
// - Aquí SOLO hay interfaz (inputs, botones, preview, toggles).
// - El submit real (postCookie / putCookie) lo hace el componente padre.
//
// Qué recibe por props:
// - mode: "post" o "put"
// - formRef: la ref del formulario (postForm o putForm) que viene del Context
// - onSubmit: función que se ejecuta al enviar el formulario
//
// NOTA:
// - ayuda de CHATGPT para integrar el uso de imagenes con multer y cloudinary
// ============================================================

// Importación de estilos específicos del formulario
import "./CookieForm.css"

// HOOKS DE REACT:
// - useContext: para leer previewUrl/currentImageUrl en PUT
// - useEffect: limpiar preview (POST) y sincronizar toggles (PUT)
// - useRef: ref del input file oculto
// - useState: estado local para toggles y preview en POST
import { useContext, useEffect, useRef, useState } from "react"

// Context global 
import { CookiesContext } from "@/context/CookiesContext"

// Botón
import { Button } from "@/components/Actions/Button"
import { Link } from "@/components/Actions/Link"

// Fields del formulario
import { VisibleField } from "./components/VisibleField"
import { TypesField } from "./components/TypesField"
import { ImagePngField } from "./components/ImagePngField"
import { NameField } from "./components/NameField"
import { DescriptionField } from "./components/DescriptionField"

import { CloseIcon } from "@/assets/svg/button-icons/CloseIcon"
import { CheckIcon } from "@/assets/svg/button-icons/CheckIcon"

export const CookieForm = ( props ) => {

    // ============================================================
    // PROPS
    // ============================================================
    const { mode , formRef , onSubmit , submitText , resetSignal } = props

    // ============================================================
    // 2) CONTEXT (solo útil en PUT)
    //
    // currentImageUrl: URL de la imagen actual de esa cookie (la que ya existía)
    // previewUrl:      URL que se está mostrando en pantalla (puede cambiar si eliges otra)
    // setPreviewUrl:   función para cambiar previewUrl
    // ============================================================
    const { currentImageUrl , previewUrl , setPreviewUrl } = useContext(CookiesContext)

    // ============================================================
    // 3) REF: input file oculto
    //
    // Lo usamos para:
    // - abrir el selector de archivos desde un botón (sin tocar el input)
    // - limpiar el input cuando borras la imagen
    // ============================================================
    const fileInputRef = useRef(null)

    // ============================================================
    // 4) ESTADOS (useState)
    //
    // 4.1) Preview para POST:
    // - En POST guardamos la preview aquí dentro (en local).
    const [ postPreview , setPostPreview ] = useState(null)

    // 4.2) Toggles controlados (se ven en pantalla)
    // - Estos 3 valores controlan el aspecto y estado de los botones Toggle.
    const [ visible , setVisible ] = useState(true)
    const [ vegana , setVegana ] = useState(false)
    const [ sinGluten , setSinGluten ] = useState(false)

    // ============================================================
    // 5) useEffect (POST): limpiar preview al salir del componente
    //
    // - Solo se usa en POST.
    // - Si cambias de página o se desmonta el componente,
    //   quitamos el preview anterior.
    // ============================================================
    useEffect(() => {
        return () => {
            if (postPreview) URL.revokeObjectURL(postPreview)
        }
    }, [postPreview])

    // 5.5) useEffect (POST): cuando me llega la señal de reset, borro la imagen
    useEffect(() => {
        if (mode !== "post") return
        if (!resetSignal) return

        // 1) Reset de estados (lo que se ve)
        setVisible(true)
        setVegana(false)
        setSinGluten(false)

        // 2) Reset de preview + input file
        setPostPreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ""

        // 3) RECOMENDACIÓN DE CHATGPT: Reset del form real (checkboxes) 
        // Es opcional pero evitas la posiblidad de desincronización
        if (formRef?.current) {
            if (formRef.current.visible) formRef.current.visible.checked = true
            if (formRef.current.type_vegana) formRef.current.type_vegana.checked = false
            if (formRef.current.type_sin_gluten) formRef.current.type_sin_gluten.checked = false
        }
    }, [resetSignal, mode])

    // ============================================================
    // 6) useEffect (PUT): sincronizar toggles con lo que rellena fillOutForm
    //
    // Problema:
    // - fillOutForm(_id) rellena el formulario (inputs) usando formRef.current
    // - PERO los Toggle (VisibleField/TypesField) se pintan usando useState
    // - Entonces, si no copiamos el checked del formulario a los estados,
    //   el Toggle podría no reflejar lo que hay “rellenado”.
    //
    // Solución (simple):
    // - Si estamos en PUT y existe el formulario,
    //   leemos los checkboxes del formulario y actualizamos los estados.
    // ============================================================
    useEffect(() => {

        if ( mode !== "put" ) return
        if ( !formRef?.current ) return

        const { visible, type_vegana, type_sin_gluten } = formRef.current

        if ( visible ) setVisible( visible.checked )
        if ( type_vegana ) setVegana( type_vegana.checked )
        if ( type_sin_gluten ) setSinGluten( type_sin_gluten.checked )

    })

    // ============================================================
    // 7) IMAGEN (POST): cuando eliges una imagen nueva
    //
    // - Guarda preview local (postPreview)
    // - Valida que sea PNG
    // ============================================================
    const onChangePostImage = ( e ) => {

        const file = e.target.files?.[0]

        // Si cancela selección
        if ( !file ) {
            setPostPreview(null)
            return
        }

        // Validación PNG
        if ( file.type !== "image/png" ) {
            alert("La imagen debe ser PNG")
            e.target.value = ""
            setPostPreview(null)
            return
        }

        // Guardamos la preview
        setPostPreview( URL.createObjectURL(file) )
    }

    // POST: borrar imagen (preview + input file)
    const clearPostPreview = () => {
        setPostPreview(null)
        if ( fileInputRef.current ) fileInputRef.current.value = ""
    }

    // ============================================================
    // 8) IMAGEN (PUT): cuando eliges una imagen nueva
    //
    // - Guarda preview en el Context (previewUrl)
    // - Si cancelas, vuelve a la imagen actual (currentImageUrl)
    // - Valida que sea PNG
    // ============================================================
    const onChangePutImage = ( e ) => {

        const file = e.target.files?.[0]

        // Si cancelas selección: vuelves a la imagen actual
        if ( !file ) {
            setPreviewUrl( currentImageUrl || "" )
            return
        }

        // Validación PNG
        if ( file.type !== "image/png" ) {
            alert("La imagen debe ser PNG")
            e.target.value = ""
            setPreviewUrl( currentImageUrl || "" )
            return
        }

        // Guardamos preview en el Context
        setPreviewUrl( URL.createObjectURL(file) )
    }

    // PUT: borrar imagen seleccionada (pero mantenemos la imagen actual)
    const clearPutPreview = () => {
        setPreviewUrl( currentImageUrl || "" )
        if ( fileInputRef.current ) fileInputRef.current.value = ""
    }

    // ============================================================
    // 9) Abrir selector de archivos (input file oculto)
    // ============================================================
    const openFilePicker = () => fileInputRef.current.click()

    // ============================================================
    // 10) Elegimos qué preview y qué funciones usar según el modo
    //
    // - POST usa postPreview y funciones de POST
    // - PUT usa previewUrl (Context) y funciones de PUT
    // ============================================================
    const preview = mode === "put" ? previewUrl : postPreview
    const onFileChange = mode === "put" ? onChangePutImage : onChangePostImage
    const onClearPreview = mode === "put" ? clearPutPreview : clearPostPreview

    // ============================================================
    // 11) RENDER
    // ============================================================
    return (
        <section className="cookie-form max-width-1920">

            <form
                className="cookie-form__form"
                onSubmit={onSubmit}
                ref={formRef}
                encType="multipart/form-data"
            >

                {/* ID oculto para PUT */}
                {mode === "put" && (
                    <input type="hidden" name="cookie_id" />
                )}

                {/* Toggle visible */}                
                <VisibleField
                    visible={visible}
                    onChange={(e) => setVisible(e.target.checked)}
                    className={`cookie-form__visibility  pill-btn fit-btn 
                        ${visible ? "solid-black--accent-vanilla" : "ghost--accent-black"}
                    `}
                />                

                <div className="cookie-form__body">

                    {/* Imagen + preview + botones */}
                    <ImagePngField
                        fileInputRef={fileInputRef}
                        preview={preview}
                        onFileChange={onFileChange}
                        onOpenFilePicker={openFilePicker}
                        onClearPreview={onClearPreview}
                        containerImageClassName="cookie-form__image"
                        inputClassName="cookie-form__file-input"
                        buttonClassName="circular-btn  solid-black--accent-vanilla"
                        previewImgClassName="cookie-form__preview-img"
                    />

                    <div className="cookie-form__fields">

                        {/* Toggles de tipos */}
                        <TypesField
                            vegana={vegana}
                            sinGluten={sinGluten}
                            onChangeVegana={(e) => setVegana(e.target.checked)}
                            onChangeSinGluten={(e) => setSinGluten(e.target.checked)}
                            className="cookie-form__types"
                            veganaToggleClassName={`pill-btn 
                                ${vegana ? "solid-vanilla--accent--black" : "ghost--accent-vanilla"}
                            `}
                            sinGlutenToggleClassName={`pill-btn 
                                ${sinGluten ? "solid-vanilla--accent--black" : "ghost--accent-vanilla"}
                            `}
                        />

                        {/* Inputs normales */}
                        <NameField
                            containerNameClassName="cookie-form__field"
                            labelNameClassName="cookie-form__label  poppins-bold-uppercase"
                            inputNameClassName="cookie-form__name"
                        />
                        <DescriptionField
                            containerDescriptionClassName="cookie-form__field"
                            labelDescriptionClassName="cookie-form__label  poppins-bold-uppercase"
                            textareaDescriptionClassName="cookie-form__textarea"
                        />

                    </div>
                </div>

                {/* Return to the control panel */}
                <div  className="cookie-form__actions">
                    <Link
                        to={"/admin/flavors"}
                        className="cookie-form__action  pill-btn  fit-btn  ghost--accent-black"
                    >

                        <CloseIcon aria-hidden="true" />
                        <span>Cancelar</span>    

                    </Link>

                    {/* Botón submit */}
                    <Button
                        type="submit"
                        className="cookie-form__action  pill-btn  fit-btn  solid-black--accent-vanilla"
                    >

                        <CheckIcon aria-hidden="true" />
                        <span>{submitText}</span>

                    </Button>
                </div>

            </form>

        </section>
    )
}