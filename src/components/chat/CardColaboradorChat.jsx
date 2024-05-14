/* eslint-disable react/prop-types */
const CardColaboradorChat = ({ colaborador, esManager }) => {
  const { nombre, email } = colaborador;

  return (
    <li className="py-2 px-4 bg-gray-100 rounded-lg">
      <p className="text-xl font-bold text-gray-800">{nombre}</p>
      <p className="text-sm italic font-thin">{email}</p>
      <p
        className={`inline-block uppercase mt-1 p-1 rounded-lg border text-xs font-bold ${
          esManager
            ? "bg-green-50 text-green-500 border-green-500 "
            : "bg-orange-50 text-orange-500 border-orange-500"
        }`}
      >
        {esManager ? "Manager" : "Colaborabor"}
      </p>
    </li>
  );
};

export default CardColaboradorChat;
