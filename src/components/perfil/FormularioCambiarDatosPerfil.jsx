/* eslint-disable react/prop-types */
import { useState } from "react";
import MensajeError from "../MensajeError";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { actualizarPerfil } from "../../api/perfilAPI";

export default function FormularioCambiarDatosPerfil({ data }) {
  const [nombre, setNombre] = useState(data.nombre)
  const [email, setEmail] = useState(data.email)
  const [errorMsg, setErrorMsg] = useState("")

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: actualizarPerfil,
    onError: error => toast.error(error.message),
    onSuccess: data => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ["usuario"]})
    }
  })

  const handleSubmit = e => {
    e.preventDefault()

    if([nombre.trim(), email.trim()].includes("")) {
      return setErrorMsg("Los campos no puede ir vacios")
    }

    setErrorMsg("")
    mutate({nombre, email})
  }

  return (
    <>
      <div className="mx-auto max-w-3xl g">
        <h1 className="text-5xl font-black ">Mi Perfil</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Aquí puedes actualizar tu información
        </p>

        <form
          className=" mt-14 space-y-5 bg-white shadow-lg p-4 sm:p-10 rounded-l"
          onSubmit={handleSubmit}
        >
          {errorMsg !== "" && <MensajeError mensaje={errorMsg} />}
          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="name">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              placeholder="Tu Nombre"
              className="w-full p-3  border border-gray-200"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>

          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="password">
              E-mail
            </label>
            <input
              id="text"
              type="email"
              placeholder="Tu Email"
              className="w-full p-3  border border-gray-200"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Guardar Cambios"
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
