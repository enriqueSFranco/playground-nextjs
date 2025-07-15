'use client';

import { useEditor, EditorContent, type JSONContent } from '@tiptap/react';
import { Bold, Italic, List, Redo, Undo } from 'lucide-react'
import StarterKit from '@tiptap/starter-kit';
// import ListItem from '@tiptap/extension-list-item';
// import BulletList from '@tiptap/extension-bullet-list';
import { Toolbar } from '../Toolbar/Toolbar';
import { cn } from '@/utils/cn';

interface Props {
  content: JSONContent;
  onChange: (value: JSONContent) => void;
}

export const Tiptap = ({ content, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-4',
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: ''
          }
        }
      }),
    ],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl p-2 focus:outline-none min-h-[180px]',
      },
    },
    onUpdate({ editor }) {
      const json = editor.getJSON();
      onChange(json);
    },
  });

  return (
    <div className="flex flex-col w-full overflow-hidden rounded-md z-10 border-[1px] border-gray-200 bg-gray-200">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className='placeholder:text-gray-800' />
    </div>
  );
};
