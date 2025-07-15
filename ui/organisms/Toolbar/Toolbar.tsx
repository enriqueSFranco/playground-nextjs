import { cn } from '@/utils/cn';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
} from 'lucide-react'; // o cualquier icon set que uses

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) return null;

  return (
    <div className="flex items-center gap-2 px-2 py-1 border-b border-gray-300 bg-white">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(
          'p-2 rounded hover:bg-gray-100',
          editor.isActive('bold') && 'bg-gray-200 text-black font-bold'
        )}
        data-tooltip-id="toolbar-tooltip"
        data-tooltip-content="Negrita (Ctrl+B)"
      >
        <Bold size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(
          'p-2 rounded hover:bg-gray-100',
          editor.isActive('italic') && 'bg-gray-200 text-black italic'
        )}
        data-tooltip-id="toolbar-tooltip"
        data-tooltip-content="Cursiva (Ctrl+I)"
      >
        <Italic size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={cn(
          'p-2 rounded hover:bg-gray-100',
          editor.isActive('strike') && 'bg-gray-200 text-black line-through'
        )}
        data-tooltip-id="toolbar-tooltip"
        data-tooltip-content="Tachado (Ctrl+Shift+X)"
      >
        <Strikethrough size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          'p-2 rounded hover:bg-gray-100',
          editor.isActive('bulletList') && 'bg-gray-200 text-black'
        )}
        data-tooltip-id="toolbar-tooltip"
        data-tooltip-content="Lista con viñetas (Ctrl+Shift+8)"
      >
        <List size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          'p-2 rounded hover:bg-gray-100',
          editor.isActive('orderedList') && 'bg-gray-200 text-black'
        )}
        data-tooltip-id="toolbar-tooltip"
        data-tooltip-content="Lista ordenada (Ctrl+Shift+7)"
      >
        <ListOrdered size={16} />
      </button>

      {/* <Tooltip id="toolbar-tooltip" place="bottom" effect="solid" className="text-sm" /> */}
    </div>
  );
};
