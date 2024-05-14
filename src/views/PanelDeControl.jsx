import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { obtenerProyectos } from "../api/proyectoAPI";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { esManager } from "../lib/policies.js";
import ModalEliminarProyecto from "../components/projects/ModalEliminarProyecto.jsx";

const PanelDeControl = () => {
  const [menu, setMenu] = useState({});
  const [modalEliminarProyecto, setModalEliminarProyecto] = useState(false);
  const [idProyectoEliminar, setIdProyectoEliminar] = useState("")

  const { data: usuarioData, isLoading: usuarioIsLoading } = useAuth();

  const handleMenu = (id) => {
    setMenu((prevMenu) => {
      const updatedMenu = {};

      Object.keys(prevMenu).forEach((key) => {
        updatedMenu[key] = false;
      });

      updatedMenu[id] = !(id in updatedMenu) ? true : !prevMenu[id];

      return updatedMenu;
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["proyectos"],
    queryFn: obtenerProyectos,
  });

  const handleEliminarProyecto = id => {
    setModalEliminarProyecto(true)
    setIdProyectoEliminar(id)
  }

  if (isLoading && usuarioIsLoading) return "Cargando...";

  if (data && usuarioData)
    return (
      <>
        <h1 className="text-5xl font-black">Mis Proyectos</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Maneja y administra tus proyectos
        </p>

        <nav className="my-5">
          <Link
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors uppercase"
            to="/proyectos/crear"
          >
            Nuevo proyecto
          </Link>
        </nav>

        <section>
          {data.length > 0 ? (
            <ul>
              {data.map(({ _id, nombre, cliente, descripcion, manager }) => (
                <li
                  className="bg-white my-2 p-5 flex justify-between items-center"
                  key={_id}
                >
                  <div>
                    <h2 className="text-3xl font-bold mb-2 capitalize hover:underline">
                      <Link to={`/proyectos/${_id}`}>{nombre}</Link>
                    </h2>
                    <p className="text-gray-600 font-light text-lg">
                      Cliente: {cliente}
                    </p>
                    <p className="text-gray-600 font-light text-lg">
                      {descripcion}
                    </p>
                    <p
                      className={`inline-block uppercase ${
                        esManager(manager, usuarioData._id)
                          ? "bg-green-50 text-green-500 border-green-500"
                          : "bg-orange-50 text-orange-500 border-orange-500"
                      } px-3 py-1 rounded-lg mt-3 border text-sm font-bold`}
                    >
                      {esManager(manager, usuarioData._id)
                        ? "Manager"
                        : "Colaborador"}
                    </p>
                  </div>
                  {manager === usuarioData._id && (
                    <div className="relative">
                      <BsThreeDotsVertical
                        className="cursor-pointer w-8 h-8"
                        onClick={() => handleMenu(_id)}
                      />
                      {menu[_id] && (
                        <div className="absolute top-5 right-6 w-48 bg-white border border-gray-200 rounded shadow-lg transition-all">
                          <ul>
                            <Link
                              className="py-2 px-4 block hover:bg-gray-100 cursor-pointer"
                              to={`/proyectos/${_id}`}
                            >
                              Ver Proyecto
                            </Link>
                            <Link
                              className="py-2 px-4 block hover:bg-gray-100 cursor-pointer"
                              to={`/proyectos/${_id}/editar`}
                            >
                              Editar Proyecto
                            </Link>
                            <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-red-500">
                              <button
                                onClick={() => handleEliminarProyecto(_id)}
                              >
                                Eliminar Proyecto
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center py-20 uppercase font-bold text-xl">
              No hay proyectos aun{" "}
              <Link className="text-purple-400 underline" to="/proyectos/crear">
                Crea un proyecto
              </Link>
            </p>
          )}
          {modalEliminarProyecto && (
            <ModalEliminarProyecto
              setModalEliminarProyecto={setModalEliminarProyecto}
              id={idProyectoEliminar}
            />
          )}
        </section>
      </>
    );
};

export default PanelDeControl;
