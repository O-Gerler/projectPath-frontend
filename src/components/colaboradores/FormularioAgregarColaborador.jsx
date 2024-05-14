import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import MensajeError from "../MensajeError";
import { buscarColaboradorPorEmail } from "../../api/colaboradoresAPI";
import { toast } from "react-toastify";
import ResultadoBusqueda from "./ResultadoBusqueda";

export default function FormularioAgregarColaborador() {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { idProyecto } = useParams();

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: buscarColaboradorPorEmail,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["chatColaboradoresProyecto", idProyecto]})
    },
  });

  const handleSearchUser = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      return setErrorMsg("El email no puede ir vacio");
    }

    setErrorMsg("");
    mutation.mutate({ idProyecto, email });
  };

  return (
    <>
      <form className="mt-10 space-y-5" onSubmit={handleSearchUser}>
        {errorMsg !== "" && <MensajeError mensaje={errorMsg} />}
        <div className="flex flex-col gap-3">
          <label className="font-normal text-2xl" htmlFor="name">
            E-mail de Usuario
          </label>
          <input
            id="name"
            type="text"
            placeholder="E-mail del usuario a Agregar"
            className="w-full p-3  border-gray-300 border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
          value="Buscar Usuario"
        />
      </form>

      <div className="mt-10">
        {mutation.isPending && <p className="text-center">Cargando...</p>}
        {mutation.isError && (
          <p className="text-center">No se encontro el usuario</p>
        )}
        {mutation.data && (
          <ResultadoBusqueda usuario={mutation.data} setEmail={setEmail} />
        )}
      </div>
    </>
  );
}
