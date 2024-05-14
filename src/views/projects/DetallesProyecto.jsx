import { useQuery } from "@tanstack/react-query";
import { useParams, Navigate, Link } from "react-router-dom";
import { obtenerProyecto } from "../../api/proyectoAPI";
import ModalCrearTarea from "../../components/tasks/ModalCrearTarea";
import { useMemo, useState } from "react";
import ListaTareas from "../../components/tasks/ListaTareas";
import ModalEditarTarea from "../../components/tasks/ModalEditarTarea";
import ModalVerTarea from "../../components/tasks/ModalVerTarea";
import { useAuth } from "../../hooks/useAuth";
import { esManager } from "../../lib/policies";

const DetallesProyecto = () => {
  const [modalCrearTarea, setModalCrearTarea] = useState(false);
  const [modalEditarTarea, setModalEditarTarea] = useState(false);
  const [modalVerTarea, setModalVerTarea] = useState(false);
  const [tarea, setTarea] = useState({});
  const { idProyecto } = useParams();

  const { data: usuarioData, isLoading: usuarioIsLoading } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["proyecto", idProyecto],
    queryFn: () => obtenerProyecto(idProyecto),
    retry: false,
  });

  const puedeEditar = useMemo(
    () => usuarioData?._id === data?.manager?._id,
    [data, usuarioData]
  );
  

  if (isLoading && usuarioIsLoading) return "Cargando...";
  if (isError) return <Navigate to={"/404"} />;

  if (data && usuarioData)
    return (
      <>
        <h1 className="text-5xl font-black">{data.nombre}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.descripcion}
        </p>

        <nav className="my-5 flex justify-between items-center flex-wrap gap-5">
          {esManager(data.manager._id, usuarioData._id) && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="bg-purple-400 hover:bg-purple-500 transition-colors px-10 py-3 text-white text-xl cursor-pointer font-bold"
                onClick={() => setModalCrearTarea(true)}
              >
                Agregar Tarea
              </button>
              <Link
                to="colaboradores"
                className="bg-fuchsia-700 hover:bg-fuchsia-800 transition-colors px-10 py-3 text-white text-xl cursor-pointer font-bold"
              >
                Agregar Colaboradores
              </Link>
            </div>
          )}
          <div>
            <Link
              type="button"
              className="bg-purple-400 hover:bg-purple-500 transition-colors px-10 py-3 text-white text-xl cursor-pointer font-bold uppercase"
              to={`/proyectos/${idProyecto}/chat`}
            >
              Chat
            </Link>
          </div>
        </nav>

        <ListaTareas
          tareas={data.tareas}
          setTarea={setTarea}
          setModalEditarTarea={setModalEditarTarea}
          setModalVerTarea={setModalVerTarea}
          puedeEditar={puedeEditar}
        />
        {modalCrearTarea && (
          <ModalCrearTarea
            setModalCrearTarea={setModalCrearTarea}
            idProyecto={idProyecto}
          />
        )}
        {modalEditarTarea && (
          <ModalEditarTarea
            setModalEditarTarea={setModalEditarTarea}
            tarea={tarea}
          />
        )}
        {modalVerTarea && (
          <ModalVerTarea setModalVerTarea={setModalVerTarea} tarea={tarea} />
        )}
      </>
    );
};

export default DetallesProyecto;
