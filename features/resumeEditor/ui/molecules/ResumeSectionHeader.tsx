interface Props {
  title?: string;
  description?: string;
}

export function ResumeSectionHeader({ title, description }: Props) {
  return (
    <header aria-labelledby="section-title" className="space-y-1 text-left w-full">
      <h2 id="section-title" className="text-lg font-bold capitalize">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </header>
  );
}
