import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type UseDebouncedFormSyncOptions<T> = {
  initialValues: T;
  onDebouncedChange?: (field: keyof T, value: string) => void;
  debounceMs?: number;
};
export function useDebouncedFormSync<T extends Record<string, string>>({
  initialValues,
  onDebouncedChange,
  debounceMs = 300,
}: UseDebouncedFormSyncOptions<T>) {
  const [form, setForm] = useState<T>(initialValues);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    debouncedUpdate(name, value);
  }

  const debouncedUpdate = useDebouncedCallback((name, value) => {
    onDebouncedChange?.(name, value);
  }, debounceMs);

  return { form, handleChange };
}
