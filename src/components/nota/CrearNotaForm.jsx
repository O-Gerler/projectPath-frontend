/* eslint-disable react/prop-types */
import { useState } from "react";
import MensajeError from "../MensajeError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearNota } from "../../api/notasAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const CrearNotaForm = ({ tarea }) => {
  const [contenido, setContenido] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const { idProyecto } = useParams()
  const { _id: idTarea } = tarea

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: crearNota,
    onError: error => {
      toast.error(error.message)
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["proyecto", "tarea", idProyecto, idTarea]})
      toast.success(data)
    }
  })

  const handleSubmit = e => {
    e.preventDefault()

    if(contenido.trim() === "") {
      return setErrorMsg("La nota no puede ir vacia")
    }

    setErrorMsg("")
    setContenido("")
    mutate({idProyecto, idTarea, contenido})
  }
   
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      { errorMsg.length > 0 && <MensajeError mensaje={errorMsg} />}
      <div className="flex flex-col gap-3">
        <label className="font-bold text-2xl text-slate-600" htmlFor="crearNota">
          Crear Nota
        </label>
        <input
          type="text"
          name=""
          id="crearNota"
          placeholder="Contenido de la nota"
          className="w-full p-2 border border-gray-300"
          value={contenido}
          onChange={e => setContenido(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value="Crear Nota"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 font-black text-white w-full p-2 cursor-pointer transition-colors"
      />
    </form>
  );
};

export default CrearNotaForm;
