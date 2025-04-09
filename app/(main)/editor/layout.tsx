import Navbar from '../resumes/Navbar';

interface Props {
  children?: React.ReactNode;
}

export default function EditorLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col dark:bg-black">
      <Navbar />

      {children}
    </div>
  );
}
