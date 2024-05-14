import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import PanelDeControl from "./views/PanelDeControl";
import CrearProyecto from "./views/projects/CrearProyecto";
import EditarProyecto from "./views/projects/EditarProyecto";
import DetallesProyecto from "./views/projects/DetallesProyecto";
import AuthLayout from "./layouts/AuthLayout";
import IniciarSesion from "./views/auth/IniciarSesion";
import Registrarse from "./views/auth/Registrarse";
import ConfirmarCuenta from "./views/auth/ConfirmarCuenta";
import PedirCodigoConfirmacion from "./views/auth/PedirCodigoConfirmacion";
import RestablecerPassword from "./views/auth/RestablecerPassword";
import NuevaPassword from "./views/auth/NuevaPassword";
import Colaboradores from "./views/projects/Colaboradores";
import Perfil from "./views/perfil/Perfil";
import CambiarPassword from "./views/perfil/CambiarPassword";
import PerfilLayout from "./layouts/PerfilLayout";
import NoEncontrado from "./views/404/NoEncontrado";
import ChatProyecto from "./views/projects/ChatProyecto";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<PanelDeControl />} index />
          <Route element={<PerfilLayout />}>
            <Route path="/perfil" element={<Perfil />} />
            <Route
              path="/perfil/cambiar-password"
              element={<CambiarPassword />}
            />
          </Route>
          <Route path="/proyectos/crear" element={<CrearProyecto />} />
          <Route path="/proyectos/:idProyecto" element={<DetallesProyecto />} />
          <Route path="/proyectos/:idProyecto/chat" element={<ChatProyecto />} />
          <Route
            path="/proyectos/:idProyecto/editar"
            element={<EditarProyecto />}
          />
          <Route
            path="/proyectos/:idProyecto/colaboradores"
            element={<Colaboradores />}
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/auth/registrarse" element={<Registrarse />} />
          <Route path="/auth/confirmar-cuenta" element={<ConfirmarCuenta />} />
          <Route
            path="/auth/pedir-codigo-confirmacion"
            element={<PedirCodigoConfirmacion />}
          />
          <Route
            path="/auth/restablecer-password"
            element={<RestablecerPassword />}
          />
          <Route path="/auth/nueva-password" element={<NuevaPassword />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/404" element={<NoEncontrado />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
