import { useState } from "react";
import MensajeError from "../../components/MensajeError";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { crearCuenta } from "../../api/authAPI";
import { toast } from "react-toastify";

const Registrarse = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmado, setPasswordConfirmado] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const { mutate } = useMutation({
    mutationFn: crearCuenta,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      clearForm();
    },
  });

  const clearForm = () => {
    setNombre("");
    setEmail("");
    setPassword("");
    setPasswordConfirmado("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if ([nombre, email, password, passwordConfirmado].includes("")) {
      return setMensajeError("Debes rellenar todos los campos");
    }

    if (password.trim().length < 8) {
      return setMensajeError(
        "El password debe tener un minimo de 8 caracteres"
      );
    }

    if (password.trim() !== passwordConfirmado.trim()) {
      return setMensajeError("Los password no coinciden");
    }

    mutate({
      nombre,
      email,
      password,
      "password-confirmacion": passwordConfirmado,
    });
    setMensajeError("");
  };

  return (
    <div>
      <h1 className="text-5xl my-3 font-black text-white">Registrate</h1>
      <p className="text-xl mb-6 text-white">
        Rellena el formulario para{" "}
        <span className="font-bold text-fuchsia-500">crear tu cuenta</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded flex flex-col gap-2 px-2 sm:px-10 pt-5 pb-10"
      >
        {mensajeError !== "" && <MensajeError mensaje={mensajeError} />}
        <div className="flex flex-col gap-3">
          <label className="text-xl font-semibold" htmlFor="nombreInicioSesion">
            Nombre
          </label>
          <input
            className="border py-2 bg-slate-50 px-2"
            placeholder="Nombre de registro"
            type="text"
            id="nombreInicioSesion"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-xl font-semibold" htmlFor="emailInicioSesion">
            Email
          </label>
          <input
            className="border py-2 bg-slate-50 px-2"
            placeholder="Email de registro"
            type="email"
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
        <div className="flex flex-col gap-3">
          <label
            className="text-xl font-semibold"
            htmlFor="ConfiramrPasswordInicioSesion"
          >
            Confirmar Password
          </label>
          <input
            className="border py-2 bg-slate-50 px-2"
            placeholder="Repetir password"
            type="password"
            id="ConfiramrPasswordInicioSesion"
            value={passwordConfirmado}
            onChange={(e) => setPasswordConfirmado(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="w-full mt-4 bg-purple-500 font-black text-white py-2 cursor-pointer hover:bg-purple-700 transition-colors text-xl"
          value="Registrarse"
        />
      </form>
      <nav>
        <Link
          className="text-center block text-gray-200 mt-5 cursor-pointer"
          to="/auth/iniciar-sesion"
        >
          ¿Ya tienes cuenta?{" "}
          <span className="font-bold text-fuchsia-500">Inicia sesión</span>
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

export default Registrarse;
