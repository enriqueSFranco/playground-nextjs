import { cn } from '@/app/(main)/lib/utils';

enum ButtonColor {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECODNARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
}

type ButtonColorString = keyof typeof ButtonColor;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColorString;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  color,
  children,
  disabled,
  className,
  ...rest
}) => {
  const baseClass =
    'px-2 py-1 rounded-sm w-fit font-normal capitalize text-sm flex items-center justify-center gap-2 px-4 py-2'; // Clases base

  let buttonClass = cn(
    {
      'bg-black text-white hover:bg-white/20': color === 'DEFAULT',
      'bg-blue-500 text-white hover:bg-blue-600': color === 'PRIMARY',
      'bg-gray-800 text-white hover:bg-gray-700': color === 'SECODNARY',
      'bg-green-500 text-white hover:bg-green-600': color === 'SUCCESS',
      'bg-yellow-500 text-white hover:bg-yellow-600': color === 'WARNING',
      'bg-red-500 text-white hover:bg-red-600': color === 'DANGER',
      'opacity-50 cursor-not-allowed': disabled, // Deshabilitado
    },
    baseClass,
    className,
  );

  return (
    <button {...rest} className={buttonClass} disabled={disabled}>
      {children}
    </button>
  );
};
