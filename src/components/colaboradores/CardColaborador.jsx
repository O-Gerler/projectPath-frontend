/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsThreeDotsVertical } from "react-icons/bs";
import { eliminarColaborador } from "../../api/colaboradoresAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const CardColaborador = ({ usuario, menu, setMenu }) => {
  const { _id } = usuario;
  const { idProyecto } = useParams()

  const handleMenu = () => {
    setMenu((prevMenu) => {
      const updatedMenu = {};

      Object.keys(prevMenu).forEach((key) => {
        updatedMenu[key] = false;
      });

      updatedMenu[_id] = !(_id in updatedMenu) ? true : !prevMenu[_id];

      return updatedMenu;
    });
  };

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: eliminarColaborador,
    onError: error => {
      toast.error(error.message)
    },
    onSuccess: data => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ["colaboradores", idProyecto]})
      queryClient.invalidateQueries({queryKey: ["chatColaboradoresProyecto", idProyecto]})
    }
  })

  const handleClick = () => {
    setMenu(false)
    mutate({ idProyecto, idUsuario: _id })
  }

  return (
    <li className="w-full bg-white shadow-md py-10 px-5 flex justify-between items-center">
      <div>
        <p className="text-2xl font-bold capitalize">{usuario.nombre}</p>
        <p className="text-lg font-light text-gray-500">{usuario.email}</p>
      </div>
      <div className="relative">
        <BsThreeDotsVertical
          className="cursor-pointer w-8 h-8"
          onClick={handleMenu}
        />
        {menu[_id] && (
          <div className="absolute top-5 right-6 w-48 bg-white border border-gray-200 rounded shadow-lg transition-all">
            <ul>
              <li
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-red-500"
                onClick={handleClick}
              >
                Eliminar Colaborador
              </li>
            </ul>
          </div>
        )}
      </div>
    </li>
  );
};

export default CardColaborador;
