import { isAxiosError } from "axios";
import api from "../lib/axios";

export async function crearProyecto(proyecto) {
  const URL = "/proyectos"

  try {
    const { data } = await api.post(URL, proyecto)
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function obtenerProyectos() {
  const URL = "/proyectos"

  try {
    const { data } = await api(URL)
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function obtenerProyecto(id) {
  const URL = `/proyectos/${id}`
  
  try {
    const { data } = await api(URL)
    
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function editarProyecto({id, proyecto}) {
  const URL = `/proyectos/${id}`

  try {
    const { data } = await api.put(URL, proyecto)
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function eliminarProyecto(id) {
  const URL = `/proyectos/${id}`

  try {
    const { data } = await api.delete(URL)
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.response.data.error)
    }
  }
}