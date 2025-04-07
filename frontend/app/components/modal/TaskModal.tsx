"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

export type TaskFormData = {
  title: string;
  description: string;
  status: "pending" | "in-progress" | "done";
};

interface TaskModalProps {
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  initialData?: TaskFormData;
}

const TaskModal = ({ onClose, onSubmit, initialData }: TaskModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TaskFormData>({
    defaultValues: initialData ?? {
      title: "",
      description: "",
      status: "pending",
    },
  });

  useEffect(() => {
    reset(initialData ?? { title: "", description: "", status: "pending" });
  }, [initialData, reset]);

  const handleFormSubmit = (data: TaskFormData) => {
    onSubmit(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-2xl transition-transform duration-300 ease-in-out">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-500 hover:text-red-500"
        >
          X
        </button>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          {initialData ? "Editar Tarefa" : "Nova Tarefa"}
        </h2>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("title", {
                required: {
                  value: true,
                  message: "Campo obrigatório",
                },
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Descrição</label>
            <textarea
              {...register("description")}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              {...register("status")}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            >
              <option value="pending">Pendente</option>
              <option value="in-progress">Em andamento</option>
              <option value="done">Concluída</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-blue-800 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            {initialData ? "Salvar Alterações" : "Criar Tarefa"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
