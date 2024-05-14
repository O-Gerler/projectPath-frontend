import { useState } from "react";
import MensajeError from "../../components/MensajeError";
import { useMutation } from "@tanstack/react-query";
import { actualizarPasswordActual } from "../../api/perfilAPI";
import { toast } from "react-toastify";

export default function CambiarPassword() {
  const [passwordActual, setPasswordActual] = useState("")
  const [passwordNueva, setPasswordNueva] = useState("")
  const [passwordNuevaConfirmacion, setPasswordNuevaConfirmacion] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const { mutate } = useMutation({
    mutationFn: actualizarPasswordActual,
    onError: error => toast.error(error.message),
    onSuccess: data => {
      toast.success(data)
      setPasswordActual("")
      setPasswordNueva("")
      setPasswordNuevaConfirmacion("")
    }
  })

  const handleSubmit = e => {
    e.preventDefault()

    if([passwordActual.trim(), passwordNueva.trim(), passwordNuevaConfirmacion.trim()].includes("")) {
      return setErrorMsg("Todos los campos deben rellenarse")
    }

    if(passwordActual.trim() === passwordNueva.trim()) {
      return setErrorMsg("El nuevo password no puede ser igual al anterior")
    }

    if(passwordNueva.trim().length < 8) {
      return setErrorMsg("El password debe ser de minimo 8 caracteres")
    }

    if(passwordNueva.trim() !== passwordNuevaConfirmacion.trim()) {
      return setErrorMsg("Los password no coinciden")
    }

    setErrorMsg("")
    mutate({
      password_actual: passwordActual,
      password: passwordNueva,
      "password-confirmacion": passwordNuevaConfirmacion
    })
  }


  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-black ">Cambiar Password</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Utiliza este formulario para cambiar tu password
        </p>

        <form
          className=" mt-14 space-y-5 bg-white shadow-lg p-4 sm:p-10 rounded-lg"
          onSubmit={handleSubmit}
        >
          {errorMsg !== "" && <MensajeError mensaje={errorMsg} />}
          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="current_password"
            >
              Password Actual
            </label>
            <input
              id="current_password"
              type="password"
              placeholder="Password Actual"
              className="w-full p-3  border border-gray-200"
              value={passwordActual}
              onChange={e => setPasswordActual(e.target.value)}
            />
          </div>
          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="password">
              Nuevo Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Nuevo Password"
              className="w-full p-3  border border-gray-200"
              value={passwordNueva}
              onChange={e => setPasswordNueva(e.target.value)}
            />
          </div>
          <div className="mb-5 space-y-3">
            <label
              htmlFor="password_confirmation"
              className="text-sm uppercase font-bold"
            >
              Repetir Password
            </label>

            <input
              id="password_confirmation"
              type="password"
              placeholder="Repetir Password"
              className="w-full p-3  border border-gray-200"
              value={passwordNuevaConfirmacion}
              onChange={e => setPasswordNuevaConfirmacion(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Cambiar Password"
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
