interface Props {
  title?: string;
  description?: string;
}

export function CVSectionHeader({ title, description }: Props) {
  return (
    <header aria-labelledby="section-title" className="space-y-2 text-center mb-8">
      <h2 id="section-title" className="text-2xl font-bold capitalize dark:text-white">{title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </header>
  );
}
