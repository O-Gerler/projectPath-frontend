import { isAxiosError } from "axios"
import api from "../lib/axios"

export async function actualizarPerfil(perfil) {
  try {
    const URL = "/auth/perfil"

    const { data } = await api.put(URL, perfil)
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function actualizarPasswordActual(body) {
  try {
    const URL = "/auth/cambiar-password-actual"

    const { data } = await api.post(URL, body)
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.response.data.error)
    }
  }
}