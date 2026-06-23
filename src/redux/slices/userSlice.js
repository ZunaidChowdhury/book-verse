import { createSlice } from "@reduxjs/toolkit";

// NOTE: User authentication state is now managed by better-auth via useSession() hook
// This slice is kept for other user-related state management purposes only
// Do NOT use setUser/clearUser for authentication state - use better-auth directly

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setUser, clearUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
