import { useState } from "react";
import { Link } from "react-router-dom";
import MensajeError from "../../components/MensajeError";
import { useMutation } from "@tanstack/react-query";
import { pedirCodigoConfirmacion } from "../../api/authAPI";
import { toast } from "react-toastify";

const PedirCodigoConfirmacion = () => {
  const [email, setEmail] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const { mutate } = useMutation({
    mutationFn: pedirCodigoConfirmacion,
    onError: error => {
      toast.error(error.message)
    },
    onSuccess: data => {
      toast.success(data)
    }
  })

  const handleSubmit = e => {
    e.preventDefault()

    if(email.trim() === "") {
      return setErrorMsg("El email no puede ir vacio")
    }

    mutate({email})
    setEmail("")
    setErrorMsg("")
  }

  return (
    <>
      <h1 className="text-5xl font-black text-white">
        Solicitar Código de Confirmación
      </h1>
      <p className="text-xl font-light text-white mt-5">
        Coloca tu e-mail para recibir {""}
        <span className=" text-fuchsia-500 font-bold"> un nuevo código</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 p-10 rounded-lg bg-white mt-10"
      >
        {errorMsg !== "" && <MensajeError mensaje={errorMsg} />}
        <div className="flex flex-col gap-5">
          <label className="text-xl font-bold" htmlFor="emailPedirCodigoConfirmacion">
            Email
          </label>
          <input
            id="emailPedirCodigoConfirmacion"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 rounded-lg border-gray-300 border"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar Código"
          className="bg-purple-400 hover:bg-purple-500 w-full p-3 rounded-lg text-white font-black uppercase text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/iniciar-sesion"
          className="text-center text-gray-300 font-normal"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
        <Link
          to="/auth/forgot-password"
          className="text-center text-gray-300 font-normal"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  );
};

export default PedirCodigoConfirmacion;
