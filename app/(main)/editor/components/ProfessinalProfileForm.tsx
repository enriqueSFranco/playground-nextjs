import { CVSectionHeader } from "./molecules/CVSectionHeader";
import { TextEditor } from "@/components/organisms/TextEditor/TextEditor";

export function ProfessionalProfileForm() {
  return (
    <div className="flex flex-col gap-4">
      <CVSectionHeader title="perfil profesional" description="Comparte un breve resumen sobre tu carrera, habilidades y lo que te hace destacar en tu campo." />

      <TextEditor />
    </div>
  );
}
