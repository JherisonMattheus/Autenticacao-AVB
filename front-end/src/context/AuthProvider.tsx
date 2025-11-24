// src/context/AuthProvider.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../services/authApi";
import { AuthContext, type ErrorObj, type User } from "./AuthContext";


type Props = { children: React.ReactNode };

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await authApi.get("/user/profile", { withCredentials: true });
        setUser(res.data);
      } catch (err: any) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (email: string, password: string): Promise<{ ok: boolean; user?: User; error?: string }> => {
    try {
      const res = await authApi.post("/auth/login", { email, password });
      setUser(res.data);
      return { ok: true, user: res.data };
    } catch (err: any) {
      return { ok: false, error: err.response?.data?.error };
    }
  };

  const register = async (name: string, email: string, password: string): Promise<{ ok: boolean; user?: User; error?: ErrorObj[] }> => {
    try {
      const res = await authApi.post("/auth/register", { name, email, password });
      setUser(res.data);
      return { ok: true, user: res.data };
    } catch (err: any) {
      return { ok: false, error: err.response?.data?.error };
    }
  };

  const logout = async (): Promise<{ ok: boolean; error?: string }> => {
    try {
      await authApi.post("/auth/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/login");
      return { ok: true };
    } catch (err: any) {
      return { ok: false, error: err.response?.data?.error };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
