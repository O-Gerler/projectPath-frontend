import { isAxiosError } from "axios";
import api from "../lib/axios";

export async function crearCuenta(usuario) {
  try {
    const url = `/auth/crear-cuenta`;
    const { data } = await api.post(url, usuario);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function confirmarCuenta(token) {
  try {
    const url = `/auth/confirmar-cuenta`;
    const { data } = await api.post(url, token);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function pedirCodigoConfirmacion(email) {
  try {
    const url = `/auth/pedir-codigo-confirmacion`;
    const { data } = await api.post(url, email);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function iniciarSesion(datosUsuario) {
  try {
    const url = `/auth/iniciar-sesion`;
    const { data } = await api.post(url, datosUsuario);
    localStorage.setItem("AUTH_TOKEN", data)
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function restablecerPassword(email) {
  try {
    const url = `/auth/restablecer-password`;
    const { data } = await api.post(url, email);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function validarTokenPassword(token) {
  try {
    const url = `/auth/validar-token-password`;
    const { data } = await api.post(url, token);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function actualizarPassword({
  token,
  password,
  passwordConfirmacion,
}) {
  try {
    const url = `/auth/actualizar-password/${token}`;
    const { data } = await api.post(url, {
      password,
      "password-confirmacion": passwordConfirmacion,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function obtenerUsuario() {
  try {
    const url = "/auth"
    const { data } = await api(url)
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.response.data.error)
    }
  }
}


export async function revisarPassword(password) {
  try {
    const URL = "/auth/revisar-password"

    const { data } = await api.post(URL, password)
    return data
  } catch (error) {
    if(isAxiosError(error)) {
      throw new Error(error.response.data.error)
    }
  }
}
