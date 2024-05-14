import { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import MensajeError from "../MensajeError";
import { crearTarea } from "../../api/tareasAPI";
import { toast } from "react-toastify"

/* eslint-disable react/prop-types */
const ModalCrearTarea = ({ setModalCrearTarea, idProyecto }) => {
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handleModalClick = event => {
    event.stopPropagation();
  }

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: crearTarea,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["proyecto", idProyecto]})
      toast.success(data)
      setModalCrearTarea(false)
    }
  })

  const handleSubmit = e => {
    e.preventDefault();

    const trimmedNombre = nombre.trim();
    const trimmedDescripcion = descripcion.trim();

    if ([trimmedNombre, trimmedDescripcion].includes("")) {
      return setErrorMsg("Debes rellenar todos los campos");
    }

    const tarea = {nombre: trimmedNombre, descripcion: trimmedDescripcion}
    mutate({ idProyecto, tarea})
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-10" onClick={() => setModalCrearTarea(false)}>
      <div className="modal-overlay bg-black opacity-50 absolute top-0 left-0 w-full h-full z-20" />
      <div className="modal bg-white w-full mx-2 p-2 md:w-2/3 lg:w-1/2 md:p-8 rounded-lg shadow-lg z-30" onClick={handleModalClick}>
        <h3 className="text-4xl my-5 font-black">Nueva Tarea</h3>
        <p className="text-xl font-bold">Llena el formulario y crea <span className="text-fuchsia-600">una tarea</span></p>
        <form 
          className="flex flex-col gap-3 mt-10" 
          noValidate
          onSubmit={handleSubmit}
        >
          {errorMsg && <MensajeError mensaje={errorMsg}/>}
          <div className="flex flex-col gap-2 text-sm">
            <label className="uppercase font-bold" htmlFor="crearTareaCliente">
              Nombre de la tarea
            </label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              type="text"
              id="crearTareaCliente"
              className="outline-none p-2 border mb-2"
              placeholder="Nombre del cliente"
            />
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <label
              className="uppercase font-bold"
              htmlFor="crearTareaDescripcion"
            >
              Descripción tarea
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              type="text"
              id="crearTareaDescripcion"
              className="outline-none p-2 border mb-2"
              placeholder="Descripcion del proyecto"
            >
            </textarea>
          </div>
          <button className='bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors px-10 py-3 text-white text-xl cursor-pointer font-bold'>
            Guardar Tarea
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalCrearTarea