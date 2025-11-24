import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import cookieParser from 'cookie-parser';

dotenv.config();

// FIX: Tratar o problema da barra final do CORS (Trailing Slash Issue)
const baseOrigin = process.env.CORS_ORIGIN;
let origins: string | string[] = baseOrigin ?? [];

if (typeof baseOrigin === 'string' && baseOrigin.length > 0) {
    // 1. Remove a barra final se estiver presente, para ter um "clean" origin
    const cleanOrigin = baseOrigin.endsWith('/') ? baseOrigin.slice(0, -1) : baseOrigin;
    
    // 2. Permite ambas as formas do domínio na configuração do CORS
    origins = [
        cleanOrigin, 
        cleanOrigin + '/'
    ];
}


const app = express();
app.use(cors({
    origin: origins, // Agora aceita as duas formas do domínio
    credentials:true,
}));

app.use(express.json());
app.use(cookieParser())

// app.listen() é removido para ambientes serverless como Vercel

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// FIX: Exportar a aplicação Express para o Vercel
export default app;