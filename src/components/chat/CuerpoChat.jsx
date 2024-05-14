import { formatearFecha } from "../../helpers";
import MensajeChat from "./MensajeChat";
import ScrollToBottom from "react-scroll-to-bottom";

/* eslint-disable react/prop-types */
const CuerpoChat = ({ listaMensajes, mensajes }) => {
  return (
    <ScrollToBottom behavior="smooth">
      <div className="mx-auto p-3 flex flex-col gap-3 h-[450px] ">
        {mensajes.length > 0 &&
          mensajes.map((mensaje) => (
            <MensajeChat
              key={mensaje._id}
              mensaje={mensaje.contenido}
              autor={mensaje.autor.nombre}
              fecha={formatearFecha(mensaje.createdAt)}
            />
          ))}
        {listaMensajes.map((mensaje, i) => (
          <MensajeChat
            mensaje={mensaje.mensaje}
            autor={mensaje.autor}
            fecha={mensaje.fecha}
            key={i}
          />
        ))}
      </div>
    </ScrollToBottom>
  );
};

export default CuerpoChat;
