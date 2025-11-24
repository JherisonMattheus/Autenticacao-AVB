import { useContext, useState, type FormEvent } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export default function Login() {
    const auth = useContext(AuthContext);

    if (!auth) throw new Error("Contexto não encontrado");

    const { login } = auth;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const result = await login(email, password);
    if (result.ok){
      navigate("/profile");
    }
      
    else {
      setEmail("");
      setPassword("");
      setError(result.error);
    }

  };


  return (
    <main className="flex justify-center bg-cinza-nuvem w-1/2 min-w-[400px] max-w-[600px] h-1/2 min-h-[500px] p-4 shadow-md rounded-2xl">
      <form onSubmit={handleSubmit}>
        <div className={`flex flex-col justify-center items-center mt-8 ${error ? "mb-4" : "mb-12"}`}>
          <h1 className="text-3xl font-bold text-gray-600">Login</h1>
          {error &&
            <p className="text-red-600 mt-2">{ error }</p> 
          }
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 mb-1">
            Email
          </label>

          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email@exemplo.com"
            required
            className="block w-[300px] border-2 p-2 rounded-lg focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 mb-1">
            Senha
          </label>

          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={"Senha"}
            required
            className="block w-[300px] border-2 p-2 rounded-lg focus:outline-none"
          />
          <Link
            to="recovery"
            className="w-full text-end text-azul-ceruleo hover:text-azul-ceruleo-claro active:text-azul-ceruleo-escuro"
          >
            esqueceu a senha?
          </Link>
        </div>

        <div className="w-75 h-">
          <Button
            width="w-75" 
            height="h-12.5"
            label="Entrar"
            variant="primary"
            textSize="text-xl"
            onClick={handleSubmit}
          />
          <div className="flex justify-center mt-2">
            <p>Novo aqui?</p>
            <Link
              to="/register"
              className="text-azul-ceruleo hover:text-azul-ceruleo-claro active:text-azul-ceruleo-escuro"
            >
              &nbsp;Cadastre-se
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
