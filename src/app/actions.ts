"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function createTask(formData: FormData) {
  const title = String(formData.get("title") || "").trim();

  if (!title) return;

  await prisma.task.create({
    data: {
      title,
    },
  });

  revalidatePath("/");
}