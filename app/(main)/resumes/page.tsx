import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FilePlusIcon } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

export default async function Page() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/signin")
  }

  return (
    <section className="flex h-full w-full grow flex-col gap-8 p-4">
      <div className="flex items-center justify-between border-b-[1px] border-b-gray-200 pb-3">
        <h2 className="text-md text-center font-light capitalize tracking-wide lg:text-left">
          curriculumns
        </h2>
        <Link
          href="/editor"
          className="text-md flex h-full w-fit items-center justify-center gap-2 rounded-md bg-black px-5 py-2.5 capitalize text-gray-100 font-light shadow-lg transition-colors duration-300 ease-in-out"
        >
          <FilePlusIcon size={16} />
          <label className="cursor-pointer text-sm font-light capitalize text-gray-100">
            Crear curriculum vitae
          </label>
        </Link>
      </div>
      <ol className="auto-cols-[auto-fit, minmax(min(350px, 100%), 1fr)] grid grid-flow-col justify-center gap-2 w-full">
        <li>
          <figure
            role="group"
            aria-label="Vista previa del Curriculum de Frontend Developer"
            className="flex w-full max-w-sm flex-col gap-2 overflow-hidden rounded-md border-[1px] border-gray-200 bg-gray-100 p-4"
          >
            <picture>
              <source
                srcSet="/assets/images/cv-preview-small.png"
                media="(min-width:767px)"
              />
              <img
                src="/assets/images/cv-preview.png"
                className="block h-full w-full rounded-md object-cover"
                alt=""
              />
            </picture>
            <figcaption className="">
              <h3 className="text-left text-xs font-light text-black">
                Curriculum de Frontend Developer
              </h3>
            </figcaption>
          </figure>
        </li>
      </ol>
    </section>
  );
}
