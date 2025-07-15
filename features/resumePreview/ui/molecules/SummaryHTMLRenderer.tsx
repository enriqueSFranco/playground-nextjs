
import { useMemo } from 'react';
import { type JSONContent } from '@tiptap/react';
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Bold from '@tiptap/extension-bold'
import Text from '@tiptap/extension-text'
import { generateHTML } from '@tiptap/html'

interface Props {
  content: JSONContent;
}
export function SummaryHTMLRenderer({ content }: Props) {
  const html = useMemo(() => {
    if (!content || content.type !== 'doc') return '';

    return generateHTML(content, [
      Document,
      Paragraph,
      Text,
      Bold,
    ]);
  }, [content]);

  return (
    <div
      className="prose tracking-wide line-clamp-5 leading-6"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
