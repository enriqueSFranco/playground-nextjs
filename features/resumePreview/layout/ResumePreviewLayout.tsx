// import { useDeviceType } from '@/hooks/useDeviceType';
import { LoaderCircleIcon } from 'lucide-react';
import { DownloadPdfButton } from '../ui/atoms/DownloadPdfButton';

type Props = {
  children: React.ReactNode;
};
export function ResumePreviewLayout({
  children,
}: Props) {

  return (
    <div className="flex h-full w-full flex-col bg-gray-500">
      {/* Nav */}
      <nav className="w-full p-2">
        <ul className="flex items-center justify-center">
          <li>
            <DownloadPdfButton />
          </li>
        </ul>
      </nav>

      {/* Contenido principal (A4Page + loader/paginación) */}
      <div className="flex flex-grow flex-col w-full">
        {children}
        {/* Loader + paginación */}
        <div className="w-full px-4 py-2 shadow-sm flex">
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-6 flex items-center gap-2">
              <LoaderCircleIcon className="h-4 w-4 animate-spin text-gray-600" />
              <span className="text-sm text-gray-600">
                Actualizando vista preview...
              </span>
            </div>
            <div className="col-span-6 flex items-center justify-end gap-1">
              <span className="text-sm text-gray-600">1</span>
              <span className="text-sm text-gray-600">/</span>
              <span className="text-sm text-gray-600">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
