const { VITE_EXPRESS } = import.meta.env

// Función que hace la petición al servidor para obtener las cookies
export const apiRequestCookies = async (path) => {
    console.clear()
    console.log(`Ejecutando apiRequestCookies`)

    try {

        let options = {
            method  : `get`,
            headers : {
                "secret-api-key" : "12345"
            }
        }
        console.log("URL FINAL:", `${VITE_EXPRESS}${path}`)
        // Llamada a la API local
        const petition  = await fetch(`${VITE_EXPRESS}${path}`, options)
        const answer    = await petition.json()

            if (!petition.ok) {
                throw new Error(answer?.message || `HTTP error ${petition.status}`)
            }

        return answer

    } catch (error) {
        console.log( error ) 
        throw error           
    }
}