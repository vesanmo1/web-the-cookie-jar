//ayuda de chatgpt en put y post para integrar el uso de imagenes con multer y cloudinary

import { createContext, useEffect, useState, useRef } from "react"
import { fetchHandler } from "@/services/fetchHandler";
import { getCookieData, toCookieFormData } from "@/utils/cookieFormUtils";

const { VITE_EXPRESS } = import.meta.env
// Crea el contexto global donde se almacenarán y compartirán los datos de las cookies en toda la app
export const CookiesContext = createContext()

export const CookiesProvider = ({ children }) => {

    // ===========================================================
    // HOOKS 
    // ===========================================================

    // Estado donde guardamos todas las cookies recibidas del backend    
    const [ cookies , setCookies ] = useState([])
    const [currentImageUrl, setCurrentImageUrl] = useState("")
    const [previewUrl, setPreviewUrl] = useState("")
    const postForm = useRef(null)
    const putForm  = useRef(null)

    useEffect(() => {
        requestCookies()
    }, [])

    // ============================================================
    // FUNCIONES (API / CRUD)
    // ============================================================

    const requestCookies = async ( filter = "todas" ) => {

        // Decidimos endpoint según el filtro
        let path = "/cookies"
        if ( filter === "vegana" ) { path = "/cookies/type/vegana" } 
        else if ( filter === "sin-gluten" ) { path = "/cookies/type/sin-gluten" }

        const answer = await fetchHandler("get", `${VITE_EXPRESS}${path}`)
        setCookies(answer.data)
        return answer
    }

    const postCookie = async ( e , onSuccess ) => {
        e.preventDefault()  
        
        const newCookie = getCookieData(postForm.current)

        //==================VALIDACIONES==================

        // Validación imagen obligatoria
        if (!newCookie.image_png) return alert("La imagen es obligatoria")
        
        // Validación nombre obligatorio
        if (!newCookie.cookie_name.trim()) return alert("El nombre es obligatorio")

        // Validación de longitud máxima del NOMBRE
        if (newCookie.cookie_name.length > 25) return alert("El nombre no puede superar los 25 caracteres")

        // Validación descripción obligatoria
        if (!newCookie.description.trim()) return alert("La descripción es obligatoria")

        // Validación de longitud máxima de la DESCRIPCIÓN
        if (newCookie.description.length > 400) return alert("La descripción no puede superar los 400 caracteres")

        // Validación de longitud mínima de la DESCRIPCIÓN
        if (newCookie.description.length < 350) return alert("La descripción debe tener al menos 350 caracteres")

        try {            
            const data = toCookieFormData(newCookie)
            const answer = await fetchHandler("post", `${VITE_EXPRESS}/cookies`, data)

            await requestCookies()

            postForm.current.reset()
            if (onSuccess) onSuccess()

            return answer
            
        } catch (error) {
            console.log (error)
            
        }
    }

    const toggleCookieVisibility = async ( _id , visible ) => {
        console.clear()
        console.log(`putCookieVisibility`)

        const answer = await fetchHandler(
            "put",
            `${VITE_EXPRESS}/cookies/${_id}`,
            { visible: visible }
        )
        setCookies(answer.data)
        return answer
    }

    const fillOutForm = ( _id ) => {

        const search = cookies.find( cookie => cookie._id === _id )
        if (!search) return          // <-- evita crash
        console.log ( search )

        const { id, visible, cookie_name, description, type_vegana, type_sin_gluten, image_png } = putForm.current

        // Campos normales
        id.value = search._id
        visible.checked = search.visible
        cookie_name.value = search.cookie_name
        description.value = search.description

        // Types (checkboxes Array)
        const types = search.types || []
        type_vegana.checked = types.includes("Vegana")
        type_sin_gluten.checked = types.includes("Sin gluten")

        // Input file: NO se puede rellenar con la imagen actual.
        // Lo correcto es dejarlo vacío (y así si no eliges archivo nuevo, en el PUT no se manda imagen).
        if (image_png) image_png.value = ""

        // Imagen actual (ajusta el campo según tu BD: search.image_url / search.image_png / etc.)
        setCurrentImageUrl(search.image_png || "")
        setPreviewUrl(search.image_png || "")
    }

    const putCookie = async ( e ) => {
        e.preventDefault()
        console.clear()
        console.log("Ejecutando putCookie")

        // 1) ID (del input disabled del form)
        const { id } = putForm.current

        // 2) Datos del formulario (incluye image_png si han elegido una nueva)
        const updated = getCookieData(putForm.current)

        // 3) Elegir payload según haya imagen nueva
        const payload = updated.image_png
            ? toCookieFormData(updated) // -> FormData (multer)
            : {
                // -> JSON (sin imagen)
                visible: updated.visible,
                cookie_name: updated.cookie_name,
                description: updated.description,
                types: updated.types,
            }
            const answer = await fetchHandler(
                "put",
                `${VITE_EXPRESS}/cookies/${id.value}`,
                payload
            )

            if (answer?.data) setCookies(answer.data)
            putForm.current.reset()
            return answer
        }

    const deleteCookie = async ( _id ) => {
        const answer = await fetchHandler(
            "delete",
            `${VITE_EXPRESS}/cookies/${_id}`
        )

        setCookies(answer.data)
        return answer
    }

    return (
        <CookiesContext.Provider
            value={{
                cookies,
                requestCookies,
                postCookie,
                toggleCookieVisibility,
                fillOutForm,
                putCookie,
                deleteCookie,
                postForm,
                putForm,
                currentImageUrl,
                previewUrl,
                setPreviewUrl,
            }}
        >
            {children}
        </CookiesContext.Provider>
    )
}