import { Request, Response } from "express";
import { AuthResponse, LoginRequest, RegisterRequest } from "../types/auth";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (
    req: Request<{}, AuthResponse, RegisterRequest>,
    res: Response<AuthResponse | { error: string }>
): Promise<void> => {

    try {

        const { email, password, name } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            res.status(400).json({ error: "Email já cadastrado" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            }
        });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "fallback_secret_for_testing", { expiresIn: "1h"},);

        res.cookie("refreshToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 1000, // 1 hora
            path: "/"
        });

        res.status(201).json({
            id: user.id,
            email: user.email,
            name: user.name,
        });
    } catch (error) {
        console.error("Erro no cadastro: ", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

export const login = async (
    req: Request<{}, AuthResponse, LoginRequest>,
    res: Response<AuthResponse | { error: string }>
): Promise<void> => {
    try {
        const { email, password} = req.body;

        //busca pelo usuário no banco pelo email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            res.status(401).json({ error: "Email ou senha inválidos" });
            return;
        }

        const ispasswordValid = await bcrypt.compare(password, user.password);

        if (!ispasswordValid) {
            res.status(401).json({ error: "Email ou senha inválidos" });
            return;
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET || "fallback_secret_for_testing", { expiresIn: "1h" });

        res.cookie("refreshToken", token, {
            httpOnly: true,
            secure: true, 
            sameSite: "none",
            maxAge: 60 * 60 * 1000, // 1 hora
            path: "/"
        });

        res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
        });

    } catch (error) {
        console.error("Erro no login: ", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

export const logout = async (
    req: Request,
    res: Response
): Promise<void> => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    });
    res.status(200).json({ ok: true });
}