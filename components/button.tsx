import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex items-center justify-between gap-1 px-6 py-3 rounded-lg bg-black text-sm font-normal outline outline-[1px] dark:outline-white/20 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}
