import { useContext } from "react"

import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";


export default function Profile() {
    const auth = useContext(AuthContext);

    if (!auth) throw new Error("Contexto não encontrado");

    const { user } = auth;

    return (
        <main className="flex flex-col bg-cinza-nuvem w-1/2 min-w-[400px] max-w-[600px] h-1/2 min-h-[500px] p-4 shadow-md rounded-2xl">
            <div className="flex w-full justify-between">
                <p className="w-20"></p>
                <h1 className="w-20 text-3xl font-bold text-gray-600">Perfil</h1>
                <Button 
                    width="w-[80px]" 
                    height="h-[40px]" 
                    label="Logout" 
                    variant="secundary" 
                    textSize="" 
                    onClick={auth.logout}
                />
            </div>
            <div className="mt-8 p-4">
                <div className="mb-4">
                    <h2 className="font-bold">Nome</h2>
                    <p className="ml-4">{ user?.name }</p>
                </div>
                <div className="mb-4">
                    <h2 className="font-bold">Email</h2>
                    <p className="ml-4">{ user?.email }</p>
                </div>
            </div>
        </main>
    )
}