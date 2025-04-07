"use client";

import Header from "@/app/components/header/Header";
import { useAuth } from "@/app/hooks/useAuthContext";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface RegisterFormData {
  username: string;
  password: string;
  name: string;
  email: string;
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<RegisterFormData>({});

  const { Register } = useAuth();

  const handleFormSubmit = (data: RegisterFormData) => {
    Register(data);
  };

  return (
    <div className="flex h-screen flex-col justify-center bg-gray-100">
      <Header showOptions={false} />
      <div className="mx-auto flex h-screen max-w-md flex-col justify-center p-4 ">
        <div className="rounded-lg border border-gray-200 bg-white p-10 shadow-sm">
          <h1 className="mb-4 flex justify-center text-2xl font-bold">
            Cadastrar usuário
          </h1>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nome</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">E-mail</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Usuário</label>
              <input
                type="username"
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
              Cadastrar
            </button>
            <Link
              href={"/login"}
              className="flex justify-center text-sm text-blue-800 hover:underline"
            >
              voltar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
