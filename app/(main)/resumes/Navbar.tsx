import Link from 'next/link';
import { SunIcon } from '@heroicons/react/24/outline';
import Button from '@/components/button';
import { MoonIcon } from "@heroicons/react/24/outline";
import IntelliceCVLogo from '@/ui/intelliceCV-logo';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-3 h-20 shadow-sm text-black dark:bg-black dark:text-white dark:border-b-[1px] dark:border-b-white/20">
      <Link href="/">
        <IntelliceCVLogo />
      </Link>
      <Button>
        <SunIcon className="w-5" />
        <span className="capitalize text-sm">theme</span>
      </Button>
    </header>
  );
}
