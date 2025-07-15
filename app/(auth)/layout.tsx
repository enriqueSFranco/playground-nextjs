type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg overflow-hidden shadow">
        {children}
      </div>
    </div>
  );
}
