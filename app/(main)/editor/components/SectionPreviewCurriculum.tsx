import { EditorForm } from "@/lib/types";
import { PaintBrushIcon, StopIcon } from "@heroicons/react/24/outline";

export function SectionPreviewCurriculum({curriculumData}: EditorForm) {
  return (
    <article className="bg-white/10 p-3 w-full">
      <div>
        <pre>
          {JSON.stringify(curriculumData, null, 2)}
        </pre>
      </div>
      <nav>
        <ul className="flex flex-col gap-4">
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
