"use client";

import { AxiosAdapter } from "@/app/config/adapters/axiosAdapter";
import { CreateSessionParams } from "@/app/data/interfaces/session";
import { RegisterUserParams } from "@/app/data/interfaces/user";
import { CreateSessionService } from "@/app/services/auth/CreateSessionService";
import { CreateUserService } from "@/app/services/auth/CreateUserService";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
}

interface LoginParams {
  username: string;
  password: string;
}

interface RegisterParams {
  username: string;
  password: string;
  email: string;
  name: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  Login: (params: LoginParams) => Promise<void>;
  Register: (params: RegisterParams) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

const axios = new AxiosAdapter();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    // const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
      // setUser(JSON.parse(storedUser));
    }
  }, []);

  const Login = useCallback(
    async (params: CreateSessionParams) => {
      await new CreateSessionService(axios).create(params).then((response) => {
        setToken(response.token);

        localStorage.setItem("token", response.token);
        // localStorage.setItem("user", JSON.stringify(user));
        Cookies.set("token", response.token, { path: "/", expires: 1 });
        router.push("/tasks");
      });
    },
    [router],
  );

  const Register = useCallback(
    async (params: RegisterUserParams) => {
      await new CreateUserService(axios).create(params).then(() => {
        router.push("/login");
      });
    },
    [router],
  );

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, Login, Register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
