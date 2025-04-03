import Link from 'next/link';

import { SunIcon } from '@heroicons/react/24/outline';
import {Button} from '@/components/atoms/Button/Button';
import { MoonIcon } from "@heroicons/react/24/outline";
import IntelliceCVLogo from '@/ui/AppLogo';
import { useThemeStore } from '@/app/(main)/_shared-store/theme';

export default function Navbar() {
  // const {mode, changeMode} = useThemeStore(state => ({mode: state.mode, changeMode: state.changeMode}))

  return (
    <header className="flex items-center justify-between px-6 py-3 h-20 shadow-sm text-black dark:bg-black dark:text-white">
      <Link href="/">
        <IntelliceCVLogo />
      </Link>
      <Button >
        {/* {mode === 'light' ? <SunIcon className="w-5" /> : <MoonIcon className="w-5" />} */}
        <span className="capitalize text-sm">theme</span>
      </Button>
    </header>
  );
}
