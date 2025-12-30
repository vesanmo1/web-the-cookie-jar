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

    const postCookie = async ( e ) => {
        e.preventDefault()

        const  [ cookie_name , description ]  = postForm.current
 
        const newCookie = {
            cookie_name : cookie_name.value,
            description : description.value
        }

        console.log (newCookie)

        try {
            let options = {
                method: "post",
                headers: {
                    "Content-type": "application/json",
                    "secret-api-key": "12345"
                },
            body: JSON.stringify(newCookie)
            }

            let petition = await fetch(`${VITE_EXPRESS}/cookies`, options)
            let answer   = await petition.json()

            setCookies(answer.data)
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