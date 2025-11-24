import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import cookieParser from 'cookie-parser';

dotenv.config();

const baseOrigin = process.env.CORS_ORIGIN;
let origins: string | string[] = baseOrigin ?? [];

if (typeof baseOrigin === 'string' && baseOrigin.length > 0) {
    
    const cleanOrigin = baseOrigin.endsWith('/') ? baseOrigin.slice(0, -1) : baseOrigin;
    
    origins = [
        cleanOrigin, 
        cleanOrigin + '/'
    ];
}


const app = express();
app.use(cors({
    origin: origins, 
    credentials:true,
}));

app.use(express.json());
app.use(cookieParser())



app.use('/auth', authRoutes);
app.use('/user', userRoutes);

export default app;