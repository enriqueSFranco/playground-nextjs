import { useId } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function TextField({label, ...rest}: Props) {
  const inputHintId = useId();

  return (
    <label
      htmlFor={inputHintId}
      className="flex flex-col gap-2 w-full text-sm font-normal dark:text-gray-300"
    >
      <span>{label}</span>
      <input
        id={inputHintId}
        {...rest}
        className="rounded-lg py-2 w-full h-12 outline outline-[1px] outline-gray-300 dark:bg-black dark:outline-white/20"
      />
    </label>
  );
}
