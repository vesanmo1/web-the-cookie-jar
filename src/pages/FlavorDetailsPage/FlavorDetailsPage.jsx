// Importación de los estilos específicos de la página
import "./FlavorDetailsPage.css";
// Importación de hooks de React para manejar estado y efectos
import { useEffect, useState } from "react";
// Importación de useParams para leer el _id que viene en la URL (/flavors/:_id)
// Importación de NavLink para crear enlaces internos que navegan entre rutas sin recargar la página
import { useParams , NavLink } from "react-router-dom";
import { themeClass } from "@/features/colorPattern"


const FlavorDetailsPage = () => {
    // Extraemos el parámetro "_id" de la URL (definido en la ruta: /flavors/:_id)
    const { _id } = useParams();        

    // Estado donde guardaremos SOLO la cookie encontrada 
    const [ cookie , setCookie ] = useState(null)
      // índice de la cookie actual dentro del array de cookies
    const [cookieIndex, setCookieIndex] = useState(null);

    // USO DE CHATGPT PARA LOS BOTONES DE ANTERIOR Y SIGUIENTE
    //Estados para guardar el id de la cookie anterior y de la siguiente
    const [prevId, setPrevId] = useState(null);
    const [nextId, setNextId] = useState(null)

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

            // Guardamos el array en una constante
            const cookiesArray = answer.data;

            // Buscamos el índice de la cookie cuyo _id coincide con el de la URL
            const index = cookiesArray.findIndex((cookie) => cookie._id === _id);

            // Cookie actual
            const currentCookie = cookiesArray[index];
            setCookie(currentCookie);

            // Guardamos el índice actual
            setCookieIndex(index);

            // USO DE CHATGPT PARA LOS BOTONES DE ANTERIOR Y SIGUIENTE
            // Navegación CIRCULAR
            // total = número total de cookies
            const total = cookiesArray.length;

            // índice de la anterior (si está en 0, salta a la última)
            const prevIndex = (index - 1 + total) % total;
            // índice de la siguiente (si está en la última, salta a la primera)
            const nextIndex = (index + 1) % total;

            // Guardamos los ids de la cookie anterior y la siguiente
            setPrevId(cookiesArray[prevIndex]._id);
            setNextId(cookiesArray[nextIndex]._id);
            
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
            <Cookie {...cookie} index={cookieIndex} />
            <NavLink to={`/flavors/${prevId}`}>Anterior</NavLink>
            <NavLink to={`/flavors/${nextId}`}>Siguiente</NavLink>
        </>
    );
};

export default FlavorDetailsPage;

const Cookie = ( props ) => {
    const { index , image_webp , image_png , cookie_name , description } = props
    return (
        <article className={`cookie cookie--${themeClass(index)}`}> 
                <div className="cookie__image-container">
                    <picture className="cookie__image">
                        <source srcSet={image_webp} type="image/webp" />
                        <img src={image_png} alt={`Imagen de la galleta: ${cookie_name}`} />
                    </picture>
                    <svg className="cookie__circle" viewBox="0 0 100 100" width="100%" preserveAspectRatio="xMidYMid meet">
                        <circle cx="50%" cy="50%" r="40%"/>
                    </svg>
                </div>   
                <div>   
                    <h2 className="cookie__name poppins-bold-uppercase">
                        {cookie_name}
                    </h2>   
                    <p>{description}</p>  
                </div>
                           
                           
        </article>
    )
}
