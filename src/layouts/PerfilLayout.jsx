import { Outlet } from "react-router-dom"
import Tabs from "../components/perfil/Tabs"

const PerfilLayout = () => {
  return (
    <>
      <Tabs />
      <Outlet />
    </>
  )
}

export default PerfilLayout