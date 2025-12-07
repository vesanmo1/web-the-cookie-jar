// Importación de los estilos específicos de la página
import "./FlavorDetailsPage.css";
// Importación de hooks de React para manejar estado y efectos
import { useEffect, useState } from "react";
// Importación de useParams para leer el _id que viene en la URL (/flavors/:_id)
import { useParams } from "react-router-dom";

const FlavorDetailsPage = () => {
    // Extraemos el parámetro "_id" de la URL (definido en la ruta: /flavors/:_id)
    const { _id } = useParams();        

    // Estado donde guardaremos SOLO la cookie encontrada 
    const [ cookie , setCookie ] = useState(null)

    // Función asíncrona que pide las cookies al backend y busca la que coincide con _id
    let getCookie = async () => {
        try {
            let options = {
                method  : `get`,
                headers : {
                    "secret-api-key" : "12345"
                }
            }

            // Llamada a la API local que devuelve TODAS las cookies
            const petition  = await fetch(`http://localhost:3000/cookies` , options )
            const answer    = await petition.json()

            // Buscamos dentro del array la cookie cuyo _id coincida con el de la URL
            const foundCookie = answer.data.find((cookie) => cookie._id === _id);

            // Guardamos esa cookie en el estado
            setCookie(foundCookie || null);
            
        } catch (error) {
            console.log( error )            
        }
    }

    // useEffect se ejecuta al montar el componente y cada vez que cambie _id
    useEffect( () => {
        getCookie()
    } , [_id] )

    return (
        <>
            <Cookie {...cookie} />
        </>
    );
};

export default FlavorDetailsPage;

const Cookie = ( props ) => {
    const { cookie_name } = props
    return (
        <article className={`cookie `}>        
                <h2 className="cookie__name poppins-bold-uppercase">
                    {cookie_name}
                </h2>
        </article>
    )
}
