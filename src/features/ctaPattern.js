export const CTA_PATTERN = [
    "Explora mi interior", 
    "Revela mis secretos",
    "Conóceme mejor", 
    "Descubre mi relleno",
    "Mírame por dentro",
    
]

export const getCtaByIndex = (i) =>
    CTA_PATTERN[i % CTA_PATTERN.length]

