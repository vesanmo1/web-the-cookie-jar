// Array con los textos de los CTA (Call To Action) que aparecerán en cada cookie.
// Cada string es un mensaje diferente que se rota según el índice de la cookie.
export const CTA_PATTERN = [ 
    "Explora mi interior",     // índice 0
    "Revela mis secretos",     // índice 1
    "Conóceme mejor",          // índice 2
    "Descubre mi relleno",     // índice 3
    "Mírame por dentro",       // índice 4
]

// Función que recibe un índice (i) y devuelve el CTA correspondiente.
// Si i es más grande que la longitud del patrón, se usa el operador %
// para “volver al inicio” del array y repetir los textos en bucle.
//
// Ejemplo:
// i = 0  → CTA_PATTERN[0] → "Explora mi interior"
// i = 4  → CTA_PATTERN[4] → "Mírame por dentro"
// i = 5  → 5 % 5 = 0 → CTA_PATTERN[0] → "Explora mi interior"
export const getCtaByIndex = (i) =>
    CTA_PATTERN[i % CTA_PATTERN.length]

