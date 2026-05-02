"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createTask, type CreateTaskState } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";

const initialState: CreateTaskState = {
  errors: {},
  message: "",
};

export function TaskForm() {
  const [state, formAction] = useActionState(createTask, initialState);
  const [showMessage, setShowMessage] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message && !state?.errors?.title) {
      formRef.current?.reset();
      setShowMessage(true);
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-3 sm:flex-row sm:items-start"
    >
      <div className="flex-1">
        <input
          type="text"
          name="title"
          placeholder="Escribe una tarea"
          onChange={() => setShowMessage(false)}
          className="w-full rounded-xl border border-zinc-300 bg-white/90 px-4 py-3 outline-none focus:border-zinc-500"
        />

        {state?.errors?.title && (
          <p className="mt-2 text-sm text-red-600">
            {state.errors.title[0]}
          </p>
        )}

        {!state?.errors?.title && showMessage && state?.message && (
          <p className="mt-2 text-sm text-emerald-600">
            {state.message}
          </p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}