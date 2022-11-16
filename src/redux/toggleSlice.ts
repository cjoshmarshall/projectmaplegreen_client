import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface wizardTypes {
    wizard: boolean,
    sidebar: boolean
}
const initialState: wizardTypes = {
    wizard: false,
    sidebar: false
}
const wizardSlice = createSlice({
    name: "toggle",
    initialState,
    reducers: {
        TOGGLE_WIZARD: (state) => {
            state.wizard = !state.wizard
        },
        OPEN_SIDEBAR: (state) => {
            state.sidebar = true
        },
        CLOSE_SIDEBAR: (state) => {
            state.sidebar = false
        }
    }
})

export const { TOGGLE_WIZARD, OPEN_SIDEBAR, CLOSE_SIDEBAR } = wizardSlice.actions

export default wizardSlice.reducer