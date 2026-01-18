// ============================================================
// COOKIE FORM UTILS
//
// Helpers para trabajar con los formularios de cookies (POST / PUT).
// Se encargan de:
// 1) Leer los checkboxes de tipos y devolver un array (getTypes)
// 2) Leer inputs del formulario y devolver un objeto "cookieData" (getCookieData)
// 3) Convertir "cookieData" a FormData para enviar al backend con Multer (toCookieFormData)
//
// Nota:
// - image_png puede ser null si no se selecciona archivo (típico en PUT).
// ============================================================


// ============================================================
// getTypes
// ------------------------------------------------------------
// Lee los checkboxes del formulario y construye el array "types".
// - Si type_vegana está marcado -> "Vegana"
// - Si type_sin_gluten está marcado -> "Sin gluten"
// ============================================================
export const getTypes = (form) => {

    // Sacamos los checkboxes del formulario por nombre
    const { type_vegana, type_sin_gluten } = form

    // Construimos el array de tipos según los checkboxes marcados
    const types = []
    if (type_vegana.checked) types.push("Vegana")
    if (type_sin_gluten.checked) types.push("Sin gluten")

    return types
}

// ============================================================
// getCookieData
// ------------------------------------------------------------
// Lee los inputs del formulario y devuelve un objeto con los datos
// listos para enviar al backend.
//
// Devuelve:
// - visible: boolean (checkbox)
// - image_png: File | null (primer archivo seleccionado)
// - types: array de strings (resultado de getTypes)
// - cookie_name: string
// - description: string
// ============================================================
export const getCookieData = (form) => {

    // Sacamos los inputs del formulario por nombre
    const { visible, image_png, cookie_name, description } = form

    return {
        // Checkbox -> boolean
        visible: visible.checked,

        // Input file -> cogemos el primer archivo (si existe)
        // Si no hay archivo seleccionado, devolvemos null (útil para PUT sin imagen)
        image_png: image_png?.files?.[0] || null,

        // Types desde checkboxes
        types: getTypes(form),

        // Inputs de texto
        cookie_name: cookie_name.value,
        description: description.value,
    }
}

// ============================================================
// toCookieFormData
// ------------------------------------------------------------
// Convierte el objeto "cookieData" a FormData.
// Esto es necesario cuando se envía imagen al backend con Multer.
//
// Convierte/serializa:
// - visible -> string ("true"/"false") porque FormData no envía boolean nativo
// - types   -> JSON.stringify(array) para que el backend lo pueda parsear
//
// Nota:
// - Solo añade image_png si existe (en PUT puede venir null).
// ============================================================
export const toCookieFormData = (cookieData) => {

    const data = new FormData()

    // Campos normales (siempre)
    data.append("visible", String(cookieData.visible))
    data.append("cookie_name", cookieData.cookie_name)
    data.append("description", cookieData.description)

    // Types como string JSON para mantener el array en el request
    data.append("types", JSON.stringify(cookieData.types))

    // Imagen opcional (PUT puede no traer imagen nueva)
    if (cookieData.image_png) data.append("image_png", cookieData.image_png)
        
    return data
}