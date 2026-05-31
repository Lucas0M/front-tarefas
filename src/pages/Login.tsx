import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleLogin() {
    const res = await fetch(
      "https://api-tarefas-production-025e.up.railway.app/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      },
    );

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/tarefas";
    } else {
      setErro("Email or password invalid!");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {erro && <p className="text-red-400 text-sm text-center">{erro}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded px-4 py-2 outline-none placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded px-4 py-2 outline-none placeholder-gray-400"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold transition"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
