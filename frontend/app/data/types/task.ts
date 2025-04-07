export type TaskStatus = "all" | "pending" | "in-progress" | "done";

type Status = {
  code: string;
  name: string;
};

export const status: Status[] = [
  { code: "all", name: "Todas" },
  { code: "pending", name: "Pendentes" },
  { code: "in-progress", name: "Em progresso" },
  { code: "done", name: "Concluídas" },
];

export const StatusConverter: { [key: string]: string } = {
  all: "Todas",
  pending: "Pendente",
  "in-progress": "Em progresso",
  done: "Concluída",
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "done";
};
