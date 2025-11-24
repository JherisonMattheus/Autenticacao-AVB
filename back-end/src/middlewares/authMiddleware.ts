import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface authRequest extends Request {
    userId?: number,
}

export const authMiddleware = (
    req: authRequest, 
    res: Response, 
    next: NextFunction
) => {

    const token = req.cookies.refreshToken;

    if(!token) 
        return res.status(401).json({ message: "Acesso negado;" });

    try {
        const decoded =jwt.verify(token, process.env.JWT_SECRET as string);
        req.userId = Number((decoded as any).userId); 

        next();
    } catch (error){
        return res.status(401).json({ message: "Token inválido" });
    }
}