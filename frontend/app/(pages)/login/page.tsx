"use client";

import Header from "@/app/components/header/Header";
import { useAuth } from "@/app/hooks/useAuthContext";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormData>({});

  const { Login } = useAuth();

  const handleFormSubmit = (data: LoginFormData) => {
    Login(data);
  };

  return (
    <div className="flex h-screen flex-col justify-center bg-gray-100">
      <Header showOptions={false} />
      <div className="mx-auto flex h-screen max-w-md flex-col justify-center p-4 ">
        <div className="rounded-lg border border-gray-200 bg-white p-10 shadow-sm">
          <h1 className="mb-4 flex justify-center text-2xl font-bold">Login</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Usuário</label>
              <input
                type="text"
                {...register("username", { required: true })}
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Senha</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            <button
              type="submit"
              disabled={!isValid}
              className="w-full rounded-md bg-blue-800 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Entrar
            </button>
            <Link
              href={"/register"}
              className="flex justify-center text-sm text-blue-800 hover:underline"
            >
              Registrar-se
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
