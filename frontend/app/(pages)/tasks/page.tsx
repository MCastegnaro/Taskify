import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import TabList from "../../components/tabs/TabList";
import { TaskProvider } from "../../contexts/task/TaskContext";

export default async function ProductsPage() {
  return (
    <main className="h-screen">
      <Header showOptions />
      <section className="mx-auto flex max-w-7xl flex-col justify-start gap-4">
        <h2 className="mb-6 mt-12 text-2xl font-semibold text-blue-800">
          Configurações
        </h2>
      </section>
      <section className="mx-auto mb-6 flex max-w-7xl flex-col justify-start gap-4">
        <TabList />
      </section>
      <section className="mx-auto flex  max-w-7xl flex-col justify-start gap-4">
        <TaskProvider>
          <Table />
        </TaskProvider>
      </section>
    </main>
  );
}
