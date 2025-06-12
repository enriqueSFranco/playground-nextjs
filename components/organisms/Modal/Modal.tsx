import { Button } from '@/components/atoms/Button/Button';
import { SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Props = {
  title: string;
  description?: string;
  currentUrl?: URL;
  children: React.ReactNode;
};
export function Modal({ title, description, children, currentUrl }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 sm:px-6 lg:px-8"
      tabIndex={-1}
      aria-hidden="true"
    >
      <article className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <header className="mb-4">
          <div className="flex items-center justify-between flex-row-reverse">
            <Link
              href={currentUrl ?? '/'}
              className="text-gray-500 transition hover:text-gray-800 self-start"
            >
              <XMarkIcon className="h-5 w-5" />
            </Link>

            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          </div>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </header>

        {/* Content */}
        <div className="flex flex-col space-y-4">{children}</div>

        {/* Footer Action */}
        <div className="mt-6 flex justify-center">
          <Button className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white hover:bg-gray-900">
            <SparklesIcon className="h-5 w-5" />
            <span>Generar</span>
          </Button>
        </div>
      </article>
    </div>
  );
}
