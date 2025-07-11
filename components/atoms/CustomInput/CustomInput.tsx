import { useId } from 'react';
import { clsx } from 'clsx';
import { IcError } from '../Icons/IconError';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function CustomInput({ label, error, ...rest }: Props) {
  const inputHintId = useId();

  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={inputHintId}
        className="block w-full text-sm font-normal dark:text-white"
      >
        {label}
      </label>
      <input
        id={inputHintId}
        {...rest}
        autoComplete="off"
        // className={clsx(
        //   'h-12 w-full rounded-lg py-2 dark:bg-neutral-900 bg-gray-50 placeholder:text-gray-400',
        // )}
      />
      {error && (
        <p
          className={clsx('text-xs mt-2 flex items-center justify-content-center gap-1',{
            'text-green-600 dark:text-green-500': !error.trim(),
            'text-red-600 dark:text-red-500': error.trim(),
          })}
        >
          <IcError />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
