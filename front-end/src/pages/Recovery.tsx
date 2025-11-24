import { useState, type FormEvent } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Recovery() {

  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const back = () => {
    if(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      navigate('/login');
  };

  return (
    <main className="flex justify-center bg-cinza-nuvem w-1/2 min-w-[400px] max-w-[600px] h-1/2 min-h-[500px] p-4 shadow-md rounded-2xl">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mt-8 mb-16">
          <h1 className="text-2xl font-bold text-gray-600">Recuperar senha</h1>
        </div>

        <div className="">
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

        <div className="mt-8">
          <Button
            width="w-75" 
            height="h-12.5"
            label="Enviar E-mail de recuperação"
            variant="primary"
            textSize="text-md"
            onClick={back}
          />
        </div>
      </form>
    </main>
  );
}
