import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="animate-bounce text-red-500">
        <AlertTriangle size={64} />
      </div>
      <h1 className="mt-6 text-6xl font-extrabold text-gray-800">404</h1>
      <p className="mt-4 text-2xl text-gray-700">Página não encontrada</p>
      <p className="mt-2 max-w-md text-gray-500">
        A URL que você tentou acessar não existe ou foi removida.
      </p>
      <a
        href="/"
        className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 text-white shadow-lg transition hover:bg-blue-700"
      >
        Voltar para o início
      </a>
    </div>
  );
}
