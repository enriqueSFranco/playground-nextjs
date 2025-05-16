"use client";

import Link from 'next/link';
import { SunIcon } from '@heroicons/react/24/outline';
import {Button} from '@/components/atoms/Button/Button';
import { MoonIcon } from "@heroicons/react/24/outline";
import IntelliceCVLogo from '@/components/atoms/AppLogo';
import { useThemeStore } from '@/app/(main)/_shared-store/theme';
import { useShallow } from 'zustand/shallow';

export default function Navbar() {
  const {mode, changeMode} = useThemeStore(useShallow(state => ({mode: state.mode, changeMode: state.changeMode})))

  return (
    <header className="flex items-center justify-between h-16 shadow-sm text-black dark:bg-black dark:text-white">
      <Link href="/">
        <IntelliceCVLogo />
      </Link>
      <Button color='SECODNARY' className="flex items-center justify-center rounded-full w-8 h-8 lg:w-10 lg:h-10 dark:bg-white dark:text-black" onClick={changeMode}>
        {mode === 'light' ? <MoonIcon className="w-5 h-5 flex-shrink-0" /> : <SunIcon className="w-5 h-5 flex-shrink-0" />}
        {/* <label className="text-sm font-normal cursor-pointer">{mode === 'light' ? "oscuro" : "claro"}</label> */}
      </Button>
    </header>
  );
}
