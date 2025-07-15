import { useId, forwardRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { EyeClosed, EyeIcon } from 'lucide-react';

interface BasicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  className?: string;
  prefixNode?: React.ReactNode;
  suffixNode?: React.ReactNode;
}

export const BasicInput = forwardRef<HTMLInputElement, BasicInputProps>(
  (
    {
      label,
      id,
      error,
      description,
      disabled,
      prefixNode,
      suffixNode,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    const inputHintId = useId();
    const [showPassword, updateShowPassword] = useState(false);

    function toggleShowPassoword() {
      updateShowPassword((prevState) => !prevState);
    }

    const inputId = id || inputHintId;
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;

    const hasError = !!error?.trim();
    const describedBy = hasError ? errorId : description ? hintId : undefined;
    const inputType =
      type === 'password' ? (showPassword ? 'text' : 'password') : type;
    return (
      <div
        className={cn(
          'w-full',
          props.className,
        )}
      >
        <div
          className={cn(
            'flex gap-2 h-14 w-full items-center border-[0.75px] border-gray-100 rounded-md px-4 text-sm transition-colors',
            'focus-within:ring-2 focus-within:ring-blue-500',
            {
              'border-red-500 focus-within:ring-red-500': hasError,
              'border-gray-300 focus-within:ring-blue-500': !hasError,
              'cursor-not-allowed opacity-50': disabled,
            },
          )}
        >
          {prefixNode && (
            <div className="flex h-full items-center">{prefixNode}</div>
          )}
          <div className="relative flex h-full w-full items-center">
            <input
              id={inputId}
              ref={ref}
              disabled={disabled}
              aria-invalid={hasError}
              aria-describedby={describedBy}
              autoComplete="off"
              placeholder=" "
              type={inputType}
              {...props}
              className={cn(
                'peer block h-full w-full appearance-none border-none bg-transparent p-0 text-sm font-normal text-gray-500 placeholder-transparent sm:text-sm',
                'outline-none focus:outline-none focus:ring-0',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'pt-3',
              )}
            />
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  'absolute left-0 transition-all duration-300 ease-in-out',
                  // Estado inicial: centrado verticalmente
                  'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:font-semibold',
                  // Estado elevado: ajustamos la posición y el tamaño
                  'top-4 text-xs -translate-y-2', // Cambiado a top-2 y text-xs para un mejor look
                  'peer-focus:top-4 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:font-light',
                )}
              >
                {label}
              </label>
            )}
          </div>
          {type === 'password' ? (
            <button
              type="button"
              onMouseDown={(e) =>{
                e.preventDefault()
                toggleShowPassoword()
              }}
              className="ml-2 flex h-full items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={
                showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
              }
            >
              {showPassword ? (
                <EyeClosed size={18} className="stroke-gray-500" />
              ) : (
                <EyeIcon size={18} className="stroke-gray-500" />
              )}
            </button>
          ) : (
            suffixNode && (
              <div className="ml-2 flex h-full items-center">{suffixNode}</div>
            )
          )}
        </div>
        {description && !hasError && (
          <p id={hintId} className="text-xs text-gray-500 self-start">
            {description}
          </p>
        )}
        {error && (
          <p
            id={errorId}
            className={cn(
              'justify-content-center mt-2 flex items-center gap-1 text-xs',
              {
                'text-green-600 dark:text-green-500': !error.trim(), // Esto parece incorrecto, error debería ser rojo. Mantengo el original para no romper tu lógica si hay un caso de éxito que usas con "error" vacío.
                'text-red-600 dark:text-red-500': error.trim(),
              },
            )}
          >
            {/* <Erro /> */}
            {error}
          </p>
        )}
      </div>
    );
  },
);

BasicInput.displayName = 'BasicInput';
