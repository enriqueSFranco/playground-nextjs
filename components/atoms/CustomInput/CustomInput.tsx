import { useId } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function CustomInput({label, ...rest}: Props) {
  const inputHintId = useId();

  return (
    <label
      htmlFor={inputHintId}
      className="flex flex-col gap-2 w-full text-sm font-normal dark:text-white"
    >
      <span>{label}</span>
      <input
        id={inputHintId}
        {...rest}
        autoComplete='off'
        className="rounded-lg py-2 w-full h-12 outline-[1px] outline-black dark:bg-black dark:outline-white/20"
      />
    </label>
  );
}
