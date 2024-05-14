import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { obtenerProyecto } from "../../api/proyectoAPI";
// import { useState } from "react";
import FormularioEditarPoyecto from "../../components/projects/FormularioEditarPoyecto";

const EditarProyecto = () => {
  const { idProyecto } = useParams()

  // eslint-disable-next-line no-unused-vars
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["editarProyecto", idProyecto],
    queryFn: () => obtenerProyecto(idProyecto),
    retry: false,
  })

  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />

  return (
    <div>
      <FormularioEditarPoyecto
        data={data}
      />
    </div>
  )
}

export default EditarProyecto
