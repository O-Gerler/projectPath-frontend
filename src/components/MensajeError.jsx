/* eslint-disable react/prop-types */
const MensajeError = ({ mensaje }) => {
  return (
    <div className="text-center my-4 bg-red-100 text-red-600 font-bold p-3 uppercase text-sm">
      {mensaje}
    </div>
  )
}

export default MensajeError