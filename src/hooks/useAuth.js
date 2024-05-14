import { useQuery } from "@tanstack/react-query"
import { obtenerUsuario } from "../api/authAPI"

export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["usuario"],
    queryFn: obtenerUsuario,
    retry: 2,
    refetchOnWindowFocus: false
  })

  return { data, isError, isLoading }
}