import { Link, Outlet, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../components/Logo"
import MenuNav from "@/components/MenuNav"
import { useAuth } from "../hooks/useAuth";

const AppLayout = () => {
  const { data, isError, isLoading } = useAuth()

  if(isLoading) return "Cargando..."
  if(isError) {
    return <Navigate to="/auth/iniciar-sesion" />
  }

  if(data) return (
    <>
      <header className="bg-gray-800 py-10">
        <div className="flex flex-col lg:flex-row justify-between items-center container mx-auto">
          <div className="w-64 py-5 lg:py-0"><Link to="/"><Logo /></Link></div>
          <nav>
            <MenuNav nombre={data.nombre}/>
          </nav>
        </div>
      </header>

      <section className="container mx-auto mt-10 p-5">
        <Outlet />
      </section>

      <footer className="py-5">
        <p className="text-center">Todos los derechos reservados {new Date().getFullYear()}</p>
      </footer>

      <ToastContainer 
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        autoClose={1000}
      />
    </>
  )
}

export default AppLayout