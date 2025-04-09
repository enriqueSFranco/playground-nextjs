
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Navbar from './(main)/resumes/Navbar';
// import { useThemeStore } from '@/shared-store/theme';

export default function Page() {
  // const mode = useThemeStore(state => state.mode)
  return (
    <div className={`flex min-h-screen flex-col `}>
      <Navbar />
      <main className="flex grow flex-col items-center justify-center dark:bg-black">
        <div className="flex flex-col justify-center items-center gap-6 md:w-2/5 md:px-20">
          <p className="text-xl text-center text-balance lg:text-3xl lg:leading-normal">
            <strong>CV fácil y rápido.</strong> Crea tu CV con IA de manera rápida y sencilla. ¡Hazlo ahora!
          </p>
          <Link
            href="/resumes"
            className="flex items-center gap-5 self-center rounded-lg outline outline-[1px] dark:outline-white/20 px-6 capitalize py-3 text-md font-medium text-white transition-colors dark:hover:bg-white/10"
          >
            <span className='text-sm font-bold'>comenzar</span> <ArrowRightIcon className="w-5" />
          </Link>
        </div>
      </main>
      <footer className="w-full h-16 grid place-content-center bg-black">
        <p className="dark:bg-black text-sm">
          Creado con 💙 por <a href='https://github.com/enriqueSFranco' target='_blank' className='font-semibold text-blue-500'>@enriqueSF</a>
        </p>
      </footer>
    </div>
  );
}
