import { inter } from '../fonts/fonts';
import '@/global.css'

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en">
        <body className={`${inter.className} antialiased dark:text-gray-300`}>{children}</body>
    </html>
  );
}
