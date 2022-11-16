import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface treeTypes {
    trees: any,
    selectedTrees: Object[]
}
const initialState: treeTypes = {
    trees: [],
    selectedTrees: []
}

const treeSlice = createSlice({
    name: "trees",
    initialState,
    reducers: {
        SET_TREES: (state, action: PayloadAction<Object[]>) => {
            state.trees = action.payload
        },
        SELECT_TREES: (state, action: PayloadAction<Object[]>) => {
            state.selectedTrees = action.payload
        }

    }
})

export const { SET_TREES, SELECT_TREES } = treeSlice.actions

export default treeSlice.reducer