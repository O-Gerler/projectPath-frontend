import { useMutation, useQueryClient } from "@tanstack/react-query"
import { agregarColaborador } from "../../api/colaboradoresAPI"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

/* eslint-disable react/prop-types */
const ResultadoBusqueda = ({ usuario, setEmail }) => {
  const { idProyecto } = useParams()

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: agregarColaborador,
    onError: error => {
      toast.error(error.message)
    },
    onSuccess: data => {
      toast.success(data)
      setEmail("")
      queryClient.invalidateQueries({ queryKey: ["colaboradores", idProyecto] })
    }
  })

  const handleClick = () => {
    mutate({ idProyecto, id: usuario._id })
  }
  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado:</p>
      <div className="flex justify-between items-center pt-3">
        <p className="capitalize">{usuario.nombre}</p>
        <button
          className="text-purple-600 hover:bg-purple-100 px-5 py-3 font-bold cursor-pointer transition-colors"
          onClick={handleClick}
        >
          Agregar
        </button>
      </div>
    </>
  )
}

export default ResultadoBusqueda