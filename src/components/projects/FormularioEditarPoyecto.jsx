import { useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editarProyecto } from "../../api/proyectoAPI";
import MensajeError from "../MensajeError";

/* eslint-disable react/prop-types */
const FormularioEditarPoyecto = ({ data }) => {
  const [nombre, setNombre] = useState(data.nombre)
  const [cliente, setCliente] = useState(data.cliente)
  const [descripcion, setDescripcion] = useState(data.descripcion)
  const [errorMsg, setErrorMsg] = useState("")
  const navegar = useNavigate()
  const { idProyecto } = useParams();

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: editarProyecto,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["proyectos"]})
      queryClient.invalidateQueries({queryKey: ["editarProyecto", idProyecto]})
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

    mutate({id: data._id,proyecto})
  }

  return (
    <section className="w-full mx-2 sm:mx-auto md:w-4/5 xl:w-2/3">
      <h1 className="text-5xl font-black">Editar Proyecto</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Edita los campos del proyecto rellenando el siguiente formulario
      </p>

      <nav className="my-5">
        <Link
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors uppercase"
          to="/"
        >
          Volver
        </Link>
      </nav>

      <form
        className="bg-white mt-10 rounded-md shadow-lg px-4 py-10 md:p-10"
        onSubmit={(e) => handleSubmit(e)}
      >
        {errorMsg !== "" && <MensajeError mensaje={errorMsg}/>}
        <div className="flex flex-col gap-2 text-sm">
          <label className="uppercase font-bold" htmlFor="crearProyectoNombre">
            Nombre del proyecto
          </label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            id="crearProyectoNombre"
            className="outline-none p-2 border mb-2"
            placeholder="Nombre del proyecto"
          />
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <label className="uppercase font-bold" htmlFor="crearProyectoCliente">
            Nombre del cliente
          </label>
          <input
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            type="text"
            id="crearProyectoCliente"
            className="outline-none p-2 border mb-2"
            placeholder="Nombre del cliente"
          />
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <label
            className="uppercase font-bold"
            htmlFor="crearProyectoDescripcion"
          >
            Descripción
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            type="text"
            id="crearProyectoDescripcion"
            className="outline-none p-2 border mb-2"
            placeholder="Descripcion del proyecto"
          ></textarea>
        </div>
        <input
          type="submit"
          value="Guardar Cambios"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold w-full uppercase cursor-pointer transition-colors p-2 mt-2 rounded-sm"
        />
      </form>
    </section>
  );
};

export default FormularioEditarPoyecto;
