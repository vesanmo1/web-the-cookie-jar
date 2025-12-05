// Array que define el patrón de colores que se asignarán a las cookies.
export const COLOR_PATTERN = [ 
    "vanilla",      // índice 0
    "violet",       // índice 1
    "light-green",  // índice 2
    "vanilla",      // índice 3
    "light-blue",   // índice 4
    "light-green",  // índice 5
    "violet",       // índice 6
    "light-blue"    // índice 7
]

// Función que recibe un índice (i) y devuelve el color correspondiente.
// Usa el operador % para que, si i es mayor que la longitud del patrón,
// el índice “vuelva al inicio” del array y el patrón se repita.
// Ejemplo: si i=10 → 10 % 8 = 2 → devuelve COLOR_PATTERN[2]
export const getThemeByIndex = (i) =>
    COLOR_PATTERN[i % COLOR_PATTERN.length]

// Función que devuelve el nombre de la clase que se usará para el CSS.
export const themeClass = (i) =>
    `${getThemeByIndex(i)}`
