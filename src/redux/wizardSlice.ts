import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface wizardTypes {
    toggle: boolean
}
const initialState: wizardTypes = {
    toggle: false
}
const wizardSlice = createSlice({
    name: "wizard",
    initialState,
    reducers: {
        TOGGLE_WIZARD: (state) => {
            state.toggle = !state.toggle
        }
    }
})

export const { TOGGLE_WIZARD } = wizardSlice.actions

export default wizardSlice.reducer