import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-grow flex-col items-center py-6 dark:bg-black dark:text-white p-5">
      <Link
        href="/editor"
        className="text-md flex items-center justify-between gap-2 rounded-full p-3 bg-black text-white w-fit hover:bg-neutral-800 transition-colors duration-300 ease-in-out font-medium capitalize dark:bg-white dark:text-black dark:hover:bg-neutral-200"
      >
        <PlusIcon className="w-5" />
        <label className="text-sm font-light capitalize cursor-pointer">
          Crear curriculum vitae
        </label>
      </Link>
      <section className="h-full w-full grow mt-4 flex flex-col gap-4">
        <h2 className="text-md text-center lg:text-left font-light capitalize tracking-wide">
          mis curriculumns
        </h2>
        <div className="max-w-xs:m-auto grid w-full">
          <ol className="grid grids-cols-1 justify-center lg:grid-cols-4 lg:justify-start gap-y-6">
            <li>
              <figure
                role="group"
                aria-label="Vista previa del Curriculum de Frontend Developer"
                className="flex w-72 max-w-sm flex-col gap-2 p-2 overflow-hidden bg-gray-100 rounded-md dark:bg-neutral-800"
              >
                <picture>
                  <source
                    srcSet="/assets/images/cv-preview-small.png"
                    media="(min-width:767px)"
                  />
                  <img
                    src="/assets/images/cv-preview.png"
                    className="block h-full w-full object-cover"
                    alt=""
                  />
                </picture>
                <figcaption className="space-y-2">
                  <h3 className="text-base font-semibold dark:text-white text-black">
                    Curriculum de Frontend Developer
                  </h3>
                  <p className="line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius nisi harum fuga earum beatae dicta magni. Qui ab
                    eveniet, aspernatur eligendi, velit rerum autem consectetur
                    quisquam nam maiores accusantium ipsam.
                  </p>
                </figcaption>
              </figure>
            </li>

            <li>
            <figure
                role="group"
                aria-label="Vista previa del Curriculum de Frontend Developer"
                className="flex w-72 max-w-sm flex-col gap-2 p-2 overflow-hidden bg-gray-100 rounded-md dark:bg-neutral-800"
              >
                <picture>
                  <source
                    srcSet="/assets/images/cv-preview-small.png"
                    media="(min-width:767px)"
                  />
                  <img
                    src="/assets/images/cv-preview.png"
                    className="block h-full w-full object-cover"
                    alt=""
                  />
                </picture>
                <figcaption className="space-y-2">
                  <h3 className="text-base font-semibold dark:text-white text-black">
                    Curriculum de Frontend Developer
                  </h3>
                  <p className="line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius nisi harum fuga earum beatae dicta magni. Qui ab
                    eveniet, aspernatur eligendi, velit rerum autem consectetur
                    quisquam nam maiores accusantium ipsam.
                  </p>
                </figcaption>
              </figure>
            </li>

            <li>
            <figure
                role="group"
                aria-label="Vista previa del Curriculum de Frontend Developer"
                className="flex w-72 max-w-sm flex-col gap-2 p-2 overflow-hidden bg-gray-100 rounded-md dark:bg-neutral-800"
              >
                <picture>
                  <source
                    srcSet="/assets/images/cv-preview-small.png"
                    media="(min-width:767px)"
                  />
                  <img
                    src="/assets/images/cv-preview.png"
                    className="block h-full w-full object-cover"
                    alt=""
                  />
                </picture>
                <figcaption className="space-y-2">
                  <h3 className="text-base font-semibold dark:text-white text-black">
                    Curriculum de Frontend Developer
                  </h3>
                  <p className="line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
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
