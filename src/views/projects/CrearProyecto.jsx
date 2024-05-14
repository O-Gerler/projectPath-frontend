import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useMutation } from '@tanstack/react-query'
import FormularioProyecto from "@/components/projects/FormularioProyecto"
import MensajeError from "../../components/MensajeError"
import { crearProyecto } from "../../api/proyectoAPI"

const CrearProyecto = () => {

  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [cliente, setCliente] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const navegar = useNavigate()

  const { mutate } = useMutation({
    mutationFn: crearProyecto,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data);
      navegar("/");
    }
  })

  const handleSubmit = e => {
    e.preventDefault();

    const trimmedNombre = nombre.trim();
    const trimmedDescripcion = descripcion.trim();
    const trimmedCliente = cliente.trim();

    if ([trimmedNombre, trimmedDescripcion, trimmedCliente].includes("")) {
      return setErrorMsg("Debes rellenar todos los campos");
    }

    const proyecto = {nombre: trimmedNombre, cliente: trimmedCliente, descripcion: trimmedDescripcion}

    mutate(proyecto)
  }

  return (
    <section className="w-full mx-2 sm:mx-auto md:w-4/5 xl:w-2/3">
      <h1 className="text-5xl font-black">Crear Proyecto</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Crea un proyecto rellenando el siguiente formulario</p>

      <nav className="my-5">
        <Link
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors uppercase"
          to="/"
        >
          Volver
        </Link>
      </nav>

      <form 
        className="bg-white rounded-md shadow-lg px-4 py-10 md:p-10 mt-10"
        onSubmit={e => handleSubmit(e)}
      >
        {errorMsg !== "" && <MensajeError mensaje={errorMsg}/>}
        <FormularioProyecto 
          nombre={nombre}
          setNombre={setNombre}
          cliente={cliente}
          setCliente={setCliente}
          descripcion={descripcion}
          setDescripcion={setDescripcion}
        />
        <input 
          type="submit"
          value="Crear Proyecto" 
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold w-full uppercase cursor-pointer transition-colors p-2 mt-2 rounded-sm"
        />
      </form>
    </section>
  )
}

export default CrearProyecto