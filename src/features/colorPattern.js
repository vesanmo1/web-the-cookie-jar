// ============================================================
// COLOR PATTERNS (para asignar clases CSS por índice)
// ============================================================
//
// Cuando se pinta la lista de cookies (map),
// cada cookie tiene un `index`. Usamos ese `index` para asignar
// una clase de color siguiendo un patrón que se repite.
//
// ============================================================


// ------------------------------------------------------------
// Patrón de colores "LIGHT"
// - Estos strings son los sufijos de mis clases CSS.
// ------------------------------------------------------------

// Array que define el patrón de colores que se asignarán a las cookies.
export const COLOR_PATTERN_LIGHT = [ 
    "vanilla",      // índice 0
    "violet",       // índice 1
    "light-green",  // índice 2
    "vanilla",      // índice 3
    "light-blue",   // índice 4
    "light-green",  // índice 5
    "violet",       // índice 6
    "light-blue"    // índice 7
]

// ------------------------------------------------------------
// Patrón de colores "DARK"
// - Estos strings son los sufijos de mis clases CSS.
// ------------------------------------------------------------
export const COLOR_PATTERN_DARK = [ 
    "fuchsia",      // índice 0
    "dark-green",   // índice 1
    "dark-blue",    // índice 2
    "fuchsia",      // índice 3
    "dark-purple",  // índice 4
    "dark-blue",    // índice 5
    "dark-green",   // índice 6
    "dark-purple"   // índice 7
]

// ------------------------------------------------------------
// Devuelve un color del patrón según el índice `i`.
//
// Usamos el operador % (módulo) para repetir el patrón:
// - Si el patrón tiene 8 colores y i=10:
//   10 % 8 = 2  -> devolvemos COLOR_PATTERN_XXXX[2] 
//
// Así, no importa cuántas cookies haya: el patrón se repite.
// ------------------------------------------------------------
export const themeClassLight = (i) =>
  COLOR_PATTERN_LIGHT[i % COLOR_PATTERN_LIGHT.length]

export const themeClassDark = (i) =>
  COLOR_PATTERN_DARK[i % COLOR_PATTERN_DARK.length]
