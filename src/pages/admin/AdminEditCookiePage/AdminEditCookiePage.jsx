// Importación de useParams para leer el _id que viene en la URL (/flavors/:_id)
import { useParams } from "react-router-dom"

export const AdminEditCookiePage = () => {
  const { _id } = useParams() 

  return (
    <div>
      <h1>AdminEditCookiePage {_id} </h1>
    </div>
  )
}
