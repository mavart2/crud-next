import prisma from "@/lib/prisma";
import { deleteTask, toggleTask } from "./actions";
import { TaskForm } from "@/components/task-form";
import { TaskActionButton } from "@/components/task-action-button";

export default async function Home() {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen px-6 py-12 text-zinc-900">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="header">
          <img src="/images/logoTask.png" alt="PrismaTasks logo" />

          <p>Organiza, gestiona y escala tus tareas.</p>
        </header>

        <section className="rounded-2xl border border-zinc-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="mb-4 text-xl font-semibold">Nueva tarea</h2>
          <TaskForm />
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white/60 p-6 shadow-sm  ">
          <h2 className="mb-4 text-xl font-semibold">Tareas</h2>

          {tasks.length === 0 ? (
            <p className="text-zinc-600">Aún no hay tareas creadas.</p>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <span
                      className={
                        task.completed ? "text-zinc-400 line-through" : ""
                      }
                    >
                      {task.title}
                    </span>
                    <p className="text-sm text-zinc-500">
                      {task.completed ? "Completada" : "Pendiente"}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <form
                      action={toggleTask.bind(null, task.id, task.completed)}
                    >
                      <TaskActionButton
                        idleText={task.completed ? "Desmarcar" : "Completar"}
                        pendingText={
                          task.completed ? "Guardando..." : "Completando..."
                        }
                      />
                    </form>

                    <form action={deleteTask.bind(null, task.id)}>
                      <TaskActionButton
                        idleText="Eliminar"
                        pendingText="Eliminando..."
                        variant="danger"
                      />
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
