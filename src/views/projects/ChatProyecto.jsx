import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import { useAuth } from "../../hooks/useAuth";
import CuerpoChat from "../../components/chat/CuerpoChat";
import { formatearFecha } from "../../helpers";
import { useQuery } from "@tanstack/react-query";
import CardColaboradorChat from "../../components/chat/CardColaboradorChat";
import { obtenerProyecto } from "../../api/proyectoAPI";
const socket = io.connect(import.meta.env.VITE_SERVER_URL);

const ChatProyecto = () => {
  const [mensaje, setMensaje] = useState("");
  const [listaMensajes, setListaMensajes] = useState([]);
  const { idProyecto } = useParams();
  const { data, isError, isLoading } = useAuth();

  const {
    data: dataProyecto,
    isLoading: isLoadingProyecto,
    isError: isErrorProyecto,
  } = useQuery({
    queryKey: ["chatColaboradoresProyecto", idProyecto],
    queryFn: () => obtenerProyecto(idProyecto),
    retry: false,
  });

  useEffect(() => {
    socket.emit("join_room", idProyecto);
  }, [idProyecto]);

  useEffect(() => {
    const handleMenssage = (data) =>
      setListaMensajes((prevLista) => [...prevLista, data]);
    socket.on("receive_message", handleMenssage);

    return () => socket.off("receive_message", handleMenssage);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const infoMensaje = {
      mensaje,
      idAutor: data._id,
      autor: data.nombre,
      idProyecto,
      fecha: formatearFecha(new Date()),
    };

    await socket.emit("send_message", infoMensaje);
    setListaMensajes((prevLista) => [...prevLista, infoMensaje]);
    setMensaje("");
  };
  
  if (isLoading && isLoadingProyecto) return "Cargando...";
  if (isError || isErrorProyecto) return <Navigate to="/404" />;
  if (data && dataProyecto)
    return (
      <section>
        <h1 className="text-5xl font-black">Chat de {dataProyecto.nombre}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Chat global del proyecto, escribe y colabora
        </p>

        <nav className="my-5">
          <Link
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors uppercase"
            to={`/proyectos/${idProyecto}`}
          >
            Volver
          </Link>
        </nav>
        <div className="flex flex-col md:flex-row flex-1 items-start mt-10 gap-2">
          <aside className="md:w-1/5 w-full bg-white rounded-lg p-2 h-full order-2 md:order-1">
            <ul className="space-y-2">
              <CardColaboradorChat colaborador={dataProyecto.manager} esManager={true} />
              {dataProyecto.colaboradores.length > 0 && dataProyecto.colaboradores.map((colaborador) => (
                <CardColaboradorChat
                  key={colaborador._id}
                  colaborador={colaborador}
                  esManager={false}
                />
              ))}
            </ul>
          </aside>
          <form
            className="w-full mx-auto h-[520px] bg-white flex gap-0 flex-col justify-around rounded-xl shadow order-1 md:order-2"
            onSubmit={handleSubmit}
          >
            <CuerpoChat listaMensajes={listaMensajes} mensajes={dataProyecto.mensajes}/>
            <div className="flex px-2 pb-2">
              <input
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                type="text"
                placeholder="Mensaje..."
                className="align-middle px-5 border w-full rounded-l"
              />
              <button
                type="submit"
                className="py-2 px-5 bg-purple-500 font-bold uppercase text-white hover:bg-purple-600 transition-colors rounded-r"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </section>
    );
};

export default ChatProyecto;
