// ============================================================
// CTA PATTERN
//
// Textos reutilizables tipo "Call To Action" para las cookies.
// La idea es rotar mensajes en bucle según el índice de la cookie,
// para que no todas tengan el mismo CTA.
// ============================================================


// ------------------------------------------------------------
// CTA_PATTERN
// Array con los textos de CTA.
// Cada string es un mensaje diferente que se rota según el índice.
// ------------------------------------------------------------
export const CTA_PATTERN = [ 
    "Explora mi interior",     // índice 0
    "Revela mis secretos",     // índice 1
    "Conóceme mejor",          // índice 2
    "Descubre mi relleno",     // índice 3
    "Mírame por dentro",       // índice 4
]

// ------------------------------------------------------------
// getCtaByIndex
// Recibe un índice (i) y devuelve el CTA correspondiente.
// Si i supera la longitud del patrón, usamos % para repetir en bucle.
//
// Ejemplos:
// i = 0  → CTA_PATTERN[0] → "Explora mi interior"
// i = 4  → CTA_PATTERN[4] → "Mírame por dentro"
// i = 5  → 5 % 5 = 0     → CTA_PATTERN[0] → "Explora mi interior"
// ------------------------------------------------------------
export const getCtaByIndex = (i) =>
    CTA_PATTERN[i % CTA_PATTERN.length]

