import { useCallback, useState } from 'react';

interface UseFormProps<T> {
    form: T;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

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
