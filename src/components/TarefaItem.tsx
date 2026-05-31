type Tarefa = {
  id: number;
  titulo: string;
  feito: boolean;
};

type Props = {
  tarefa: Tarefa;
  onDeletar: (id: number) => void;
  onToggle: (id: number, feito: boolean) => void;
};

function TarefaItem({ tarefa, onDeletar, onToggle }: Props) {
  return (
    <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded px-4 py-3">
      <p
        className={`text-lg ${tarefa.feito ? "line-through text-gray-500" : "text-white"}`}
      >
        {tarefa.titulo}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onToggle(tarefa.id, tarefa.feito)}
          className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm font-semibold transition"
        >
          {tarefa.feito ? "Desmarcar" : "Concluir"}
        </button>
        <button
          onClick={() => onDeletar(tarefa.id)}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-semibold transition"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default TarefaItem;
