import { useState } from "react";
import CardTarea from "./CardTarea";
import DropTarea from "./DropTarea";
import { DndContext } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cambiarEstadoTarea } from "../../api/tareasAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

/* eslint-disable react/prop-types */
const ListaTareas = ({
  tareas,
  setTarea,
  setModalEditarTarea,
  setModalVerTarea,
  puedeEditar,
}) => {
  const [menu, setMenu] = useState({});
  const { idProyecto } = useParams()

  const estadoInicialGrupos = {
    pendiente: [],
    "en espera": [],
    "en progreso": [],
    "en revision": [],
    completada: [],
  };

  const estilosEstados = {
    pendiente: "border-t-slate-500",
    "en espera": "border-t-red-500",
    "en progreso": "border-t-blue-500",
    "en revision": "border-t-amber-500",
    completada: "border-t-emerald-500",
  };

  const tareasAgrupadas = tareas.reduce((acc, tarea) => {
    let grupoActual = acc[tarea.estado] ? [...acc[tarea.estado]] : [];
    grupoActual = [...grupoActual, tarea];
    return { ...acc, [tarea.estado]: grupoActual };
  }, estadoInicialGrupos);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: cambiarEstadoTarea,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["proyecto", idProyecto] });
      toast.success(data);
    },
  });

  const handleDragEnd = (e) => {
    const { over, active } = e;

    if (over && over.id) {
      const idTarea = active.id
      const estado = over.id

      mutate({idProyecto, idTarea, estado})

      // Metodo de actualizacion instantanea 
      // ERROR: Actualiza el estado del proyecto

      // queryClient.setQueryData(["proyecto", idProyecto], (prevData) => {
      //   const tareasActualizadas = prevData.tareas.map(tarea => {
      //     return tarea._id === idTarea ? {...tarea, estado} : tarea
      //   })

      //   return {
      //     prevData,
      //     tareas: tareasActualizadas
      //   }
      // })
    }
  };

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(tareasAgrupadas).map(([estado, tarea]) => (
            <div key={estado} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
              <h3
                className={`text-center capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${estilosEstados[estado]}`}
              >
                {estado === "en revision" ? "En revisión" : estado}
              </h3>

              <DropTarea estado={estado} />

              <ul className="mt-5 space-y-5">
                {tarea.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">
                    No hay tareas
                  </li>
                ) : (
                  tarea.map((tarea) => (
                    <CardTarea
                      key={tarea._id}
                      tarea={tarea}
                      menu={menu}
                      setMenu={setMenu}
                      setTarea={setTarea}
                      setModalEditarTarea={setModalEditarTarea}
                      setModalVerTarea={setModalVerTarea}
                      puedeEditar={puedeEditar}
                    />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
};

export default ListaTareas;
