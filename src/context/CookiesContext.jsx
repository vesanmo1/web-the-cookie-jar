// ============================================================
// COOKIES CONTEXT 
//
// Este archivo crea un Context global para:
// 1) Guardar en estado global la lista de cookies (cookies[])
// 2) Hacer llamadas a la API (CRUD: GET, POST, PUT, DELETE) + PATCH (visibilidad)
// 3) Reutilizar refs de formularios (postForm / putForm) desde cualquier componente
// 4) Gestionar imagen actual + preview en el formulario de edición (PUT)
// 5) Hacer login llamando al endpoint /auth y guardar "login=true" en localStorage
//
// NOTA:
// - fetchHandler es una función reutilizable que hace fetch con headers comunes
// - getCookieData lee los inputs del form y los convierte en un objeto
// - toCookieFormData convierte el objeto cookie a FormData para enviar imágenes (Multer)
// ============================================================


// ============================================================
// IMPORTS
// ============================================================

// React:
// - createContext: crea el Context global
// - useEffect: ejecutar código al cargar (ej: pedir cookies al inicio)
// - useState: guardar estados globales (cookies, urls...)
// - useRef: guardar referencias a formularios (para leer inputs desde el Context)
import { createContext, useEffect, useState, useRef } from "react"

// Función reutilizable para hacer peticiones fetch (CRUD)
// Ya incluye header "secret-api-key" y maneja JSON/FormData
import { fetchHandler } from "@/services/fetchHandler"

// Helpers:
// - getCookieData: lee el formulario y devuelve un objeto con los valores
// - toCookieFormData: convierte ese objeto a FormData (necesario cuando hay imagen)
import { getCookieData, toCookieFormData } from "@/utils/cookieFormUtils"

// ============================================================
// VARIABLES DE ENTORNO
// ============================================================

// VITE_EXPRESS es la URL base del backend (por ejemplo http://localhost:3000)
const { VITE_EXPRESS } = import.meta.env

// ============================================================
// CREACIÓN DEL CONTEXT
// ============================================================

// Este contexto permitirá consumir cookies y funciones desde cualquier componente
export const CookiesContext = createContext()

