"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "La tarea debe tener al menos 3 caracteres")
    .max(100, "La tarea no puede superar los 100 caracteres"),
});

export type CreateTaskState = {
  errors?: {
    title?: string[];
  };
  message?: string;
};

export async function createTask(
  prevState: CreateTaskState,
  formData: FormData
): Promise<CreateTaskState> {
  const validatedFields = taskSchema.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Corrige los errores del formulario.",
    };
  }

  await prisma.task.create({
    data: {
      title: validatedFields.data.title,
    },
  });

  revalidatePath("/");

  return {
    message: "Tarea creada correctamente.",
  };
}

export async function toggleTask(id: number, completed: boolean) {
  await prisma.task.update({
    where: { id },
    data: {
      completed: !completed,
    },
  });

  revalidatePath("/");
}

export async function deleteTask(id: number) {
  await prisma.task.delete({
    where: { id },
  });

  revalidatePath("/");
}