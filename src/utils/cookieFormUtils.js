    export const getTypes = (form) => {
        const { type_vegana, type_sin_gluten } = form

        const types = []
        if (type_vegana.checked) types.push("Vegana")
        if (type_sin_gluten.checked) types.push("Sin gluten")
        return types
    }

    export const getCookieData = (form) => {
        const { visible, image_png, cookie_name, description } = form

        return {
            visible: visible.checked,
            image_png: image_png?.files?.[0] || null,
            types: getTypes(form),
            cookie_name: cookie_name.value,
            description: description.value,
        }
    }

    export const toCookieFormData = (cookieData) => {
        const data = new FormData()
        data.append("visible", String(cookieData.visible))
        data.append("cookie_name", cookieData.cookie_name)
        data.append("description", cookieData.description)
        data.append("types", JSON.stringify(cookieData.types))

        // Solo añade la imagen si existe (PUT puede no tener)
        if (cookieData.image_png) data.append("image_png", cookieData.image_png)
        return data
    }