import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface userTypes {
    users: any
}

const initialState: userTypes = {
    users: []
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        SET_USERS: (state, action: PayloadAction<Object[]>) => {
            state.users = action.payload
        }

    }
})

export const { SET_USERS } = userSlice.actions

export default userSlice.reducer