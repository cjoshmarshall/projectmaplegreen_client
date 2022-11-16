import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface alertTypes {
    message: string,
    toggle: boolean
}

const initialState: alertTypes = {
    message: '',
    toggle: false
}
const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        SET_ALERT: (state, action: PayloadAction<string>) => {
            state.message = action.payload
        },
        DISPLAY_ALERT: (state) => {
            state.toggle = true
        },
        CLOSE_ALERT: (state) => {
            state.toggle = false
        }
    }
})

export const { SET_ALERT, DISPLAY_ALERT, CLOSE_ALERT } = alertSlice.actions

export default alertSlice.reducer