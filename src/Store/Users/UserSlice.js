import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        currentUser: null,
        users: null,
        token: null,
        loading: false,
    },
    reducers: {
        setCurrentUser: (state, { payload }) => {
            state.currentUser = payload
        },
        setUsers: (state, { payload }) => {
            state.users = payload
        },
        setToken: (state, { payload }) => {
            state.token = payload
        },
        setLoading: (state, { payload }) => {
            state.loading = payload
        }
    }
})

export const { setCurrentUser, setUsers, setToken, setLoading } = userSlice.actions;
export default userSlice.reducer;