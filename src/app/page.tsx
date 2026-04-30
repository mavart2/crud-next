import prisma from "@/lib/prisma";
import { createTask } from "./actions";

export default async function Home() {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-900">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">Front Proyecto</h1>
          <p className="text-zinc-600">
            Base inicial con Next.js, Prisma y React Query.
          </p>
        </header>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Nueva tarea</h2>

          <form action={createTask} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              name="title"
              placeholder="Escribe una tarea"
              className="flex-1 rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
            />
            <button
              type="submit"
              className="rounded-xl bg-zinc-900 px-5 py-3 text-white hover:bg-zinc-700"
            >
              Guardar
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Tareas</h2>

          {tasks.length === 0 ? (
            <p className="text-zinc-500">Aún no hay tareas creadas.</p>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 px-4 py-3"
                >
                  <span>{task.title}</span>
                  <span className="text-sm text-zinc-500">
                    {task.completed ? "Completada" : "Pendiente"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}