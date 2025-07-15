import { useCallback, useState } from "react";

export function useFieldTouched<T extends string>() {
  const [touched, setTouched] = useState<Partial<Record<T, boolean>>>({});

  const handleBlur = useCallback((name: T) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  return { touched, handleBlur };
}
