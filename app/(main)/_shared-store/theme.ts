import {create} from "zustand"
import { type Theme } from "@/app/(main)/lib/types"

interface ThemeState {
    mode: Theme,
    changeMode: () => void
}

export const useThemeStore = create<ThemeState>()((set) => ({
    mode: 'light',
    changeMode() {
        set(state => ({mode: state.mode === 'light' ? 'dark' : 'light'}))
    },
}))