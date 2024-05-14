import CardColaborador from "./CardColaborador";

/* eslint-disable react/prop-types */
const ListaColaboradores = ({ data, menu, setMenu }) => {
  return (
    <ul className="space-y-4">
      {data.map((usuario) => (
        <CardColaborador
          key={usuario._id}
          usuario={usuario}
          menu={menu}
          setMenu={setMenu}
        />
      ))}
    </ul>
  );
};

export default ListaColaboradores;
