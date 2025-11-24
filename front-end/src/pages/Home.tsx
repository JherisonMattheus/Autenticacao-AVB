import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Dashboard() {

    const navigate = useNavigate();
    const entrar = () => navigate("/login");
    const register = () => navigate("/register");

    return (
        <main className='flex justify-center bg-cinza-nuvem w-1/2 min-w-[400px] max-w-[600px] h-1/2 min-h-[500px] p-4 shadow-md rounded-2xl'>
            <div>
            <div className='flex justify-center mt-18 mb-12'>
                <h1 className='text-3xl font-bold text-gray-600'>Acesse sua conta</h1>
            </div>
            <div className='flex justify-center'>
                <Button 
                    width="w-75" 
                    height="h-12.5"
                    label="Entrar" 
                    variant='primary' 
                    textSize="text-xl" 
                    onClick={entrar}
                />
            </div>
            <div className='flex justify-center p-4 text-lg text-gray-400'>
                <p>- - - - - - - - - - - - - - - - ou - - - - - - - - - - - - - - - -</p>
            </div>
            <div className='flex justify-center'>
                <Button 
                    width="w-75" 
                    height="h-12.5"
                    label="Cadastrar" 
                    variant='secundary' 
                    textSize="text-xl" 
                    onClick={register}
                />
            </div>
            </div>
        </main>
    )
}