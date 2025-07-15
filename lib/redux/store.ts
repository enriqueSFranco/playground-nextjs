import {configureStore} from "@reduxjs/toolkit"
import resumeReducer from "./features/resume/resume.slice"
import resumeUIReducer from "./features/resume/resumeUI.slice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      resumeData: resumeReducer,
      resumeUI: resumeUIReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
