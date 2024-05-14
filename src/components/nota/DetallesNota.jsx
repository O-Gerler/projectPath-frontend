/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { formatearFecha } from "../../helpers";
import { useAuth } from "../../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eliminarNota } from "../../api/notasAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

/* eslint-disable react/prop-types */
const DetallesNota = ({ nota, idTarea }) => {
  const { data, isLoading } = useAuth();
  const puedeEliminar = useMemo(() => data?._id === nota.creadoPor._id, [data]);
  const { idProyecto } = useParams()

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: eliminarNota,
    onError: error => {
      toast.error(error.message)
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["proyecto", "tarea", idProyecto, idTarea]})
      toast.success(data)
    }
  })

  const handleEliminarNota = () => {
    mutate({idProyecto, idTarea, idNota: nota._id})
  }

  if (isLoading) return "Cargando...";

  if (data)
    return (
      <div className="p-3 flex justify-between items-center">
        <div>
          <p>
            {nota.contenido} por:{" "}
            <span className="font-bold">{nota.creadoPor.nombre}</span>
          </p>
          <p className="text-xs text-slate-500">
            {formatearFecha(nota.createdAt)}
          </p>
        </div>
        {puedeEliminar && (
          <button
            type="button"
            className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
            onClick={handleEliminarNota}
          >
            Eliminar
          </button>
        )}
      </div>
    );
};

export default DetallesNota;
