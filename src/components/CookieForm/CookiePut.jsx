import { useContext, useEffect } from "react"
// Importación de useParams para leer el _id que viene en la URL (/flavors/:_id)
import { useParams } from "react-router-dom"
import "./CookiePut.css"
// Contexto global donde están:
// - cookies (estado con todas las cookies ya cargadas)
// - requestCookies() (función que pide cookies al backend y actualiza el estado)
// - putForm (ref al formulario para poder escribir valores directamente en inputs)
// - fillOutForm(_id) (función que busca la cookie por id y rellena el formulario)
import { CookiesContext } from "@/context/CookiesContext"

export const CookiePut = () => {

    // 1) Sacamos el _id desde la URL.
    // Esto permite entrar directamente por ruta (incluyendo refresh del navegador).
    const { _id } = useParams()

    // 2) Leemos del contexto todo lo necesario para:
    // - saber si ya hay datos (cookies)
    // - pedirlos si no existen (requestCookies)
    // - rellenar inputs via ref (putForm + fillOutForm)
    const {
        cookies,
        requestCookies,
        putForm,
        fillOutForm,
        putCookie,
        currentImageUrl,
        previewUrl,
        setPreviewUrl,
    } = useContext(CookiesContext)

    // 3) EFECTO 1: Asegura que existan cookies en memoria.
    // Clave para el REFRESH:
    // - Si refrescas, la app arranca "de cero" y cookies normalmente es [] al inicio.
    // - Si intentas rellenar el formulario con cookies vacías, no encuentras la cookie y crashea.
    // Este efecto se ejecuta UNA sola vez ([]) al montar el componente.
    useEffect(() => {
        // Si todavía no hay cookies cargadas, las pedimos al backend.
        // Importante: requestCookies hará setCookies(...) cuando llegue la respuesta.
        if (!cookies.length) requestCookies()
    }, [])
        // Nota: aquí usamos [] para que no esté disparándose continuamente.

    // 4) EFECTO 2: Rellena el formulario cuando ya se puede.
    // Depende de:
    // - _id: porque si cambias de cookie en la URL, quieres rellenar con otra.
    // - cookies: porque en refresh primero llegan vacías y luego se llenan asíncronamente.
    // Este efecto se ejecuta:
    // - al montar (primera vez),
    // - cuando cambia _id,
    // - cuando cambia cookies (cuando llega la petición).
    useEffect(() => {
        // Condición clave:
        // - _id debe existir (hay cookie objetivo)
        // - cookies.length > 0 (ya hay datos para poder encontrarla)
        // Así evitamos llamar fillOutForm cuando aún no hay datos y search sería undefined.
        if (_id && cookies.length) fillOutForm(_id)
    }, [_id, cookies])

        // Previsualización al elegir nuevo archivo
    const onChangePutImage = (e) => {
        const file = e.target.files?.[0]

        // Si cancela selección, vuelve a la imagen actual
        if (!file) {
            setPreviewUrl(currentImageUrl || "")
            return
        }

        const objectUrl = URL.createObjectURL(file)

        // Si había una preview anterior blob:, la liberamos para no acumular memoria
        setPreviewUrl((prev) => {
            if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev)
            return objectUrl
        })
    }
    
    return (
        <div>
            {/* Imagen actual / previsualización */}
            {previewUrl ? (
                <img className="cookie-put__preview" src={previewUrl} alt="Previsualización de la cookie" />
            ) : (
                <p>No hay imagen</p>
            )}

            <form className="cookie-put" onSubmit={putCookie} ref={putForm}>
                <input type="text" name="id" placeholder="ID" disabled />

                <label htmlFor="visiblePut">visible</label>
                <input id="visiblePut" className="checkbox" type="checkbox" name="visible" />

                <label htmlFor="imagePut">imagen (opcional)</label>
                <input
                    id="imagePut"
                    type="file"
                    name="image_png"
                    accept="image/*"
                    onChange={onChangePutImage}
                />

                <label htmlFor="type_vegana">vegana</label>
                <input id="type_vegana" className="checkbox" type="checkbox" name="type_vegana" />

                <label htmlFor="type_sin_gluten">sin gluten</label>
                <input id="type_sin_gluten" className="checkbox" type="checkbox" name="type_sin_gluten" />

                <input type="text" name="cookie_name" placeholder="nombre" />
                <input type="text" name="description" placeholder="descripción" />

                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}