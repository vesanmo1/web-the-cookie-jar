import { createContext, useEffect, useState } from "react"

const { VITE_EXPRESS } = import.meta.env
// Crea el contexto global donde se almacenarán y compartirán los datos de las cookies en toda la app
export const CookiesContext = createContext()

export const CookiesProvider = ({ children }) => {

    // Estado donde guardamos todas las cookies recibidas del backend    
    const [ cookies , setCookies ] = useState([])

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
            const petition  = await fetch(`${VITE_EXPRESS}${path}`, options)
            const answer    = await petition.json()

            // Guardamos el array de cookies en el estado
            setCookies( answer.data )
            return answer

        } catch (error) {
            console.log( error )            
        }
    }


    return (
        <CookiesContext.Provider value={{ cookies, requestCookies }}>
            {children}
        </CookiesContext.Provider>
    )
}