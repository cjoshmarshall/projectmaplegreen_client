import { combineReducers, configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice";
import authReducer from "./authSlice";
import notificationReducer from "./notificationSlice";
import treeReducer from "./treeSlice"
import userReducer from "./userSlice"
import toggleReducer from "./toggleSlice";


const rootReducer = combineReducers({
    auth: authReducer,
    users: userReducer,
    trees: treeReducer,
    toggle: toggleReducer,
    alert: alertReducer,
    notifications: notificationReducer
})



export const store = configureStore({
    reducer: rootReducer,
    // devTools: false,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDisapatch = typeof store.dispatch