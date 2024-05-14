import { useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
const MenuNav = ({ nombre }) => {

  const queryClient = useQueryClient()
  const logout = () => {
    localStorage.setItem("AUTH_TOKEN", "")
    queryClient.invalidateQueries({ queryKey: ["usuario"] })
  }

  return (
    <ul className="flex gap-3 text-white font-medium">
      <li className="cursor-pointer">{nombre}</li>
      <li className="cursor-pointer"><Link to="/">Proyectos</Link></li>
      <li className="cursor-pointer"><Link to="/perfil">Perfil</Link></li>
      <li className="cursor-pointer" onClick={logout}>Salir</li>
    </ul>
  )
}

export default MenuNav