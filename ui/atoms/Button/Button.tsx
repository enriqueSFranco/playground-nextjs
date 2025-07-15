import { cn } from '@/utils/cn';

type ButtonVariant = 'solid' | 'outline' | 'ghost';
type ButtonColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ExtendedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = ({
  variant = 'solid',
  color = 'default',
  size = 'md',
  leftIcon,
  rightIcon,
  children,
  disabled,
  className,
  ...rest
}: ExtendedButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none rounded-md';

  const sizeStyles = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-5 text-base',
  };

  const variantStyles = {
    solid: {
      default: 'bg-black text-white hover:bg-neutral-800',
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-800 text-white hover:bg-gray-700',
      success: 'bg-green-600 text-white hover:bg-green-700',
      warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
      danger: 'bg-red-600 text-white hover:bg-red-700',
    },
    outline: {
      default: 'border border-black text-black hover:bg-neutral-100',
      primary: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
      secondary: 'border border-gray-700 text-gray-700 hover:bg-gray-100',
      success: 'border border-green-600 text-green-600 hover:bg-green-50',
      warning: 'border border-yellow-500 text-yellow-500 hover:bg-yellow-100',
      danger: 'border border-red-600 text-red-600 hover:bg-red-100',
    },
    ghost: {
      default: 'text-black hover:bg-neutral-100',
      primary: 'text-blue-600 hover:bg-blue-50',
      secondary: 'text-gray-700 hover:bg-gray-100',
      success: 'text-green-600 hover:bg-green-50',
      warning: 'text-yellow-500 hover:bg-yellow-100',
      danger: 'text-red-600 hover:bg-red-50',
    },
  };

  const disabledStyles = 'opacity-50 pointer-events-none';

  const combinedClassName = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant][color],
    disabled && disabledStyles,
    className
  );

  return (
    <button
      className={combinedClassName}
      disabled={disabled}
      aria-disabled={disabled}
      {...rest}
    >
      {leftIcon && <div className="mr-2">{leftIcon}</div>}
      {children}
      {rightIcon && <div className="ml-2">{rightIcon}</div>}
    </button>
  );
};
