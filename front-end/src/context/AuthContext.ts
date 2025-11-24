
import { createContext } from "react";

export type User = {
  id: number;
  name: string;
  email: string;
}

export type ErrorObj = { field: string; message: string };

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ok:boolean; error?: string}>;
  register: (name: string, email: string, password: string) => Promise<{ok: boolean; user?: User; error?: ErrorObj[]}>;
  logout: () => Promise<{ok: boolean; error?: string}>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
