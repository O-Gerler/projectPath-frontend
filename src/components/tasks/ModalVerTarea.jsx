/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cambiarEstadoTarea, obtenerTarea } from "../../api/tareasAPI";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { formatearFecha } from "../../helpers";
import { estadoInicialGrupos } from "../../locales/es";
import PanelNotas from "../nota/PanelNotas";

/* eslint-disable react/prop-types */
const ModalVerTarea = ({ setModalVerTarea, tarea }) => {
  const { _id, proyecto } = tarea;

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["proyecto", _id],
    queryFn: () => obtenerTarea({ idProyecto: proyecto, idTarea: _id }),
    retry: false,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: cambiarEstadoTarea,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["proyecto", proyecto] });
      queryClient.invalidateQueries({ queryKey: ["proyecto", _id] });
      toast.success(data);
    },
  });

  const handleChange = (e) => {
    const datos = {
      idProyecto: proyecto,
      idTarea: _id,
      estado: e.target.value,
    };

    mutate(datos);
  };


  if (isError) return toast.error(error.message);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-10"
      onClick={() => setModalVerTarea(false)}
    >
      <div className="modal-overlay bg-black opacity-50 absolute top-0 left-0 w-full h-full z-20" />
      {!isLoading ? (
        <>
          <div
            className="modal bg-white w-full mx-2 md:w-5/6 lg:w-4/6 p-4 sm:p-8 rounded-lg shadow-lg z-30 max-h-[600px] overflow-y-auto"
            onClick={handleModalClick}
          >
            <p>Agregado el: {formatearFecha(data.createdAt)}</p>
            <p>Ultima actualizacion: {formatearFecha(data.updatedAt)}</p>
            <h3 className="text-4xl my-5 font-black">{data.nombre}</h3>
            <p className="mb-2 container overflow-auto">Descripcion: {data.descripcion}</p>
            <div className="flex justify-center md:flex-row flex-col w-full gap-10 flex-1 mt-5">
              <div className="w-full flex flex-col gap-2">
                <p className="font-bold text-2xl text-slate-600 mb-1">
                  Estado Actual
                </p>
                <select
                  name=""
                  id="estadosTarea"
                  defaultValue={data.estado}
                  className="block w-full border py-2 px-1"
                  onChange={handleChange}
                >
                  {Object.entries(estadoInicialGrupos).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
                <p className="font-bold text-2xl text-slate-600 my-5">
                  Historial de Cambios
                </p>
                {data.completadoPor.length > 0 && (
                  <ul className="max-h-60 mt-5 list-decimal overflow-y-auto">
                    {data.completadoPor.map((cambio, i) => (
                      <li key={cambio._id} className="capitalize font-bold">
                        {i + 1}. {cambio.usuario.nombre} - {cambio.estado}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="w-full">
                <PanelNotas tarea={tarea} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ModalVerTarea;
