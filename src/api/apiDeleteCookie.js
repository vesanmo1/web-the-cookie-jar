const { VITE_EXPRESS } = import.meta.env

const deleteCookie = async ( _id ) => {
    console.log( _id )

    try {

        const options = {
            method : "delete",
            headers : {
                "api-secret-key" : "12345"
            }
        }
        const petition = await fetch( `${VITE_EXPRESS}/cookies/${_id}` , options )
        const answer = await petition.json()
        setCookies(answer.data)

    } catch (error) {

        console.log ( error )

    }
}