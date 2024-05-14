import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import ModalAgregarColaborador from "../../components/colaboradores/ModalAgregarColaborador";
import { useQuery } from "@tanstack/react-query";
import { obtenerColaborador } from "../../api/colaboradoresAPI";
import ListaColaboradores from "../../components/colaboradores/ListaColaboradores";

const Colaboradores = () => {
  const { idProyecto } = useParams();
  const [modalAgregarColaborador, setModalAgregarColaborador] = useState(false);
  const [menu, setMenu] = useState({});

  const { data, isLoading, isError } = useQuery({
    queryKey: ["colaboradores", idProyecto],
    queryFn: () => obtenerColaborador(idProyecto),
    retry: false,
  });

  const handleShowModal = () => {
    setModalAgregarColaborador(!modalAgregarColaborador);
  };

  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;

  if (data)
    return (
      <>
        <h1 className="text-5xl font-black break-words">Agrega Colaboradores</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Administra el equipo de trabajo para este proyecto
        </p>
        <nav className="my-5 flex gap-3 flex-wrap">
          <button
            type="button"
            className="bg-purple-400 hover:bg-purple-500 transition-colors px-10 py-3 text-white text-xl cursor-pointer font-bold"
            onClick={handleShowModal}
          >
            Agregar Colaborador
          </button>
          <Link
            to={`/proyectos/${idProyecto}`}
            className="bg-fuchsia-700 hover:bg-fuchsia-800 transition-colors px-10 py-3 text-white text-xl cursor-pointer font-bold"
          >
            Volver a Proyecto
          </Link>
        </nav>
        {modalAgregarColaborador && (
          <ModalAgregarColaborador
            setModalAgregarColaborador={setModalAgregarColaborador}
          />
        )}
        {data.length < 1 ? (
          <div className="mt-10">
            <h1 className="text-3xl font-black">
              Aun no tienes ningun colaborador en el proyecto
            </h1>
            <p className="text-lg mt-1 font-light">
              Agrega colaboradores para poder compartir tus{" "}
              <span className="text-fuchsia-500 font-bold">
                proyectos y tareas
              </span>
            </p>
          </div>
        ) : (
          <ListaColaboradores data={data} menu={menu} setMenu={setMenu} />
        )}
      </>
    );
};

export default Colaboradores;
