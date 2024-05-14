import FormularioAgregarColaborador from "./FormularioAgregarColaborador";

/* eslint-disable react/prop-types */
const ModalAgregarColaborador = ({ setModalAgregarColaborador }) => {

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-10"
      onClick={() => setModalAgregarColaborador(false)}
    >
      <div className="modal-overlay bg-black opacity-50 absolute top-0 left-0 w-full h-full z-20" />
          <div
            className="modal bg-white w-full mx-2 md:mx-0 md:w-2/3 lg:w-1/2 container p-2 md:p-8 rounded-lg shadow-lg z-30"
            onClick={handleModalClick}
          >
            <h3 className="md:text-5xl text-3xl my-5 font-black">Agregar Colaboradores</h3>
            <p className="text-lg md:text-xl font-bold">Agrega los usuarios que quieres que <span className="font-black text-fuchsia-500">formen parte de tu proyecto</span></p>
            <FormularioAgregarColaborador />
          </div>
    </div>
  );
};

export default ModalAgregarColaborador;
