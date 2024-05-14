import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { revisarPassword } from "../../api/authAPI";
import { toast } from "react-toastify";
import { eliminarProyecto } from "../../api/proyectoAPI";

/* eslint-disable react/prop-types */
const ModalEliminarProyecto = ({ setModalEliminarProyecto, id }) => {
  const [password, setPassword] = useState("");

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const revisarPasswordMutacion = useMutation({
    mutationFn: revisarPassword,
    onError: (error) => toast.error(error.message),
  });

  const queryClient = useQueryClient()
  const eliminarProyectoMutacion = useMutation({
    mutationFn: eliminarProyecto,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["proyectos"] });
      toast.success(data);
      setModalEliminarProyecto(false)
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await revisarPasswordMutacion.mutateAsync({ password });
    await eliminarProyectoMutacion.mutateAsync(id)
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-10"
      onClick={() => setModalEliminarProyecto(false)}
    >
      <div className="modal-overlay bg-black opacity-50 absolute top-0 left-0 w-full h-full z-20" />
      <div
        className="modal bg-white w-1/2 p-8 rounded-lg shadow-lg z-30"
        onClick={handleModalClick}
      >
        <h3 className="text-4xl my-5 font-black">Eliminar Proyecto</h3>
        <p className="text-xl font-bold">
          Confirma la eliminación de tu proyecto{" "}
          <span className="font-black text-fuchsia-500">
            insertando el password
          </span>
        </p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <label className="font-normal text-2xl">Password</label>
            <input
              type="password"
              placeholder="Password de Registro"
              className="w-full p-3  border-gray-300 border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Eliminar Proyecto"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default ModalEliminarProyecto;
