import { lusitana } from '../fonts/fonts';
import '@/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className="dark">
      <body className={`${lusitana.className} antialiased dark:bg-black`}>
        {children}
      </body>
    </html>
  );
}
