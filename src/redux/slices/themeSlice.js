import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: (typeof window !== "undefined" ? localStorage.getItem("theme") : "dark") || "dark",
    isDark: (typeof window !== "undefined" ? localStorage.getItem("isDark") : true) || true,
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.mode = action.payload;
            state.isDark = action.payload === "dark";
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", action.payload);
                localStorage.setItem("isDark", state.isDark);
                document.documentElement.classList.remove("light", "dark", "brand");
                document.documentElement.classList.add(action.payload);
            }
        },
        toggleTheme: (state) => {
            const newTheme = state.mode === "light" ? "dark" : state.mode === "dark" ? "light" : "light";
            state.mode = newTheme;
            state.isDark = newTheme === "dark";
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", newTheme);
                localStorage.setItem("isDark", state.isDark);
                document.documentElement.classList.remove("light", "dark");
                document.documentElement.classList.add(newTheme);
            }
        },
    },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
