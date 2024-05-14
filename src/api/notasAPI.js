import api from "../lib/axios";
import { isAxiosError } from "axios";

export async function crearNota({ idProyecto, idTarea, contenido }) {
  try {
    const URl = `/proyectos/${idProyecto}/tareas/${idTarea}/notas`

    const { data } = await api.post(URl, { contenido })
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.message)
    }
  }
}

export async function eliminarNota({ idProyecto, idTarea, idNota}) {
  try {
    const URL = `/proyectos/${idProyecto}/tareas/${idTarea}/notas/${idNota}`
    const { data } = await api.delete(URL)
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.message)
    }
  }
}