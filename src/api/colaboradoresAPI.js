import { isAxiosError } from "axios";
import api from "../lib/axios";

export async function buscarColaboradorPorEmail({ email, idProyecto }) {
  try {
    const url = `/proyectos/${idProyecto}/colaboradores/buscar`
    const { data } = await api.post(url, { email })
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function agregarColaborador({ idProyecto, id }) {
  try {
    const url = `/proyectos/${idProyecto}/colaboradores`
    const { data } = await api.post(url, { id })
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function obtenerColaborador(idProyecto) {
  try {
    const url = `/proyectos/${idProyecto}/colaboradores`
    const { data } = await api(url)
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function eliminarColaborador({ idProyecto, idUsuario }) {
  try {
    const url = `/proyectos/${idProyecto}/colaboradores/${idUsuario}`
    const { data } = await api.delete(url)
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.response.data.error)
    }
  }
}