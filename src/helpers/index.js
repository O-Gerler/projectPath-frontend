export function formatearFecha(fechaSinFormatear) {
  const fecha = new Date(fechaSinFormatear)
  const formateador = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  })

  return formateador.format(fecha)
}