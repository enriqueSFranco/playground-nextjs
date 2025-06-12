import { CVPreviewSection } from '../templates/CVPreviewSection';

export function CVPreview() {
  return (
    <section className="group relative flex">
      <div className="absolute left-1 top-1 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-3 lg:top-3 xl:opacity-100">
        <nav>
          <ul className="flex flex-col items-start justify-start gap-3">
            <li>
              <button className="grid h-8 w-8 place-content-center rounded-xl bg-white outline outline-[1px] outline-gray-300 transition-shadow duration-300 ease-in-out hover:shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
                  />
                </svg>
              </button>
            </li>
            <li>
              <button className="grid h-8 w-8 place-content-center rounded-xl bg-white outline outline-[1px] outline-gray-300 transition-shadow duration-300 ease-in-out hover:shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <CVPreviewSection />
      </div>
    </section>
  );
}
