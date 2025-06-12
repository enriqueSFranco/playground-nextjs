import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button } from '../../atoms/Button/Button';
import { useEffect, useRef, useState } from 'react';

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
  separator = (
    <ChevronRightIcon className="w-3 stroke-black dark:stroke-white" />
  ),
}: Props) {
  const indicatorRef = useRef<HTMLDivElement>(null)
  const breadcrumbRefs = useRef<HTMLDivElement[]>([])
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const isLastBreadcrumb = (index: number) => index === breadcrumbs.length - 1;

  useEffect(() => {
    const currentIdxBreadcrumb = breadcrumbs.findIndex(breadcrumb => breadcrumb.href === currentStep)
    const currentElement = breadcrumbRefs.current[currentIdxBreadcrumb]

    if (!currentElement) return;

    requestAnimationFrame(() => {
      const rect = currentElement.getBoundingClientRect();
      const parentRect = currentElement.offsetParent?.getBoundingClientRect();

      if (rect && parentRect) {
        setIndicatorStyle({
          left: rect.left - parentRect.left,
          width: isLastBreadcrumb(currentIdxBreadcrumb) ? rect.width : rect.width - 16,
        });
      }
    });
  }, [currentStep, breadcrumbs])

  return (
    <nav aria-label="breadcrumb" className="sticky mb-6 mt-4 block">
      <ol
        className='relative flex flex-wrap items-center justify-start gap-2 text-xl'
      >
        <div
          ref={indicatorRef}
          className="absolute bottom-0 h-0.5 dark:bg-white bg-black transition-all duration-300 ease-in-out"
          style={{ ...indicatorStyle }}
        />
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = isLastBreadcrumb(index);
          const isCurrentStep = currentStep === breadcrumb.href;

          return (
            <li
              key={breadcrumb.label}
              aria-current="page"
              ref={(el) => (breadcrumbRefs.current[index] = el)}
              className="flex items-center text-sm gap-1"
            >
              {currentStep === breadcrumb.href ? (
                <span
                  className={`capitalize ${isCurrentStep ? 'relative z-10 capitalize pointer-events-none text-sm dark:text-white' : null}`}
                >
                  {breadcrumb.label}
                </span>
              ) : (
                <Button
                  onClick={() => updateStepInURL(breadcrumb.href)}
                  className="p-0 text-sm text-gray-400 dark:hover:text-white transition-colors duration-300 ease-in-out"
                >
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
