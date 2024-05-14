import { isAxiosError } from "axios";
import api from "../lib/axios";

export async function crearTarea({idProyecto, tarea}) {
  try {
    const URL = `/proyectos/${idProyecto}/tareas`
    const { data } = await api.post(URL, tarea)
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function editarTarea({ idProyecto, tareaActualizada }) {
  const URL = `/proyectos/${idProyecto}/tareas/${tareaActualizada.idTarea}`

  try {
    const { data } = await api.put(URL, tareaActualizada)
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function eliminarTarea({ idProyecto, idTarea }) {
  const URL = `/proyectos/${idProyecto}/tareas/${idTarea}`

  try {
    const { data } = await api.delete(URL)
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function obtenerTarea({ idProyecto, idTarea }) {
  const URL = `/proyectos/${idProyecto}/tareas/${idTarea}`

  try {
    const { data } = await api(URL)
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function cambiarEstadoTarea({ idProyecto, idTarea, estado }) {
  const URL = `/proyectos/${idProyecto}/tareas/${idTarea}/estado`

  try {
    const { data } = await api.post(URL, { estado })
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.response.data.error)
    }
  }
}