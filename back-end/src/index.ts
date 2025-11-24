import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,
}));

app.use(express.json());
app.use(cookieParser())

const PORT = process.env.PORT || 3000;

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});