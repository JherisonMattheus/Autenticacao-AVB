import { type ReactNode, useContext } from "react"

import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type Props = {
    children: ReactNode; 
}

export default function PublicRouter({ children }: Props) {
    const auth = useContext(AuthContext);

    if (!auth) throw new Error("Contexto não encontrado");

    const { user, loading } = auth;

    if (loading) return <p className="text-white text-xl">Carregando...</p>
    

    if(user) return <Navigate to="/profile" replace/>


    return <>{ children }</>
}