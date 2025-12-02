export const COLOR_PATTERN = [
    "fuchsia", "dark-green", "dark-blue", "fuchsia",
    "dark-purple", "dark-blue", "dark-green", "dark-purple"
]

export const getThemeByIndex = (i) =>
    COLOR_PATTERN[i % COLOR_PATTERN.length]

export const themeClass = (i) =>
    `${getThemeByIndex(i)}`