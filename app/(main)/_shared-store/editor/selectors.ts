import { useShallow } from "zustand/shallow";
import { useEditorStore } from ".";

export const selectors = {
  useCurriculumData: () => useEditorStore(useShallow(state => state.curriculumData)),
  useWorkExperience: () => useEditorStore(useShallow(state => state.curriculumData.workExperience)),
  useEducation: () => useEditorStore(useShallow(state => state.curriculumData.education))
};
