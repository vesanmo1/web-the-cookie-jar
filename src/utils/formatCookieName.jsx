// ============================================================
// HECHO CON CHATGPT
// ------------------------------------------------------------
// formatCookieName
//
// Divide el nombre y coloca un salto de línea antes de la última palabra.
// Ejemplo:
// "Apple Pie Cookie" -> "Apple Pie" + <br /> + "Cookie"
//
// Nota:
// - Si el nombre tiene una sola palabra, se devuelve tal cual.
// - Devuelve un Fragment JSX para poder insertar <br />.
// ============================================================
export const formatCookieName = (cookie_name) => {

    // Separamos el nombre por espacios
    const words = cookie_name.split(" ")

    // Si no hay al menos 2 palabras, no tiene sentido partirlo
    if (words.length < 2) return cookie_name

    // Última palabra (irá en la segunda línea)
    const last = words.pop()

    // Resto del nombre (primera línea)
    const firstPart = words.join(" ")

    // Renderizamos con salto de línea antes de la última palabra
    return (
        <>
            {firstPart}
            <br />
            {last}
        </>
    )
}