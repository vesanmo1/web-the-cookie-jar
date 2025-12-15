//HECHO CON CHATGPT 
// Divide el nombre y coloca un salto de línea antes de la última palabra
// Ej: "Apple Pie Cookie" → "Apple Pie" + salto + "Cookie"
export const formatCookieName = (cookie_name) => {
  const words = cookie_name.split(" ")
  if (words.length < 2) return cookie_name

  const last = words.pop()
  const firstPart = words.join(" ")

  return (
    <>
      {firstPart}
      <br />
      {last}
    </>
  )
}