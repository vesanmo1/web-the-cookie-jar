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
// - Aquí SOLO hay interfaz y lógica de formulario (inputs, preview, toggles).
// - El submit real (postCookie / putCookie) lo hace el componente padre con onSubmit.
//
// Qué recibe por props:
// - mode: "post" o "put"
// - formRef: ref del formulario (se usa para leer/escribir inputs desde fuera)
// - onSubmit: función que se ejecuta al enviar el formulario
// - resetSignal: señal para resetear el formulario (solo se usa en POST)
// ============================================================

// Importación de estilos específicos del formulario
import "./CookieForm.css"

// HOOKS DE REACT:
// - useContext: para leer/escribir datos de imagen en PUT (Context)
// - useEffect: limpiar preview al desmontar + sincronizar toggles en PUT + reset en POST
// - useRef: ref del input file
// - useState: estado local para toggles y preview en POST
import { useContext, useEffect, useRef, useState } from "react"

// Context global 
import { CookiesContext } from "@/context/CookiesContext"

// Botones
import { Button } from "@/components/Actions/Button"
import { Link } from "@/components/Actions/Link"

// Fields del formulario
import { VisibleField } from "./components/VisibleField"
import { TypesField } from "./components/TypesField"
import { ImagePngField } from "./components/ImagePngField"
import { NameField } from "./components/NameField"
import { DescriptionField } from "./components/DescriptionField"

// Iconos
import { CloseIcon } from "@/assets/svg/button-icons/CloseIcon"
import { CheckIcon } from "@/assets/svg/button-icons/CheckIcon"

export const CookieForm = ( props ) => {

    // ============================================================
    // PROPS
    // ============================================================
    const { mode , formRef , onSubmit , resetSignal } = props

    // ============================================================
    // 2) CONTEXT (se usa sobre todo en PUT)
    //
    // - currentImageUrl: URL de la imagen actual que ya existe en la cookie
    // - previewUrl:      URL que se está mostrando (puede ser la actual o una nueva)
    // - setPreviewUrl:   función para cambiar el preview en el Context
    // - editingCookie:   datos de la cookie que se está editando (vienen de BBDD y
    //                    se usan para hidratar/sincronizar los toggles y otros campos)
    // ============================================================
    const { currentImageUrl, previewUrl, setPreviewUrl, editingCookie } = useContext(CookiesContext)


    // ============================================================
    // 3) REF: input file
    //
    // Lo usamos para:
    // - abrir el selector de archivos desde un botón
    // - limpiar el input cuando quitamos la imagen
    // ============================================================
    const fileInputRef = useRef(null)

    // ============================================================
    // 4) ESTADOS (useState)
    //
    // 4.1) Preview para POST:
    // - En POST guardamos la preview aquí (estado local).
    // - En PUT la preview vive en el Context (previewUrl).
    // ============================================================
    const [ postPreview , setPostPreview ] = useState(null)

    // ============================================================
    // 4.2) Toggles (lo que se ve en pantalla)
    // Estos 3 estados controlan los Toggle.
    // ============================================================
    const [ visible , setVisible ] = useState(true)
    const [ vegana , setVegana ] = useState(false)
    const [ sinGluten , setSinGluten ] = useState(false)

    // ============================================================
    // 5) useEffect: limpiar URL de preview al desmontar (solo aplica a POST)
    //
    // Cuando creas un ObjectURL con URL.createObjectURL(file),
    // conviene liberarlo con URL.revokeObjectURL(...) al desmontar.
    // ============================================================
    useEffect(() => {
        return () => {
            if (postPreview) URL.revokeObjectURL(postPreview)
        }
    }, [postPreview])

    // ============================================================
    // 6) useEffect (POST): reset cuando llega resetSignal
    //
    // Solo tiene sentido en POST (crear cookie).
    // - Resetea toggles
    // - Quita la preview
    // - Limpia el input file
    // - (Opcional) fuerza checked en el form real para no desincronizar
    // ============================================================
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
        // Esto evita que el DOM del formulario se quede con checks viejos.
        if (formRef?.current) {
            if (formRef.current.visible) formRef.current.visible.checked = true
            if (formRef.current.type_vegana) formRef.current.type_vegana.checked = false
            if (formRef.current.type_sin_gluten) formRef.current.type_sin_gluten.checked = false
        }

    }, [resetSignal, mode])

