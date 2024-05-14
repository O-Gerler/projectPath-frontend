import { Link } from "react-router-dom";
import { useState } from "react";
import MensajeError from "../../components/MensajeError";
import { useMutation } from "@tanstack/react-query";
import { restablecerPassword } from "../../api/authAPI";
import { toast } from "react-toastify";

export default function RestablecerPassword() {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { mutate } = useMutation({
    mutationFn: restablecerPassword,
    onError: error => {
      toast.error(error.message)
    },
    onSuccess: data => {
      toast.success(data)
      setEmail("")
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim("") === "") {
      return setErrorMsg("El email no puede ir vacio");
    }

    setErrorMsg("")
    mutate({ email })
  };

  return (
    <>
      <h1 className="text-5xl font-black text-white my-2">
        Restablece tu password
      </h1>
      <p className="text-xl text-white mb-5">
        ¿Olvidaste tu password? Escribe tu email y{""}
        <span className=" text-fuchsia-500 font-bold"> restable tu password</span>
      </p>
      <form onSubmit={handleSubmit} className="space-y-8 px-2 py-10 sm:p-10 rounded bg-white">
        {errorMsg !== "" && <MensajeError mensaje={errorMsg} />}
        <div className="flex flex-col gap-5">
          <label className="font-semibold text-xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-purple-400 hover:bg-purple-500 w-full p-3 transition-colors text-white font-black cursor-pointer text-xl"
        />
      </form>

      <nav className="mt-5 flex flex-col space-y-2">
        <Link
          to="/auth/iniciar-sesion"
          className="text-center text-gray-300 font-normal"
        >
          ¿Ya tienes cuenta? <span className="font-bold text-fuchsia-500">Inicia Sesión</span>
        </Link>

        <Link
          to="/auth/registrarse"
          className="text-center text-gray-300 font-normal"
        >
          ¿No tienes cuenta? <span className="font-bold text-fuchsia-500">Registrate</span>
        </Link>
      </nav>
    </>
  );
}
