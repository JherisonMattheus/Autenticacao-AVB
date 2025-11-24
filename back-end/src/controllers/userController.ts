import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { authRequest } from "../middlewares/authMiddleware";


export const getProfile = async (
    req: authRequest,
    res: Response
): Promise<void> => {
    try {

        const userId = req.userId;
        

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado" });
            return;
        }

        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
        });

    } catch (error) {
        console.error("Erro na busca de dados do usuário: ", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}