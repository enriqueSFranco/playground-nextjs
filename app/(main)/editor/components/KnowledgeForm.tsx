import { useCallback } from 'react';
import { $editorStore } from '../../_shared-store/editor';
import { Tiptap } from '@/components/organisms/TipTap/TipTap';

export function KnowledgeForm() {
  const { updateField } = $editorStore.actions;

  const handleChange = useCallback((value: string) => {
    updateField({
      form: 'knowledge',
      field: 'skills',
      value,
    });
  }, [updateField]);

  return (
    <div>
        <Tiptap onChange={handleChange} />
    </div>
  );
}
