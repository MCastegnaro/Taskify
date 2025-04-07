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
    formState: { isValid, errors },
  } = useForm<RegisterFormData>({
    mode: "all",
  });

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
              <label className="text-sm font-medium">
                Nome<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Campo obrigatório",
                  },
                  minLength: {
                    value: 3,
                    message: "Nome deve ter no mínimo 3 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "Nome deve ter no máximo 50 caracteres",
                  },
                })}
                className={`${errors.name ? "border-red-500" : "border-gray-300"} mt-1 w-full rounded-md border  p-2`}
              />
            </div>
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
            <div>
              <label className="text-sm font-medium">
                E-mail<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Campo obrigatório",
                  },
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "E-mail inválido",
                  },
                  maxLength: {
                    value: 50,
                    message: "E-mail deve ter no máximo 50 caracteres",
                  },
                })}
                className={`${errors.email ? "border-red-500" : "border-gray-300"} mt-1 w-full rounded-md border  p-2`}
              />
            </div>
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
            <div>
              <label className="text-sm font-medium">
                Usuário <span className="text-red-500">*</span>
              </label>
              <input
                type="username"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Campo obrigatório",
                  },
                  minLength: {
                    value: 3,
                    message: "Usuário deve ter no mínimo 3 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "Usuário deve ter no máximo 20 caracteres",
                  },
                })}
                className={`${errors.username ? "border-red-500" : "border-gray-300"} mt-1 w-full rounded-md border  p-2`}
              />
            </div>
            {errors.username && (
              <span className="text-sm text-red-500">
                {errors.username.message}
              </span>
            )}
            <div>
              <label className="text-sm font-medium">
                Senha<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Campo obrigatório",
                  },
                  minLength: {
                    value: 8,
                    message: "Senha deve ter no mínimo 8 caracteres",
                  },
                })}
                className={`${errors.password ? "border-red-500" : "border-gray-300"} mt-1 w-full rounded-md border  p-2`}
              />
            </div>
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
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