// ============================================================
// 7) useEffect (PUT): hidratar y mantener sincronizados los toggles en edición
//
// En PUT los valores reales (visible / vegana / sinGluten) vienen de la cookie
// cargada desde la BBDD y guardada en `editingCookie` (Context).
//
// Este efecto hace 2 cosas:
// 1) Context -> Estado React: actualiza los estados locales que pintan la UI
//    - editingCookie.visible   -> setVisible(...)
//    - editingCookie.vegana    -> setVegana(...)
//    - editingCookie.sinGluten -> setSinGluten(...)
//
// 2) Context -> DOM del formulario: fuerza el `.checked` de los inputs
//    para que `getCookieData(formRef.current)` lea lo mismo que se ve en pantalla.
//    Esto evita desincronizaciones entre UI (React) y valores del formulario (DOM).
// ============================================================
    useEffect(() => {
    if (mode !== "put") return
    if (!editingCookie) return

    setVisible(editingCookie.visible)
    setVegana(editingCookie.vegana)
    setSinGluten(editingCookie.sinGluten)

        // Con ayuda de CHATGPT: Fuerza el estado del DOM del formulario para que coincida con la UI
        if (formRef?.current) {
            if (formRef.current.visible) formRef.current.visible.checked = editingCookie.visible
            if (formRef.current.type_vegana) formRef.current.type_vegana.checked = editingCookie.vegana
            if (formRef.current.type_sin_gluten) formRef.current.type_sin_gluten.checked = editingCookie.sinGluten
        }
    }, [mode, editingCookie?.id])

    // ============================================================
    // 8) IMAGEN (POST): cuando eliges una imagen nueva
    //
    // - Guarda preview local (postPreview)
    // - Si cancelas, quita el preview
    // - Valida que sea PNG
    //
    // NOTA:
    // - Esta función forma parte del código hecho con CHATGPT 
    //   para la implementación de imágenes en el CRUD
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
    // 9) IMAGEN (PUT): cuando eliges una imagen nueva
    //
    // - Guarda preview en el Context (previewUrl)
    // - Si cancelas, vuelve a la imagen actual (currentImageUrl)
    // - Valida que sea PNG
    //
    // NOTA:
    // - Esta función forma parte del código hecho con CHATGPT 
    //   para la implementación de imágenes en el CRUD
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
    // 10) Abrir selector de archivos
    // ============================================================
    const openFilePicker = () => fileInputRef.current.click()

    // ============================================================
    // 11) Elegimos qué preview y qué funciones usar según el modo
    // ============================================================
    const preview = mode === "put" ? previewUrl : postPreview
    const onFileChange = mode === "put" ? onChangePutImage : onChangePostImage
    const onClearPreview = mode === "put" ? clearPutPreview : clearPostPreview

    // ============================================================
    // 12) RENDER
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
                        containerImageClassName="cookie-form__image  image-field"
                        inputClassName="image-field__input"
                        infoAndActionClassName ="image-field__info-actions"
                        textBlockClassName ="image-field__text-block"
                        titleTextClassName ="image-field__title  poppins-bold-uppercase"
                        helperTextClassName ="image-field__help"
                        buttonClassName="circular-btn  solid-black--accent-vanilla"
                        previewImgClassName="image-field__preview"
                    />

                    <div className="cookie-form__fields">

                        {/* Toggles de tipos */}
                        <TypesField
                            vegana={vegana}
                            sinGluten={sinGluten}
                            onChangeVegana={(e) => setVegana(e.target.checked)}
                            onChangeSinGluten={(e) => setSinGluten(e.target.checked)}
                            className="cookie-form__types"
                            veganaToggleClassName={`cookie-form__type  pill-btn 
                                ${vegana ? "solid-vanilla--accent--black" : "ghost--accent-vanilla"}
                            `}
                            sinGlutenToggleClassName={`cookie-form__type  pill-btn 
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
                        <span>Guardar</span>

                    </Button>
                </div>

            </form>

        </section>
    )
}