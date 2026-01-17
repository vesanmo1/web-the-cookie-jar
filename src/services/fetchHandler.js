// ============================================================
// FETCH HANDLER
//
// Esta función sirve para reutilizar siempre el mismo fetch en toda la app.
// Así no repites headers y configuración en cada petición.
//
// Qué hace:
// 1) Recibe un objeto con: method, url y (opcional) data
// 2) Prepara el objeto options (method + headers)
// 3) Si hay data, decide si enviarla como:
// - FormData (para imágenes con Multer) -> NO pone Content-Type 
// - JSON (para POST/PUT normales) -> pone Content-Type
// - JSON (para PUSH) -> siempre Content-Type
// 4) Ejecuta fetch(url, options)
// 5) Convierte la respuesta a JSON y la devuelve
// ============================================================
export const fetchHandler = async (props) => {

    // Sacamos del objeto props lo que necesitamos
    // method: "get" | "post" | "put" | "patch" | "delete"
    // url: endpoint completo (ej: http://localhost:3000/cookies)
    // data: (opcional) body que se quiere enviar al backend
    const { method, url, data } = props

    // Normalizamos el método por si llega "post" / "POST" / etc.
    // Solución dada por CHATGPT: sin esto PATCH no me funciona
    const m = String(method).toUpperCase();

    // ============================================================
    // OPTIONS BASE
    // Aquí construimos el objeto options que necesita fetch()
    // ============================================================
    const options = {
        method: m,
        headers: { "secret-api-key": "12345" },
    };

    // ============================================================
    // BODY (DATA) -> SOLO si existe "data"
    // ============================================================
    if (data !== undefined && data !== null) {

        // ------------------------------------------------------------
        // CASO 1: FormData (archivos)
        // Si data es FormData, significa que estamos enviando archivos.
        // OJO: No ponemos "Content-Type" porque el navegador lo calcula solo.
        if (data instanceof FormData) {
        options.body = data;

        // ------------------------------------------------------------
        // CASO 2: JSON normal
        // Si data es un objeto normal y el método permite body:
        // - añadimos Content-Type
        // - convertimos el objeto a string JSON
        // ------------------------------------------------------------
        } else if (["POST", "PUT", "PATCH"].includes(m)) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
        }
    }

    // ============================================================
    // PETICIÓN FETCH
    // petition = respuesta "cruda" (Response)
    // ============================================================
    const petition = await fetch(url, options);

    // ============================================================
    // RESPUESTA A JSON
    // Convertimos el body de la respuesta a JSON y lo devolvemos
    // ============================================================
    const answer = await petition.json()
    return answer
};