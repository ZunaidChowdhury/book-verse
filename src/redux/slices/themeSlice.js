import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: (typeof window !== "undefined"
        ? localStorage.getItem("theme")
        : "light") || "light",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.mode = action.payload;
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", action.payload);
                document.documentElement.classList.remove("light", "dark", "brand");
                document.documentElement.classList.add(action.payload);
            }
        },
        toggleTheme: (state) => {
            const newTheme = state.mode === "light" ? "dark" : state.mode === "dark" ? "light" : "light";
            state.mode = newTheme;
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", newTheme);
                document.documentElement.classList.remove("light", "dark");
                document.documentElement.classList.add(newTheme);
            }
        },
    },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
