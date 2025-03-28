import { CVSectionHeader } from "./CVSectionHeader";
import { MyEditor } from "./MyEditor";

export function ProfessionalProfileForm() {
  return (
    <div className="flex flex-col gap-4">
      <CVSectionHeader title="perfil profesional" description="Comparte un breve resumen sobre tu carrera, habilidades y lo que te hace destacar en tu campo." />

      <MyEditor />
    </div>
  );
}
