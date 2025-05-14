import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-grow flex-col items-center py-6 dark:bg-black dark:text-white">
      <Link
        href="/editor"
        className="flex items-center justify-between gap-1 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-normal text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 dark:outline-white/20"
      >
        <PlusIcon className="w-5" />
        <label className="text-sm font-light capitalize">
          Crear curriculum vitae
        </label>
      </Link>
      <section className="h-full w-full grow">
        <h2 className="text-md text-center font-light capitalize tracking-wide">
          mis curriculumns
        </h2>
        <div className="m-auto grid max-w-sm place-content-center bg-neutral-900 p-px">
          <ol className="grid grid-cols-1 place-content-center gap-y-6">
            <li>
              <figure
                role="group"
                aria-label="Vista previa del Curriculum de Frontend Developer"
                className="flex w-72 max-w-sm flex-col gap-2 overflow-hidden rounded-md"
              >
                <picture>
                  <source srcSet="" />
                  <img
                    src="/assets/images/cv-preview.webp"
                    alt="cv preview"
                    className="aspect-video h-full w-full object-cover object-center"
                  />
                </picture>
                <figcaption className="space-y-2">
                  <h3 className="text-base font-semibold text-white">
                    Curriculum de Frontend Developer
                  </h3>
                  <p className="line-clamp-3 text-sm text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius nisi harum fuga earum beatae dicta magni. Qui ab
                    eveniet, aspernatur eligendi, velit rerum autem consectetur
                    quisquam nam maiores accusantium ipsam.
                  </p>
                </figcaption>
              </figure>
            </li>

            <li>
              <figure className="w-72 max-w-sm overflow-hidden rounded-md">
                <picture>
                  <source srcSet="" />
                  <img
                    src="/assets/images/cv-preview.webp"
                    alt="cv preview"
                    className="aspect-video h-full w-full object-cover object-center"
                  />
                </picture>
                <figcaption className="space-y-2">
                  <h3 className="text-base font-semibold text-white">
                    Curriculum de Frontend Developer
                  </h3>
                  <p className="line-clamp-3 text-sm text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius nisi harum fuga earum beatae dicta magni. Qui ab
                    eveniet, aspernatur eligendi, velit rerum autem consectetur
                    quisquam nam maiores accusantium ipsam.
                  </p>
                </figcaption>
              </figure>
            </li>

            <li>
              <figure className="w-72 max-w-sm overflow-hidden rounded-md">
                <picture>
                  <source srcSet="" />
                  <img
                    src="/assets/images/cv-preview.webp"
                    alt="cv preview"
                    className="aspect-video h-full w-full object-cover object-center"
                  />
                </picture>
                <figcaption className="space-y-2">
                  <h3 className="text-base font-semibold text-white">
                    Curriculum de Frontend Developer
                  </h3>
                  <p className="line-clamp-3 text-sm text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius nisi harum fuga earum beatae dicta magni. Qui ab
                    eveniet, aspernatur eligendi, velit rerum autem consectetur
                    quisquam nam maiores accusantium ipsam.
                  </p>
                </figcaption>
              </figure>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
