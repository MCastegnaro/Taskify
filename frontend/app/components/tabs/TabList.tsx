export default function TabList() {
  return (
    <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500">
      <ul className="-mb-px flex flex-wrap">
        <li>
          <a className="inline-block cursor-not-allowed rounded-t-lg p-4 text-gray-400 dark:text-gray-500">
            Usuários
          </a>
        </li>
        <li className="me-2">
          <a
            href="#"
            className="inline-block rounded-t-lg border-b-2 border-blue-900 p-4 text-blue-800 "
            aria-current="page"
          >
            Tarefas
          </a>
        </li>
        <li>
          <a className="inline-block cursor-not-allowed rounded-t-lg p-4 text-gray-400 dark:text-gray-500">
            Planos
          </a>
        </li>
        <li>
          <a className="inline-block cursor-not-allowed rounded-t-lg p-4 text-gray-400 dark:text-gray-500">
            Membros
          </a>
        </li>
        <li>
          <a className="inline-block cursor-not-allowed rounded-t-lg p-4 text-gray-400 dark:text-gray-500">
            Integrações
          </a>
        </li>
        <li>
          <a className="inline-block cursor-not-allowed rounded-t-lg p-4 text-gray-400 dark:text-gray-500">
            Notificações
          </a>
        </li>
      </ul>
    </div>
  );
}
