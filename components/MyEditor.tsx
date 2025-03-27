import { useCallback, useState } from 'react';
import {
  createEditor,
  BaseEditor,
  Descendant,
} from 'slate';
import { Slate, Editable, ReactEditor, withReact } from 'slate-react';
import { Toolbar } from './Toolbar';
import { CustomEditor } from '@/lib/helpers';

export type CustomEditor = BaseEditor & ReactEditor;

export type ParagraphElement = {
  type: 'paragraph';
  children: CustomText[];
};

export type HeadingElement = {
  type: 'heading';
  level: number;
  children: CustomText[];
};

export type CustomElement = ParagraphElement | HeadingElement;
export type FormattedText = { text: string; bold?: true };

export type CustomText = FormattedText;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

// Define a React component renderer for our code blocks.
const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

// Define a React component to render leaves with bold text.
const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  );
};


export const MyEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <div className='dark:bg-white/10 rounded-lg p-4 gap-4 flex flex-col'>
        <Toolbar editor={editor} /> 
        <Editable
        className='outline-none h-56 self-center w-full'
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder='hello wolrd'
          autoFocus
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return;
            }
            switch (event.key) {
              case 'b': {
                event.preventDefault();
                CustomEditor.toggleBoldMark(editor);
                break;
              }
              case '&': {
                event.preventDefault();
                editor.insertText('and');
                break;
              }
            }
          }}
        />
      </div>
    </Slate>
  );
};
