import { useCallback, useState } from 'react';

export function useForm<T extends Record<string, any>>(initialState: T) {
  const [form, setForm] = useState<T>(initialState);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }, [])

  return { form, handleChange };
}
