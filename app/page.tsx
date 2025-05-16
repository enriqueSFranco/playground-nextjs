import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Navbar from './(main)/resumes/Navbar';
// import { useThemeStore } from '@/shared-store/theme';

export default function Page() {
  // const mode = useThemeStore(state => state.mode)
  return (
    <div className={`flex min-h-screen flex-col`}>
      <Navbar />
      <main className="grid grow lg:grid-cols-2 bg-white dark:bg-black">
        <section className="flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-3xl lg:max-2xl:text-[2.5em] font-bold">CV fácil y rápido.</h1>
            <h2 className="text-xl text-center lg:max-2xl:text-[2em] max-xl:w-full">
              Crea tu CV con{' '}
              <span
                className="inline-block bg-gradient-to-bl from-green-300 via-blue-500 to-purple-600 bg-clip-text font-bold text-transparent"
                style={{
                  textShadow:
                    '0 0 45px #3b82f6, 0 0 45px #3b82f6, 0 0 20px #3b82f6',
                }}
              >
                IA
              </span>
              {' '}de manera rápida y sencilla.
            </h2>
          </div>
          <Link
            href="/resumes"
            className="text-md flex items-center justify-between gap-2 rounded-full px-[10px] bg-black text-white py-2 w-fit hover:bg-neutral-800 transition-colors duration-300 ease-in-out font-medium capitalize dark:bg-white"
          >
            <label className="max-xl:text-md text-sm dark:text-black font-medium cursor-pointer">
              comenzar
            </label>{' '}
            <ArrowRightIcon className="w-5 dark:stroke-black" />
          </Link>
        </section>
        <section className="self-center relative z-10 grid justify-items-center">
          <div className="max-w-md overflow-hidden p-0 bg-transparent shadow-lg shadow-black/20 rounded-md">
            <picture>
              <source srcSet="/assets/images/cv-preview-small.png" media="(min-width:767px)" />
              <img
                src="/assets/images/cv-preview.png"
                className="object-cover w-96 lg:w-full lg:h-full block"
                alt=""
              />
            </picture>
          </div>
        </section>
      </main>
      <footer className="grid h-16 w-full place-content-center dark:bg-black">
        <p className="text-sm dark:bg-black">
          Creado con 💙 por{' '}
          <a
            href="https://github.com/enriqueSFranco"
            target="_blank"
            className="font-semibold text-blue-500"
          >
            @enriqueSF
          </a>
        </p>
      </footer>
    </div>
  );
}
