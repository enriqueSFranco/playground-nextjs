import { Editor } from "slate";
import { BoldIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import { CustomEditor } from "@/lib/helpers";

interface ToolbarProps {
  editor: Editor
}

export const Toolbar = ({editor}: ToolbarProps) => {
  return (
    <nav className="flex items-center gap-3">
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleBoldMark(editor);
        }}
      >
        <BoldIcon className='w-4 dark:stroke-white' />
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
        }}
      >
        <ListBulletIcon className='w-5 dark:stroke-white' />
      </button>
    </nav>
  );
};