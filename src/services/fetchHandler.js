// ============================================================
// FETCH HANDLER
//
// Esta función sirve para reutilizar siempre el mismo fetch en toda la app.
// Así se evita repetir opciones y headers en cada GET/POST/PUT/DELETE.
//
// Qué hace:
// 1) Recibe un objeto props con: method, url y (opcional) data
// 2) Crea el objeto options de fetch (method + headers)
// 3) Si hay data, decide si enviarla como:
//    - FormData (para imágenes con Multer)  -> NO pone Content-Type
//    - JSON (para POST/PUT normales)        -> pone Content-Type application/json
// 4) Ejecuta fetch(url, options)
// 5) Convierte la respuesta a JSON y la devuelve
//
// IMPORTANTE:
// - Siempre manda el header "secret-api-key"
// - Si hay error de red o algo falla, lo muestra por consola
// ============================================================
    
    export const fetchHandler = async ( props ) => {

        
        // Sacamos del objeto props lo que necesitamos
        // method: "get" | "post" | "put" | "delete"
        // url: endpoint completo (ej: http://localhost:3000/cookies)
        // data: (opcional) body que se quiere enviar al backend
        const {  method , url , data  } = props

        try {

        // ============================================================
        // OPTIONS BASE
        // Aquí construimos el objeto options que necesita fetch()
        // ============================================================
            let options = {
                method : method,
                headers : {
                    "secret-api-key" : "12345"
                },
            }

        // ============================================================
        // BODY (DATA) -> SOLO si existe "data"
        // ============================================================
            if (data) {
                
                // ------------------------------------------------------------
                // CASO 1: FormData (Multer)
                // Si data es FormData, significa que estamos enviando archivos.
                // OJO: No ponemos "Content-Type" porque el navegador lo calcula
                // automáticamente con el boundary correcto.
                // ------------------------------------------------------------
                if (data instanceof FormData) {
                    options.body = data
                }
                // ------------------------------------------------------------
                // CASO 2: JSON normal 
                // Si data es un objeto normal y el método es post o put:
                // - añadimos Content-Type
                // - convertimos el objeto a string JSON
                // ------------------------------------------------------------
                else if ( method === "post" || method === "put" ) {
                    options.headers["Content-Type"] = "application/json"
                    options.body = JSON.stringify(data)
                }
            }

                // ============================================================
                // PETICIÓN FETCH
                // petition = respuesta "cruda" (Response)
                // ============================================================
                const petition = await fetch(url, options)

                // ============================================================
                // RESPUESTA A JSON
                // Convertimos el body de la respuesta a JSON
                // y lo devolvemos para usarlo en el componente o en el Context
                // ============================================================
                const answer = await petition.json()
                return answer

        } catch (error) {
            // Si falla la red, el servidor está caído, etc.
            console.log ( error )
            
        }
    } 