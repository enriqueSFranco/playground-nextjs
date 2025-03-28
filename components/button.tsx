import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, className, onClick, disabled }) => {
  const baseClasses = "flex items-center justify-between gap-1 px-4 py-2 rounded-lg text-sm font-normal outline outline-[1px] transition-colors";
  const defaultClasses = "bg-black text-white dark:bg-white dark:text-black";
  const hoverClasses = "hover:bg-white/10 dark:hover:bg-slate-300";
  const focusClasses = "focus-visible:outline focus-visible:outline-2";
  const disabledClasses = "aria-disabled:cursor-not-allowed aria-disabled:opacity-50";

  return (
    <button
      onClick={onClick}
      className={clsx(
        baseClasses,
        defaultClasses,
        hoverClasses,
        focusClasses,
        disabledClasses,
        className,  // Añadimos clases personalizadas por props
        disabled && "opacity-50 cursor-not-allowed"  // Si está deshabilitado, aplica clases adicionales
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
