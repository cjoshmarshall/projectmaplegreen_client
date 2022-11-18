import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface notificationState {
    user: any
}
const initialState: notificationState = {
    user: []
}
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        SET_CREDENTIALS: (state, action: PayloadAction<any>) => {
            state.user.push(action.payload)
        },
        RESET_NOTIFICATIONS: (state,) => {
            state.user = []
        },
    },
})

export const { SET_CREDENTIALS, RESET_NOTIFICATIONS } = notificationSlice.actions

export default notificationSlice.reducer