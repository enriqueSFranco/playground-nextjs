import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Navbar from './(main)/resumes/Navbar';
// import { useThemeStore } from '@/shared-store/theme';

export default function Page() {
  // const mode = useThemeStore(state => state.mode)
  return (
    <div className={`flex min-h-screen flex-col`}>
      <Navbar />
      <main className="grid grow grid-cols-2 dark:bg-black">
        <section className="flex flex-col items-center justify-center gap-6">
          <h1 className="max-2xl:text-[2.5em] font-bold">CV fácil y rápido.</h1>
          <h2 className="max-2xl:text-[2em] text-center max-2xl:max-w-sm">
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
          <Link
            href="/resumes"
            className="text-md flex items-center gap-5 rounded-lg px-6 py-3 font-medium capitalize dark:bg-neutral-900"
          >
            <label className="max-xl:text-md text-sm font-semibold">
              comenzar
            </label>{' '}
            <ArrowRightIcon className="w-5" />
          </Link>
        </section>
        <section className="self-center relative z-10">
          <div className="w-fit max-w-sm overflow-hidden rounded-lg outline outline-[1px] outline-neutral-500">
            <picture className="">
              <source srcSet="" className="" />
              <img
                src="/assets/images/cv-preview.webp"
                className="h-full w-full object-contain object-top"
                alt=""
              />
            </picture>
          </div>
        </section>
      </main>
      <footer className="grid h-16 w-full place-content-center bg-black">
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
