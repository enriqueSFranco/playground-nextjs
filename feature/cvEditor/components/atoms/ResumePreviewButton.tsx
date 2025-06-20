import { DocumentTextIcon } from '@heroicons/react/24/outline';

type ResumePreviewButtonProps = {
  isExpanded: boolean;
  onNavigateToPreview: () => void;
};

export function ResumePreviewButton({
  isExpanded,
  onNavigateToPreview,
}: ResumePreviewButtonProps) {
  return (
    <div
      role="link"
      onClick={onNavigateToPreview}
      className="fixed bottom-4 right-4 z-50 flex h-12 w-fit flex-row-reverse items-center overflow-hidden rounded-full bg-black shadow-md"
    >
      <button
        className={`relative grid h-12 w-12 place-content-center overflow-hidden rounded-full bg-black text-white`}
      >
        <DocumentTextIcon className="h-6 w-6 flex-shrink-0 stroke-gray-200" />
      </button>
      <div
        className={`
  flex h-12 items-center justify-end overflow-hidden transition-all duration-300 ease-in-out
  ${isExpanded ? 'w-48 opacity-100' : 'w-0 opacity-0'}
`}
      >
        <span className="text-md whitespace-nowrap text-white">
          Vista previa y descargar
        </span>
      </div>
    </div>
  );
}
