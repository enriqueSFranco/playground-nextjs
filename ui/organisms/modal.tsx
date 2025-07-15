type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
} & React.HTMLAttributes<HTMLElement>;

export function Modal({children, description, open, onClose}: Props) {
  return (
    <div className={`bg-black/75 absolute inset-0 z-50`} onClick={onClose}>
      <div>{children}</div>
    </div>
  )
}
