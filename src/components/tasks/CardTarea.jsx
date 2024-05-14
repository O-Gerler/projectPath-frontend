/* eslint-disable react/prop-types */
import { BsThreeDotsVertical } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { eliminarTarea } from "../../api/tareasAPI";
import { useDraggable } from "@dnd-kit/core";

const CardTarea = ({
  tarea,
  menu,
  setMenu,
  setTarea,
  setModalEditarTarea,
  setModalVerTarea,
  puedeEditar,
}) => {
  const { nombre, descripcion, _id, proyecto } = tarea;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: _id,
  });
  const handleMenu = (id) => {
    setMenu((prevMenu) => {
      const updatedMenu = {};

      Object.keys(prevMenu).forEach((key) => {
        updatedMenu[key] = false;
      });

      updatedMenu[id] = !(id in updatedMenu) ? true : !prevMenu[id];

      return updatedMenu;
    });
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: eliminarTarea,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["proyecto", tarea.proyecto] });
      toast.success(data);
    },
  });

  const handleClickEditarTarea = () => {
    setModalEditarTarea(true);
    setTarea(tarea);
    setMenu(false);
  };

  const handleClickVerTarea = () => {
    setModalVerTarea(true);
    setTarea(tarea);
    setMenu(false);
  };

  const handleCliclEliminarTarea = () => {
    setMenu(false);
    mutate({ idProyecto: proyecto, idTarea: _id });
  };

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    padding: "1.25rem",
    backgroundColor: "#FFF",
    with: "300px",
    display: "flex",
    borderWidth: "1px",
    borderColor: "rgb(203 213 225 / var(--tw-border-opacity))"
  } : undefined;

  return (
    <li className="p-5 bg-white border border-slate-300 flex justify-between gap-3">
      <div
        className="min-w-0 w-full flex flex-col gap-y-4"
        {...listeners}
        {...attributes}
        ref={setNodeRef}
        style={style}
      >
        <div className="w-full" onClick={handleClickVerTarea}>
          <p
            className="text-xl font-bold text-slate-600 text-left"
          >
            {nombre}
          </p>
          <p className="text-slate-500 whitespace-normal break-all line-clamp-6">{descripcion}</p>
        </div>
      </div>
      <div className="relative">
        <BsThreeDotsVertical
          className="cursor-pointer w-8 h-8"
          onClick={() => handleMenu(_id)}
        />
        {menu[_id] && (
          <div className="absolute top-5 right-6 w-48 bg-white border border-gray-200 rounded shadow-lg transition-all">
            <ul>
              <li
                className="py-2 px-4 block hover:bg-gray-100 cursor-pointer"
                onClick={handleClickVerTarea}
              >
                Ver Tarea
              </li>
              {puedeEditar && (
                <>
                  <li
                    className="py-2 px-4 block hover:bg-gray-100 cursor-pointer"
                    onClick={handleClickEditarTarea}
                  >
                    Editar Tarea
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-red-500"
                    onClick={handleCliclEliminarTarea}
                  >
                    Eliminar Tarea
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </li>
  );
};

export default CardTarea;
