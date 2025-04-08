import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';


export default function Page() {
  return (
    <div className="flex flex-grow flex-col items-center py-6 dark:bg-black dark:text-white">
      <Link href="/editor" className="flex items-center justify-between gap-1 px-6 py-3 rounded-lg bg-black text-sm font-normal outline outline-[1px] dark:outline-white/20 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
        <PlusIcon className="w-5" />
        <span>crear curriculum vitae</span>
      </Link>
      <section className="h-full w-full grow">
        <h2 className="text-left text-xl font-light capitalize tracking-wide">
          mis curriculumns
        </h2>
      </section>
    </div>
  );
}
