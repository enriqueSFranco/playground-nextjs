import { Editor } from '@tiptap/react';
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import { BoldIcon, ItalicIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/atoms/Button/Button';

interface Props {
  editor: Editor | null
}

export const Toolbar = ({editor}: Props) => {

  if (!editor) return null;

  return (
    <nav className="flex h-10 p-1 mb-1 bg-white/10 space-x-2 z-50">
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <BoldIcon className='w-4 h-4' />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <ItalicIcon className='w-4 h-4' />
        </Button>

        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <ListBulletIcon className='w-4 h-4' />
        </Button>

    </nav>
  );

};

// const extensions = [
//   Color.configure({ types: [TextStyle.name, ListItem.name] }),
//   TextStyle.configure({ types: [ListItem.name] }),
//   StarterKit.configure({
//     bulletList: {
//       keepMarks: true,
//       keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
//     },
//     orderedList: {
//       keepMarks: true,
//       keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
//     },
//   }),
// ]
