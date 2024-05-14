/* eslint-disable react/prop-types */
import { useAuth } from "../../hooks/useAuth";

const MensajeChat = ({ mensaje, autor, fecha }) => {
  const { data } = useAuth();

  return (
    <div
      className={`border py-3 px-10 rounded text-lg font-semibold ${
        autor === data.nombre
          ? "bg-cyan-50 border-cyan-700 self-end text-right"
          : "bg-fuchsia-50 border-fuchsia-700 self-start"
      }`}
    >
      <p>{mensaje}</p>
      <p className={`text-base font-semibold italic ${
        autor === data.nombre
          ? "text-cyan-700"
          : "text-fuchsia-700"
      }`}><span className="font-bold">{autor}</span> a las <span className="font-bold">{fecha}</span></p>
    </div>
  );
};

export default MensajeChat;
