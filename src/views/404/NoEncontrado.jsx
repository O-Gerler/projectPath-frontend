import { Link } from "react-router-dom"

const NoEncontrado = () => {
  return (
    <>
      <h1 className="font-black text-center text-4xl mt-32 text-white">Página no encontrada</h1>   
      <p className="mt-2 text-center text-white">
        Tal vez quieras volver a {" "}
        <Link to="/" className="text-fuchsia-500">Proyectos</Link>
      </p>
    </>
  )
}

export default NoEncontrado