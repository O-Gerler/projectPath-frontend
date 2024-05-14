/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MensajeError from "../MensajeError";
import { useMutation } from "@tanstack/react-query";
import { actualizarPassword } from "../../api/authAPI";
import { toast } from "react-toastify";

export default function NuevaPasswordForm({ token }) {
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("")
  const [passwordConfirmacion, setPasswordConfirmacion] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const { mutate } = useMutation({
    mutationFn: actualizarPassword,
    onError: error => {
      toast.error(error.message)
    },
    onSuccess: data => {
      toast.success(data)
      setPassword("")
      setPasswordConfirmacion("")
      navigate("/auth/iniciar-sesion")
    }
  })

  const handleSubmit = e => {
    e.preventDefault()

    if([password.trim(), passwordConfirmacion.trim()].includes("")) {
      return setErrorMsg("Debes rellernar todos los campos")
    }

    if(password.trim().length < 8) {
      return setErrorMsg("La longitud minima del password es de 8 caracteres")
    }
    
    if(password !== passwordConfirmacion) {
      return setErrorMsg("Los password no son iguales")
    }

    setErrorMsg("")
    mutate({ token, password, passwordConfirmacion })
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 px-2 py-10 sm:p-10 bg-white mt-10"
      >
        {errorMsg !== "" && <MensajeError mensaje={errorMsg} />}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>
          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Repetir Password</label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full p-3  border-gray-300 border"
            value={passwordConfirmacion}
            onChange={e => setPasswordConfirmacion(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Establecer Password"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
}
