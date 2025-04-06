import { CVPreviewSection } from "../templates/CVPreviewSection";

export function CVPreview() {
  return (
    <article className="group relative hidden w-full bg-gray-100 md:flex md:w-1/2">
      <div className="absolute left-1 top-1 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-3 lg:top-3 xl:opacity-100">
        {/* opciones */}
      </div>
      <div className="bg-secondary flex w-full justify-center overflow-y-auto p-2">
        <CVPreviewSection />
      </div>
    </article>
  );
}
