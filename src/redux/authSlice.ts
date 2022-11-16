import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface authState {
    user: any,
    isLogged: boolean
}
const initialState: authState = {
    user: {},
    isLogged: false
}
const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SET_CREDENTIALS: (state, action: PayloadAction<any>) => {
            state.user = action.payload
        },
        LOGIN: (state, action: PayloadAction<any>) => {
            state.user = action.payload
            state.isLogged = true
        },
        LOGOUT: (state) => {
            state.user = {}
            state.isLogged = false
        }
    },
})

export const { SET_CREDENTIALS, LOGIN, LOGOUT } = authSlice.actions

export default authSlice.reducer