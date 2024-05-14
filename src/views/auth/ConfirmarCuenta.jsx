import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { confirmarCuenta } from "../../api/authAPI";
import { toast } from "react-toastify";

const ConfirmarCuenta = () => {
  const [token, setToken] = useState("")
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: confirmarCuenta,
    onError: error => {
      toast.error(error.message)
    },
    onSuccess: data => {
      toast.success(data)
      navigate("/")
    }
  })

  const handleChange = token => {
    setToken(token)
  }

  const handleComplete = token => {
    mutate({token})
  }

  return (
    <>
      <h1 className="text-5xl font-black text-white pb-4">Confirma tu cuenta</h1>
      <p className="text-white text-xl">
        Ingresa el codigo que recibiste{" "} 
        <span className="text-fuchsia-500 font-bold">por e-mail</span>
      </p>
      <form
        className="space-y-8 p-10 bg-white mt-10"
      >
        <label
          className="font-normal text-2xl text-center block"
        >Código de 6 dígitos</label>
        <div className="flex justify-center gap-5">
          <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
            <PinInputField className="w-10 p-3 h-10 rounded-lg border-gray-300 border placeholder-white text-xl font-bold text-center"/>
            <PinInputField className="w-10 p-3 h-10 rounded-lg border-gray-300 border placeholder-white text-xl font-bold text-center"/>
            <PinInputField className="w-10 p-3 h-10 rounded-lg border-gray-300 border placeholder-white text-xl font-bold text-center"/>
            <PinInputField className="w-10 p-3 h-10 rounded-lg border-gray-300 border placeholder-white text-xl font-bold text-center"/>
            <PinInputField className="w-10 p-3 h-10 rounded-lg border-gray-300 border placeholder-white text-xl font-bold text-center"/>
            <PinInputField className="w-10 p-3 h-10 rounded-lg border-gray-300 border placeholder-white text-xl font-bold text-center"/>
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/pedir-codigo-confirmacion'
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
};

export default ConfirmarCuenta;
