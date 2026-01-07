    export const fetchHandler = async ( method , url , data ) => {
        try {
            let options = {
                method : method,
                headers : {
                    "secret-api-key" : "12345"
                },
            }

            // Si hay body:
            if (data) {
                // MULTER: FormData (NO Content-Type)
                if (data instanceof FormData) {
                    options.body = data
                }
                // JSON: objeto normal
                else if ( method === "post" || method === "put" ) {
                    options.headers["Content-Type"] = "application/json"
                    options.body = JSON.stringify(data)
                }
            }

                const petition = await fetch(url, options)

                const answer = await petition.json()
                return answer

        } catch (error) {
            console.log ( error )
            
        }
    } 