// ============================================================
// PROVIDER
// Este componente envuelve la app y comparte:
// - estados globales (cookies, previewUrl...)
// - funciones (requestCookies, postCookie, putCookie...)
// - refs (postForm, putForm)
// ============================================================
export const CookiesProvider = ( props ) => {

    // children son todos los componentes "hijos" que quedarán dentro del Provider
    const { children } = props


    // ===========================================================
    // HOOKS (ESTADOS Y REFS)
    // ===========================================================

    // cookies: lista de cookies que llegan del backend
    // setCookies: función para actualizar la lista (y re-renderizar)  
    const [ cookies , setCookies ] = useState([])
    const [cookiesLoaded, setCookiesLoaded] = useState(false)

    // Guarda la URL de la imagen actual de la cookie que estás editando
    // (sirve para mostrar la imagen existente en el formulario PUT)
    const [currentImageUrl, setCurrentImageUrl] = useState("")

    // Guarda el id de la cookie que se está editando (PUT)
    const [editingId, setEditingId] = useState("")
    const [editingCookie, setEditingCookie] = useState(null)

    // Guarda la URL que se está previsualizando en el formulario de edición
    // (puede ser la actual o una nueva si el usuario selecciona otra)
    const [previewUrl, setPreviewUrl] = useState("")

    // Refs a los formularios:
    // - postForm: formulario de crear cookie
    // - putForm: formulario de editar cookie
    const postForm = useRef(null)
    const putForm  = useRef(null)

    // ===========================================================
    // useEffect inicial
    // Se ejecuta una vez al cargar el Provider
    // -> pide todas las cookies al backend
    // ===========================================================
    useEffect(() => {
        requestCookies()
    }, [])

    // ============================================================
    // SINCRONIZAR (con ayuda de CHATGPT) editingCookie CUANDO CAMBIA cookies[]
    // Si cambias una cookie desde fuera del formulario (ej. PATCH visibilidad),
    // aquí rehidratamos `editingCookie` desde la lista global para que el PUT
    // siempre muestre el valor actualizado sin necesidad de refrescar.
    // ============================================================
    useEffect(() => {
        if (!editingCookie?.id) return

        const updated = cookies.find(c => c._id === editingCookie.id)
        if (!updated) return

        const types = updated.types || []

        setEditingCookie({
            id: updated._id,
            visible: !!updated.visible,
            vegana: types.includes("Vegana"),
            sinGluten: types.includes("Sin gluten"),
            image: updated.image_png || ""
        })
    }, [cookies])

    // ============================================================
    // FUNCIONES (API / CRUD)
    // ============================================================


    // ============================================================
    // REQUEST COOKIES (GET)
    // Pide cookies al backend y actualiza el estado global "cookies"
    //
    // filter puede ser:
    // - "todas"      -> GET /cookies
    // - "vegana"     -> GET /cookies/type/vegana
    // - "sin-gluten" -> GET /cookies/type/sin-gluten
    // ============================================================
    const requestCookies = async ( filter = "todas" ) => {

        setCookiesLoaded(false)
        
        // Elegimos endpoint según filtro
        let path = "/cookies"
        if ( filter === "vegana" ) { path = "/cookies/type/vegana" } 
        else if ( filter === "sin-gluten" ) { path = "/cookies/type/sin-gluten" }

        // Llamada al backend
        const answer = await fetchHandler({
            method: "get",
            url: `${VITE_EXPRESS}${path}`
        })

        // Guardamos en estado la lista de cookies (answer.data debe venir del backend)
        if (answer && answer.data) {
            setCookies(answer.data)
        } else {
            setCookies([])
        }
        setCookiesLoaded(true)

        // Devolvemos la respuesta por si el componente que llama quiere usarla
        return answer
    }

    // ============================================================
    // POST COOKIE (POST)
    // Se usa al enviar el formulario de crear cookie.
    //
    // Pasos:
    // 1) Convierte a FormData (porque lleva imagen)
    // 2) Hace POST /cookies al backend
    // 3) Vuelve a pedir cookies para refrescar la lista en pantalla
    // 4) Resetea el formulario
    //
    // NOTA:
    // - Las validaciones del formulario se hacen en el componente (CookieFormPost)
    // ============================================================
    const postCookie = async ( newCookie ) => {

        try {    
            // Convertimos a FormData para enviar imagen al backend (Multer)        
            const data = toCookieFormData(newCookie)

            // POST al backend
            const answer = await fetchHandler({
                method: "post",
                url: `${VITE_EXPRESS}/cookies`,
                data: data
            })

            // Refrescamos la lista global
            await requestCookies()

            // Limpiamos el formulario
            postForm.current.reset()

            return answer
            
        } catch (error) {
            console.log (error)
            
        }
    }

    // ============================================================
    // TOGGLE COOKIE VISIBILITY (PATCH)
    // Cambia solo el campo "visible" de una cookie.
    // Hace un PATCH /cookies/:id enviando { visible: true/false }
    // ============================================================
    const toggleCookieVisibility = async ( _id , visible ) => {
        console.clear()
        console.log(`patchCookieVisibility`)

        
        const answer = await fetchHandler({
            method: "patch",
            url: `${VITE_EXPRESS}/cookies/${_id}`,
            data: { visible }
        })

        // El backend devuelve la lista actualizada y la guardamos
        setCookies(answer.data)
        return answer
    }

    // ============================================================
    // FILL OUT FORM (rellenar el formulario de edición PUT)
    // Se usa cuando eliges una cookie para editarla.
    //
    // Pasos:
    // 1) Busca la cookie dentro del estado "cookies" por su _id
    // 2) Rellena los inputs de texto del formulario PUT con los valores existentes
    //    (id, nombre, descripción). El input file se limpia por seguridad.
    // 3) Calcula los tipos (vegana / sin gluten) a partir del array "types"
    // 4) Guarda en `editingCookie` (Context) los valores que necesita la UI de PUT:
    //    - visible, vegana, sinGluten (para hidratar/sincronizar toggles)
    //    - image (por si se necesita como referencia)
    // 5) Guarda la imagen actual en `currentImageUrl` y `previewUrl` para mostrarla en la UI
    // ============================================================
    const fillOutForm = (_id) => {
        const search = cookies.find(cookie => cookie._id === _id)
        if (!search) return

        const { cookie_id, cookie_name, description, image_png } = putForm.current

        cookie_id.value = search._id
        cookie_name.value = search.cookie_name
        description.value = search.description
        if (image_png) image_png.value = ""

        const types = search.types || []

        //Con ayuda de CHATGPT para evitar desincronización
        setEditingCookie({
            id: search._id,
            visible: !!search.visible,
            vegana: types.includes("Vegana"),
            sinGluten: types.includes("Sin gluten"),
            image: search.image_png || ""
        })

        setCurrentImageUrl(search.image_png || "")
        setPreviewUrl(search.image_png || "")
    }

    // ============================================================
    // PUT COOKIE (editar cookie)
    // Se usa al enviar el formulario de edición.
    //
    // Pasos:
    // 1) Evita reload del form
    // 2) Obtiene el id del formulario
    // 3) Lee datos del formulario con getCookieData(putForm.current)
    // 4) Si hay imagen nueva -> manda FormData
    //    Si no hay imagen -> manda JSON
    // 5) Hace PUT /cookies/:id y actualiza el estado global "cookies"
    // 6) Resetea el formulario
    // ============================================================
    const putCookie = async ( e ) => {
        e.preventDefault()
        console.clear()
        
        const { cookie_id } = putForm.current

        // Leemos los inputs del form PUT y creamos objeto con valores
        const updated = getCookieData(putForm.current)

        // Si hay imagen nueva -> FormData
        // Si no -> JSON simple
        const payload = updated.image_png
            ? toCookieFormData(updated) // -> FormData (multer)
            : {
                // -> JSON (sin imagen)
                visible: updated.visible,
                cookie_name: updated.cookie_name,
                description: updated.description,
                types: updated.types,
            }

        // PUT al backend
        const answer = await fetchHandler({
            method: "put",
            url: `${VITE_EXPRESS}/cookies/${cookie_id.value}`,
            data: payload,
        })

        // Guardamos la lista actualizada si viene en answer.data
        if (answer?.data) setCookies(answer.data)

        // Limpiamos el formulario
        putForm.current.reset()

        return answer
    }

    // ============================================================
    // DELETE COOKIE
    // Borra una cookie por id y actualiza el estado global.
    // ============================================================
    const deleteCookie = async ( _id ) => {

        const answer = await fetchHandler({
            method: "delete",
            url: `${VITE_EXPRESS}/cookies/${_id}`
        })

        // Guardamos lista actualizada
        setCookies(answer.data)
        return answer
    }

// ============================================================
// LOGIN (POST /auth)
//
// Esta función NO valida el formulario (eso ya se hace en AdminLoginPage).
//
// Aquí hace 3 cosas:
// 1) Enviar user_name y password al backend (/auth)
// 2) Mirar la respuesta para saber si el login fue OK o KO
// 3) Si fue OK, guardar "login=true" en localStorage (para dejar pasar al admin)
// ============================================================
    const login = async (user_name, password) => {

        // 1) Creamos el objeto que vamos a enviar al backend.
        // El backend espera exactamente estos nombres: user_name y password.
        const user = { user_name, password }

        // 2) Hacemos la petición al backend usando fetchHandler.
        const answer = await fetchHandler({
            method: "post",
            url: `${VITE_EXPRESS}/auth`,
            data: user
        })

        // 3) ¿Cómo sabemos si el login fue correcto?
        // El backend, cuando todo va bien, responde:
        // { message: "Encontrando User", data: { ...usuario... } }
        //
        // Por eso comprobamos si existe answer.data:
        // - Si existe -> login OK
        // - Si NO existe -> login KO
        if (answer?.data) {

            // 4) Guardamos una "bandera" en localStorage.
            // Es una forma simple de recordar en el navegador que "está logueado".
            // Luego se usa para:
            // - redirigir a /admin/flavors
            // - bloquear acceso si no existe login
            localStorage.setItem("login", "true")

            // 5) Devolvemos un resultado "estándar" para que el componente lo use.
            // ok: true => el componente puede navegar a /admin/flavors
            // data: el usuario devuelto por el backend (por si quieres usarlo luego)
            return { ok: true }
        }

        // 6) Si llegamos aquí es porque NO había answer.data.
        return {
            ok: false,
            message: "Usuario no registrado"
        }
    }

    // ============================================================
    // PROVIDER VALUE
    // Aquí decidimos qué datos/funciones van a poder usar los componentes.
    // ============================================================
    return (
        <CookiesContext.Provider
            value={{
                cookies,
                cookiesLoaded,
                requestCookies,
                postCookie,
                toggleCookieVisibility,
                fillOutForm,
                putCookie,
                deleteCookie,
                postForm,
                putForm,
                currentImageUrl,
                previewUrl,
                setPreviewUrl,                
                editingId,
                setEditingId,
                editingCookie,
                setEditingCookie,
                login
            }}
        >
            {children}
        </CookiesContext.Provider>
    )
}