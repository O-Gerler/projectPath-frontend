/* eslint-disable react/prop-types */
import { useDroppable } from "@dnd-kit/core"

const DropTarea = ({ estado }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: estado
  })

  const style = isOver ? {
    opacity: "0.4"
  } : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="text-sm mt-5 font-bold text-slate-600 border border-dashed border-slate-600 p-2 uppercase text-center align-middle hover:bg-slate-200 transition-colors"
    >
      Soltar tarea aqui
    </div>
  )
}

export default DropTarea