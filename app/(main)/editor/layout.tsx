import Navbar from '../../../ui/organisms/navbar';

interface Props {
  children?: React.ReactNode;
}

export default function EditorLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      {children}
    </div>
  );
}
