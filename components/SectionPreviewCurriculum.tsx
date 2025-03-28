import { EditorFormProps } from "@/lib/types";
import { PaintBrushIcon, StopIcon } from "@heroicons/react/24/outline";

export function SectionPreviewCurriculum() {
  return (
    <article className="w-full">
      <div className="relative h-full w-full bg-white">
        {/* data del cv */}
      </div>
      <nav className="absolute left-2 top-2">
        <ul className="flex flex-col items-center gap-1">
          <li>
            <button className="rounded-lg bg-black p-2">
              <PaintBrushIcon className="h-5 w-5 stroke-white" />
            </button>
          </li>
          <li>
            <button className="flex place-items-center rounded-lg bg-black p-2">
              <StopIcon className="h-5 w-5 stroke-white" />
            </button>
          </li>
        </ul>
      </nav>
    </article>
  );
}
