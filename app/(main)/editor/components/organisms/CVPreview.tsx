import { CVPreviewSection } from "../templates/CVPreviewSection";

export function CVPreview() {
  return (
    <article className="group hidden w-full bg-gray-100 md:flex">
      <div className="absolute left-1 top-1 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-3 lg:top-3 xl:opacity-100">
        {/* opciones */}
      </div>
      <div className="bg-secondary flex w-full h-full justify-center p-2">
        <CVPreviewSection />
      </div>
    </article>
  );
}
