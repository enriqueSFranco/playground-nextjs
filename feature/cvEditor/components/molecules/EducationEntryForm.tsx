import { BasicInput } from "@/ui/atoms/BasicInput/BasicInput";

export function EducationEntryForm() {
  // const {form, updateField } = useCvStore(state => ({form: state.curriculumData, updateField: state.updateField}))
    return (
      <div className="flex flex-col gap-4">
        <form action="">
          <BasicInput label='Grado' />
          <BasicInput label='Institución' />
          <div>
            <BasicInput label='Fecha de inicio' />
            <BasicInput label='Fecha de finalización' />
          </div>
        </form>
      </div>
    );
  }
