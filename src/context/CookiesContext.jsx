import { createContext, useEffect, useState, useRef } from "react"

const { VITE_EXPRESS } = import.meta.env
// Crea el contexto global donde se almacenarán y compartirán los datos de las cookies en toda la app
export const CookiesContext = createContext()

export const CookiesProvider = ({ children }) => {

    // Estado donde guardamos todas las cookies recibidas del backend    
    const [ cookies , setCookies ] = useState([])
    const postForm = useRef(null)

    useEffect(() => {
        requestCookies()
    }, [])

    // Función que hace la petición al servidor para obtener las cookies
    const requestCookies = async (filter = "todas") => {
        console.clear()
        console.log(`Ejecutando requestCookies`)

        try {
            let options = {
                method  : `get`,
                headers : {
                    "secret-api-key" : "12345"
                }
            }

            // Decidimos endpoint según el filtro
            let path = "/cookies"
            if ( filter === "vegana" ) { path = "/cookies/type/vegana" } 
            else if ( filter === "sin-gluten" ) { path = "/cookies/type/sin-gluten" }

            // Llamada a la API local
            let petition  = await fetch(`${VITE_EXPRESS}${path}`, options)
            let answer  = await petition.json()

            // Guardamos el array de cookies en el estado
            setCookies( answer.data )

            return answer

        } catch (error) {
            console.log( error )            
        }
    }

    const deleteCookie = async (_id) => {
        console.log(_id)

        try {

            let options = {
                method : "delete",
                headers : {
                    "secret-api-key" : "12345"
                }
            }  

        
            let petition = await fetch(`${VITE_EXPRESS}/cookies/${_id}`, options)
            let answer   = await petition.json()
            setCookies(answer.data)

            return answer

        } catch (error) {
            console.log(error)
        }
    }

    const postCookie = async ( e , onSuccess ) => {
        e.preventDefault()

        const form = postForm.current

        const visible        = form.elements.namedItem("visible")
        const image_png      = form.elements.namedItem("image_png")
        const cookie_name    = form.elements.namedItem("cookie_name")
        const description    = form.elements.namedItem("description")
        const type_vegana    = form.elements.namedItem("type_vegana")
        const type_sin_gluten= form.elements.namedItem("type_sin_gluten")
        
        const isVisible = visible.checked
        
        const types = []
            if ( type_vegana.checked ) types.push("Vegana")
            if ( type_sin_gluten.checked ) types.push("Sin gluten")        
        
        const newCookie = {
            visible     : isVisible,
            image_png   : image_png.files[0] || null,
            types       : types,
            cookie_name : cookie_name.value,
            description : description.value                                
        }

        console.log (newCookie)

        // Validación imagen obligatoria
        if (!newCookie.image_png) {                   
            alert("La imagen es obligatoria")             
            return                                   
        }
        
        // Validación nombre obligatorio
        if (!newCookie.cookie_name.trim()) {               
            alert("El nombre es obligatorio")                         
            return                                          
        }

        // Validación de longitud máxima del NOMBRE
        if (newCookie.cookie_name.length > 25) {           
            alert("El nombre no puede superar los 25 caracteres")
            return
        }

        // Validación descripción obligatoria
        if (!newCookie.description.trim()) {                
            alert("La descripción es obligatoria")                   
            return                                          
        }

        // Validación de longitud máxima de la DESCRIPCIÓN
        if (newCookie.description.length > 400) {       
            alert("La descripción no puede superar los 400 caracteres")
            return
        }

        // Validación de longitud mínima de la DESCRIPCIÓN
        if (newCookie.description.length < 350) {       
            alert("La descripción debe tener al menos 350 caracteres")
            return
        }

        try {

            // MULTER (CON CHATGPT Y EJEMPLO DE CLASE): FormData en vez de JSON
            const data = new FormData()
            data.append("visible", String(newCookie.visible))
            // MULTER (CON CHATGPT Y EJEMPLO DE CLASE)
            if (newCookie.image_png) data.append("image_png", newCookie.image_png)
            data.append("cookie_name", newCookie.cookie_name)
            data.append("description", newCookie.description)
            data.append("types", JSON.stringify(newCookie.types))          

            let options = {
                method: "post",
                headers: {
                    "secret-api-key": "12345"
                },
            body: data
            }

            let petition = await fetch(`${VITE_EXPRESS}/cookies`, options)
            let answer   = await petition.json()

            setCookies(answer.data)
            // Limpiar formulario tras POST OK
            postForm.current.reset()
            if ( onSuccess ) onSuccess()
            return answer
            
        } catch (error) {
            console.log (error)
            
        }
    }

    const toggleCookieVisibility = async (_id, visible) => {
        console.clear()
        console.log(`putCookieVisibility`)

        let updatedVisibility = {
            visible: visible
        }
         console.log(updatedVisibility)

        try {
            let options = {
                method: "put",
                headers: {
                    "Content-type": "application/json",
                    "secret-api-key": "12345"
                },
            body: JSON.stringify(updatedVisibility)
            }

            let petition = await fetch(`${VITE_EXPRESS}/cookies/${_id}`, options)
            let answer   = await petition.json()

            setCookies(answer.data)
            return answer

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CookiesContext.Provider 
            value={{ 
                cookies, 
                requestCookies, 
                deleteCookie, 
                postCookie,
                postForm,
                toggleCookieVisibility 
            }}
        >
            {children}
        </CookiesContext.Provider>
    )
}