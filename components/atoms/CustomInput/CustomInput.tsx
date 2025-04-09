import { useId } from 'react';
import { clsx } from 'clsx';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function CustomInput({ label, error, ...rest }: Props) {
  const inputHintId = useId();

  return (
    <div className="flex flex-col gap-2 h-28 w-full outline">
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
        className={clsx(
          'h-12 w-full rounded-lg py-2 outline-[1px] dark:bg-black bg-gray-300',
          {
            'outline-red-600 dark:outline-red-500': error?.trim(),
            'outline-green-600 dark:outline-green-500': !error?.trim(),
          },
        )}
      />
      {error && (
        <p
          className={clsx({
            'mt-2 text-sm text-green-600 dark:text-green-500': !error.trim(),
            'mt-2 text-sm text-red-600 dark:text-red-500': error.trim(),
          })}
        >
          <span className="font-medium">Well done!</span> Some success message.
        </p>
      )}
    </div>
  );
}
