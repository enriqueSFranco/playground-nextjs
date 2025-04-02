'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import { Toolbar } from '../Toolbar/Toolbar';

interface Props {
  onChange: (value: string) => void;
}

export const Tiptap = ({ onChange }: Props) => {
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
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: ' rounded-sm min-h-[156px] w-full outline-none px-2 py-1',
      },
    },
    onUpdate({ editor }) {
      const contentHTML = editor.getHTML();
      onChange(contentHTML);
    },
  });

  return (
    <div className="flex flex-col gap-1 overflow-hidden rounded-md outline outline-[1px] outline-white/20">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
