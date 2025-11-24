import { useContext, useState, type FormEvent } from "react";

import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { AuthContext, type ErrorObj } from "../context/AuthContext";

function firstErrorsByField(errors: ErrorObj[]): Record<string, string> {
  return errors.reduce<Record<string, string>>((acc, e) => {
    if (!acc[e.field]) acc[e.field] = e.message; // só guarda a primeira mensagem por campo
    return acc;
  }, {});
}

export default function Register() {
    const auth = useContext(AuthContext);

    if (!auth) throw new Error("Contexto não encontrado");

    const { register } = auth;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string> | null>(null);
    const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const result = await register(name, email, password);
    if (result.ok){
        navigate("/profile");
    }
      
    else {
        const errorsArray = result.error ?? [];

        const errors = firstErrorsByField(errorsArray);
        setFieldErrors(errors);
        console.log(fieldErrors)
    }

  };

    return (
        <main className="flex justify-center bg-cinza-nuvem w-1/2 min-w-[400px] max-w-[600px] h-1/2 min-h-[550px] p-4 shadow-md rounded-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className={`flex flex-col justify-center items-center mt-4 mb-4`}>
                <h1 className="text-3xl font-bold text-gray-600">Cadastro</h1>
                
                </div>

                <div className={`flex flex-col items-center ${fieldErrors?.name ? "mb-2" : "mb-9"}`}>
                    <label htmlFor="name" className="block w-[300px] text-start text-gray-600 mb-1">
                        Nome
                    </label>

                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Nome"
                        required
                        className="block w-[300px] border-2 p-2 rounded-lg focus:outline-none"
                    />
                    {fieldErrors?.name &&
                        <p className="text-red-600 text-sm mt-2">{ fieldErrors.name }</p> 
                    }
                </div>

                <div className={`flex flex-col items-center ${fieldErrors?.email ? "mb-2" : "mb-9"}`}>
                    <label htmlFor="email" className="block w-[300px] text-start text-gray-600 mb-1">
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
                    {fieldErrors?.email &&
                        <p className="text-red-600 text-sm mt-2">{ fieldErrors.email }</p> 
                    }
                </div>

                <div className={`flex flex-col items-center ${fieldErrors?.password ? "mb-2" : "mb-9"}`}>
                    <label htmlFor="email" className="block w-[300px] text-start text-gray-600 mb-1">
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
                    {fieldErrors?.password &&
                        <p className="text-red-600 text-sm mt-2">{ fieldErrors.password }</p> 
                    }
                </div>

                <div className=" ">
                    <Button
                        width="w-75" 
                        height="h-12.5"
                        label="Criar conta"
                        variant="primary"
                        textSize="text-xl"
                        onClick={handleSubmit}
                    />
                    <div className="flex justify-center mt-2">
                        <p>Já tem conta?</p>
                        <Link
                        to="/login"
                        className="text-azul-ceruleo hover:text-azul-ceruleo-claro active:text-azul-ceruleo-escuro"
                        >
                        &nbsp; faça o login
                        </Link>
                    </div>
                </div>
      </form>
    </main>
    )
}