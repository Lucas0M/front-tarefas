import { useEffect, useState } from "react";
import TarefaItem from "./components/TarefaItem";

type Tarefa = {
  id: number;
  titulo: string;
  feito: boolean;
};

function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [novoTitulo, setNovoTitulo] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/tarefas")
      .then((res) => res.json())
      .then((data) => {
        setTarefas(data);
        setLoading(false);
      });
  }, []);

  async function criarTarefa() {
    if (!novoTitulo) return;

    const res = await fetch("http://localhost:3000/tarefas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Dev2020",
      },
      body: JSON.stringify({ titulo: novoTitulo }),
    });

    if (res.ok) {
      const newTarefa = await res.json();
      setTarefas([...tarefas, newTarefa]);
      setNovoTitulo("");
    }
  }

  async function atualizarTarefa(id: number, feito: boolean) {
    const res = await fetch(`http://localhost:3000/tarefas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Dev2020",
      },
      body: JSON.stringify({ feito: !feito }),
    });

    if (res.ok) {
      const updated = await res.json();
      setTarefas(tarefas.map((t) => (t.id === id ? updated : t)));
    }
  }

  async function deletarTarefa(id: number) {
    const res = await fetch(`http://localhost:3000/tarefas/${id}`, {
      method: "DELETE",
      headers: { authorization: "Dev2020" },
    });
    if (res.ok) {
      setTarefas(tarefas.filter((t) => t.id !== id));
    }
  }

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-8">
        Lista de Tarefas (Front end + Back end)
      </h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nova Tarefa"
          value={novoTitulo}
          onChange={(e) => setNovoTitulo(e.target.value)}
          className="bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white placeholder-gray-400 outline-none"
        />
        <button
          onClick={criarTarefa}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold transition"
        >
          Adicionar
        </button>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-md">
        {tarefas.map((tarefa) => (
          <TarefaItem
            key={tarefa.id}
            tarefa={tarefa}
            onDeletar={deletarTarefa}
            onToggle={atualizarTarefa}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
