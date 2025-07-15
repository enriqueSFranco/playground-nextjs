import { CareerSummary } from '@/shared/types';
import { SummaryHTMLRenderer } from '../molecules/SummaryHTMLRenderer';
import { forwardRef } from 'react';

type Props = {
  data: CareerSummary
}
export const SummarySection = forwardRef<HTMLElement, Props>(({data }, ref) => {
  if (!data) return null
  return (
    <section className="max-w-3xl" ref={ref}>
      <SummaryHTMLRenderer content={data} />
    </section>
  );
})

SummarySection.displayName = 'SummarySection'
