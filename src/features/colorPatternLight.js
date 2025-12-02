export const COLOR_PATTERN = [
    "vanilla", "violet", "light-green", "vanilla",
    "light-blue", "light-green", "violet", "light-blue"
]

export const getThemeByIndex = (i) =>
    COLOR_PATTERN[i % COLOR_PATTERN.length]

export const themeClass = (i) =>
    `${getThemeByIndex(i)}`
