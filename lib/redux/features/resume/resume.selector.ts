import { RootState } from "@/redux/store";

// selectors
export const selectResumeState = (state: RootState) => state.resumeData;

export const selectFieldByPath = (fieldPath: string) => (state: RootState) => {
  const keys = fieldPath.split(".")
  let current: any = state.resumeData;

  for (const key of keys) {
    if (current === null) return undefined
    current = current[key]
  }
  return current
}

