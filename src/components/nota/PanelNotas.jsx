/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import CrearNotaForm from "./CrearNotaForm";
import DetallesNota from "./DetallesNota";
import { useQuery } from "@tanstack/react-query";
import { obtenerTarea } from "../../api/tareasAPI";

const PanelNotas = ({ tarea }) => {
  const { _id: idTarea } = tarea;
  const { idProyecto } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ["proyecto", "tarea", idProyecto, idTarea],
    queryFn: () => obtenerTarea({ idProyecto, idTarea })
  })

  if(isLoading) return "Cargando..."
  const { notas } = data
  
  return (
    <>
      <CrearNotaForm tarea={tarea} />
      {notas.length > 0 && (
        <div className="divide-y divide-gray-100 mt-10 max-h-60 overflow-y-auto">
          <p className="font-bold text-2xl text-slate-600 my-5">Notas</p>
          {notas.map((nota) => (
            <DetallesNota key={nota._id} nota={nota} idTarea={idTarea}/>
          ))}
        </div>
      )}
    </>
  );
};

export default PanelNotas;
