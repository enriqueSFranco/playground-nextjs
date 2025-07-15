'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import CvLogo from '@/ui/atoms/AppLogo';
import { PowerIcon } from 'lucide-react';
import { DropdownMenu } from '@/ui/molecules/DropdownMenu/dropdown-menu';
import { DropdownTrigger } from '../molecules/DropdownMenu/dropdown-trigger';
import { Avatar } from '../atoms/Avatar/avatar';

const profileMenuItems = [
  {
    text: 'Cerrar sesión',
    icon: <PowerIcon className="stroke-red-600" size={14} />,
    action: () => signOut({ callbackUrl: '/' }),
  },
];

export default function Navbar() {
  const { data: session, status } = useSession();

  // TODO: Usar el status para dar un feedback de que esta cargando el componente

  return (
    <header className="header flex h-16 items-center justify-between bg-black px-5">
      <Link href="/">
        <CvLogo />
      </Link>
      {session ? (
        <div className="flex flex-col items-center justify-center gap-2 h-full">
          <DropdownTrigger>
            {/* TODO: Implementar el componente <Avatar src="" alt="" /> */}
              <Avatar />
          </DropdownTrigger>
          <DropdownMenu items={profileMenuItems} />
        </div>
      ) : (
        <Link
          href="/signin"
          className="rounded-md bg-neutral-800 px-4 py-3 text-sm font-normal leading-none text-gray-200 antialiased"
        >
          Iniciar sesión
        </Link>
      )}
    </header>
  );
}
