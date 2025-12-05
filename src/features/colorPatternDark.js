// Array con el patrón de colores que se va a repetir.
// Cada posición representa un "theme" que se aplicará a una cookie según su índice.
export const COLOR_PATTERN = [
    "fuchsia",      // índice 0
    "dark-green",   // índice 1
    "dark-blue",    // índice 2
    "fuchsia",      // índice 3
    "dark-purple",  // índice 4
    "dark-blue",    // índice 5
    "dark-green",   // índice 6
    "dark-purple"   // índice 7
]

// Dado un índice i (el índice de una cookie en el .map),
// devuelve el nombre del color correspondiente siguiendo el patrón.
// Si i es mayor que la longitud del array, usa el operador % (módulo)
// para "volver a empezar" desde el principio del patrón.
//
// Ejemplos:
// - i = 0  → 0 % 8 = 0  → "fuchsia"
// - i = 7  → 7 % 8 = 7  → "dark-purple"
// - i = 8  → 8 % 8 = 0  → "fuchsia" (vuelve a empezar)
// - i = 10 → 10 % 8 = 2 → "dark-blue"
export const getThemeByIndex = (i) =>
    COLOR_PATTERN[i % COLOR_PATTERN.length]

// Envuelve getThemeByIndex para construir la clase de theme.
//
// Ejemplo:
// themeClass(0) → "fuchsia"
// themeClass(4) → "dark-purple"
export const themeClass = (i) =>
    `${getThemeByIndex(i)}`