"use client";

import { useFormStatus } from "react-dom";

type TaskActionButtonProps = {
  idleText: string;
  pendingText: string;
  variant?: "default" | "danger";
};

export function TaskActionButton({
  idleText,
  pendingText,
  variant = "default",
}: TaskActionButtonProps) {
  const { pending } = useFormStatus();

  const baseClass =
    "rounded-xl px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60";

  const variantClass =
    variant === "danger"
      ? "border border-red-300 text-red-600 hover:bg-red-50"
      : "border border-zinc-300 hover:bg-zinc-100";

  return (
    <button type="submit" disabled={pending} className={`${baseClass} ${variantClass}`}>
      {pending ? pendingText : idleText}
    </button>
  );
}