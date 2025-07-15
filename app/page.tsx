import Link from 'next/link';
import Navbar from '../ui/organisms/navbar';
import { ArrowRight } from 'lucide-react';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="relative flex flex-col space-y-10 flex-grow lg:grid lg:grid-cols-12 lg:space-y-0">

        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <section className="col-span-7 place-content-center justify-items-center space-y-8">
          <h1 className="mx-auto px-4 text-center text-xl font-bold tracking-wide text-black sm:text-2xl md:text-3xl lg:text-5xl">
            Arma tu CV chido en minutos, con ayuda de la <span className="text-gray-400 text-5xl">IA</span>.
          </h1>

          <Link
            href="/resumes"
            className="flex items-center justify-between gap-2 rounded-full bg-black px-5 py-2.5 transition-colors duration-300 ease-in-out hover:bg-neutral-700"
          >
            <label className="max-xl:text-md cursor-pointer text-sm font-light text-gray-200">
              Empezar ahora
            </label>{' '}
            <ArrowRight size={22} className="stroke-white" />
          </Link>
        </section>
        <section className="col-span-5 justify-items-center self-center">
          <div className="max-w-md overflow-hidden rounded-md bg-transparent p-0 shadow-lg border-[1px] border-gray-200">
            <picture>
              <source
                srcSet="/assets/images/cv-preview-small.png"
                media="(min-width:767px)"
              />
              <img
                src="/assets/images/cv-preview.png"
                className="block w-96 object-cover lg:h-full lg:w-full"
                alt=""
              />
            </picture>
          </div>
        </section>
      </main>
      <footer className="grid h-16 w-full place-content-center font-light">
        <p className="text-xs">
          Creado con 💙 por{' '}
          <a
            href="https://github.com/enriqueSFranco"
            target="_blank"
            className="text-xs text-blue-500"
          >
            @enriqueSF
          </a>
        </p>
      </footer>
    </div>
  );
}
