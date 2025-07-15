import { AsyncStatus } from "@/shared/types"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { uploadImage } from "./resume.thunk"
import { RootState } from "../../store"

interface ResumeUIState {
  imageUpload: AsyncStatus,
  submitForm: AsyncStatus,
}

const defaultStatus: AsyncStatus = {
  status: 'idle',
  errorMessage: null,
  lastUpdated: undefined,
}

const initialState: ResumeUIState = {
  imageUpload: {...defaultStatus},
  submitForm: {... defaultStatus}
}

export const resumeUISlice = createSlice({
  name: 'resumeUI',
  initialState,
  reducers: {
    setImageUploadStatus(state, action: PayloadAction<ResumeUIState['imageUpload']>) {
      state.imageUpload = {...state.imageUpload, ...action.payload}
    }
  },
  extraReducers: builder => {
      builder
      .addCase(uploadImage.pending, (state, action) => {
        state.imageUpload = {
          ...state.imageUpload,
          status: "loading",
          errorMessage: null
        }
      })
        .addCase(uploadImage.fulfilled, (state, action) => {
          state.imageUpload = {
            ...state.imageUpload,
            status: "success",
            lastUpdated: Date.now()
          }
        })
        .addCase(uploadImage.rejected, (state, action) => {
          state.imageUpload = {
            ...state.imageUpload,
            status: "error",
            errorMessage: action.payload?.message || action.error?.message || "Error desconocido"
          }
        })
    }
})

export const {setImageUploadStatus} = resumeUISlice.actions

export default resumeUISlice.reducer

// selectors
export const selecImageUploadStatus = (state: RootState) => state.resumeUI.imageUpload

// utils/handleAsyncStatus.ts
// import { AsyncStatus } from "@/shared/types";
// import { Draft } from "@reduxjs/toolkit";

// export function handleAsyncStatus(
//   field: keyof Record<string, AsyncStatus>,
//   state: Draft<Record<string, AsyncStatus>>,
//   status: "loading" | "succeeded" | "failed",
//   errorMessage?: string
// ) {
//   const target = state[field];
//   target.status = status;
//   target.lastUpdated = status === "succeeded" ? Date.now() : target.lastUpdated;
//   target.errorMessage = status === "failed" ? errorMessage || null : null;
// }
