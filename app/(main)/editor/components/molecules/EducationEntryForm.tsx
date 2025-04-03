import { CustomInput } from "../../../../../components/atoms/CustomInput/CustomInput";

export function EducationEntryForm() {
  // const {form, updateField } = useEditorStore(state => ({form: state.curriculumData, updateField: state.updateField})) 
    return (
      <div className="flex flex-col gap-4">
        <form action="">
          <CustomInput label='Grado' />
          <CustomInput label='Institución' />
          <div>
            <CustomInput label='Fecha de inicio' />
            <CustomInput label='Fecha de finalización' />
          </div>
        </form>
      </div>
    );
  }