import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    isDarkMode: false,
};


export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setIsDarkMode: (state, action) => {
            state.isDarkMode = action.payload;
        },
    },
});


export const { setIsDarkMode } = globalSlice.actions;


export default globalSlice.reducer;