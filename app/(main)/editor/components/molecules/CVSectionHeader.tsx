interface Props {
  title?: string;
  description?: string;
}

export function CVSectionHeader({ title, description }: Props) {
  return (
    <header aria-labelledby="section-title" className="space-y-0.5 text-center">
      <h2 id="section-title" className="text-2xl font-bold capitalize">{title}</h2>
      <p className="text-sm text-gray-400">{description}</p>
    </header>
  );
}
