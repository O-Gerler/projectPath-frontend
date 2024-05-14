import { useState } from "react";
import MensajeError from "../../components/MensajeError";
import { Link, useNavigate } from "react-router-dom";
import { useMutation  } from "@tanstack/react-query";
import { iniciarSesion } from "../../api/authAPI";
import { toast } from "react-toastify";

const IniciarSesion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: iniciarSesion,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      navigate("/")
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if ([email, password].includes("")) {
      return setMensajeError("Debes rellenar todos los campos");
    }

    mutate({ email, password });
    setMensajeError("");
  };

  return (
    <div>
      <h1 className="text-5xl my-2 font-black text-white">Inicia sesión</h1>
      <p className="text-xl mb-5 text-white">
        Empieza a planear tus{" "}
        <span className="font-bold text-fuchsia-500">proyectos</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded flex flex-col gap-4 px-2 sm:px-10 py-5 container"
      >
        {mensajeError !== "" && <MensajeError mensaje={mensajeError} />}
        <div className="flex flex-col gap-3">
          <label className="text-xl font-semibold" htmlFor="emailInicioSesion">
            Email
          </label>
          <input
            className="border py-2 bg-slate-50 px-2"
            placeholder="Email de registro"
            type="text"
            id="emailInicioSesion"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            className="text-xl font-semibold"
            htmlFor="passwordInicioSesion"
          >
            Password
          </label>
          <input
            className="border py-2 bg-slate-50 px-2"
            placeholder="Password de registro"
            type="password"
            id="passwordInicioSesion"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="w-full bg-purple-400 text-xl font-black text-white py-2 cursor-pointer hover:bg-purple-600 transition-colors"
          value="Iniciar sesión"
        />
      </form>
      <nav>
        <Link
          className="text-center block text-gray-200 mt-5 cursor-pointer"
          to="/auth/registrarse"
        >
          ¿Aun no tienes cuenta?{" "}
          <span className="font-bold text-fuchsia-500">Registrate</span>
        </Link>

        <Link
          className="text-center block text-gray-200 mt-2 cursor-pointer"
          to="/auth/restablecer-password"
        >
          ¿Olvidaste tu password?{" "}
          <span className="font-bold text-fuchsia-500">Restablecer</span>
        </Link>
      </nav>
    </div>
  );
};

export default IniciarSesion;
