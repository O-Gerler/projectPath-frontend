import FormularioCambiarDatosPerfil from "../../components/perfil/FormularioCambiarDatosPerfil"
import { useAuth } from "../../hooks/useAuth"

const Perfil = () => {
  const { data, isLoading } = useAuth()

  if(isLoading) return "Cargando"
  if(data) return <FormularioCambiarDatosPerfil data={data}/>
}

export default Perfil