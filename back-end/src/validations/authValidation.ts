import { Request, Response, NextFunction } from "express"

interface FieldError {
    field: string;
    message: string;
}

export const validateRegister = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {

        const errors: FieldError[] = []
        const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
        const email = typeof req.body.email === "string" ? req.body.email.trim() : "";
        const password = typeof req.body.password === "string" ? req.body.password : "";

        //verificação de email e senha

        if (!name) errors.push({ field: "name", message: "Nome é obrigatório." });
        if (!email) errors.push({ field: "email", message: "Email é obrigatório." });
        if (!password) errors.push({ field: "password", message: "Senha é obrigatória." });
        

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            errors.push({ field: "email", message: "Email inválido"});
        }

        const nameRegex = /^[a-zA-Z\s-]+$/;
        if (!nameRegex.test(name)) {
            errors.push({ field: "name", message: "O nome contém caracteres inválidos" });
        }

        if (password.length < 8) {
            errors.push({ field: "password", message: "A senha deve contém no mínimo 8 caracteres" });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[^\s]+$/;
        if (!passwordRegex.test(password)) {
            errors.push({ field: "password", message: "A senha deve conter pelo menos uma letra maiúscula e um número" });
        }

        if (errors.length > 0) {
            res.status(400).json({ error: errors });
            return;
        }

        next();

    } catch (error) {
        console.error("Erro no registro: ", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

export const validateLogin = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {

        const { email, password} = req.body;

        if (!email || !password) {
            res.status(400).json({ error: "Email e senha são obrigatórios" });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ error: "Email inválido" });
            return;
        }

        next();

    } catch (error) {
        console.error("Erro no login: ", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

