/* eslint-disable react/prop-types */
const FormularioProyecto = ({
  nombre,
  setNombre,
  cliente,
  setCliente,
  descripcion,
  setDescripcion,
}) => {
  return (
    <>
      <div className="flex flex-col gap-2 text-sm">
        <label className="uppercase font-bold" htmlFor="crearProyectoNombre">
          Nombre del proyecto
        </label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          type="text"
          id="crearProyectoNombre"
          className="outline-none p-2 border mb-2"
          placeholder="Nombre del proyecto"
        />
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <label className="uppercase font-bold" htmlFor="crearProyectoCliente">
          Nombre del cliente
        </label>
        <input
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          type="text"
          id="crearProyectoCliente"
          className="outline-none p-2 border mb-2"
          placeholder="Nombre del cliente"
        />
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <label
          className="uppercase font-bold"
          htmlFor="crearProyectoDescripcion"
        >
          Descripción
        </label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          type="text"
          id="crearProyectoDescripcion"
          className="outline-none p-2 border mb-2"
          placeholder="Descripcion del proyecto"
        >
        </textarea>
      </div>
    </>
  );
};

export default FormularioProyecto;
