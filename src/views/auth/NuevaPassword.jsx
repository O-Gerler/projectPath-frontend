import { useState } from "react";
import NuevaPasswordToken from "../../components/auth/NuevaPasswordToken";
import NuevaPasswordForm from "../../components/auth/NuevaPasswordForm";

const NuevaPassword = () => {
  const [tokenValido, setTokenValido] = useState(false);
  const [token, setToken] = useState("");

  return (
    <>
      <h1 className="text-5xl font-black text-white my-2">
        Restablece tu password
      </h1>
      <p className="text-xl text-white mb-5">
        ¿Olvidaste tu password? Escribe tu email y{""}
        <span className=" text-fuchsia-500 font-bold">
          {" "}
          restable tu password
        </span>
      </p>

      {!tokenValido ? (
        <NuevaPasswordToken
          token={token}
          setToken={setToken}
          setTokenValido={setTokenValido}
        />
      ) : (
        <NuevaPasswordForm token={token}/>
      )}
    </>
  );
};

export default NuevaPassword;
