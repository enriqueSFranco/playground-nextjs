'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import { Toolbar } from '../Toolbar/Toolbar';

interface Props {
  content: string
  onChange: (value: string) => void;
}

export const Tiptap = ({ content, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      BulletList,
      ListItem,
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-4',
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: 'mb-2'
          }
        }
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl bg-gray-100 dark:bg-neutral-800 p-2 focus:outline-none min-h-[125px]',
      },
    },
    onUpdate({ editor }) {
      const contentHTML = editor.getHTML();
      onChange(contentHTML);
    },
  });

  return (
    <div className="flex flex-col overflow-hidden rounded-md outline outline-[1px] outline-white/20 z-10">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
