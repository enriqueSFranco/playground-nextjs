import { lusitana } from '@/ui/fonts';
import { clsx } from 'clsx';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import {Button} from '../../atoms/Button/Button';

interface Breadcrumb {
  label: string;
  href: string;
}

interface Props {
  breadcrumbs: Breadcrumb[];
  currentStep?: string;
  updateStepInURL: (newStep: string) => void;
  separator?: React.ReactNode;
}

export function Breadcrumbs({
  breadcrumbs,
  currentStep = '',
  updateStepInURL,
  separator = <ChevronRightIcon className="w-4" />,
}: Props) {
  const isLastBreadcrumb = (index: number) => index === breadcrumbs.length - 1;
  return (
    <nav aria-label="breadcrumb" className="mb-6 mt-4 block sticky">
      <ol
        className={clsx(
          lusitana.className,
          'flex flex-wrap items-center justify-center gap-2 text-xl md:text-2xl',
        )}
      >
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = isLastBreadcrumb(index)
          const isCurrentStep = currentStep === breadcrumb.href

          return (
            <li
              key={breadcrumb.label}
              aria-current="page"
              className="flex items-center text-sm"
            >
              {currentStep === breadcrumb.href ? (
              <span className={`capitalize ${isCurrentStep ? "text-white underline underline-offset-4 pointer-events-none" : null}`}>{breadcrumb.label}</span>
              ) : (
                <Button onClick={() => updateStepInURL(breadcrumb.href)}>
                  {breadcrumb.label}
                </Button>
              )}
              {!isLast && separator}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
