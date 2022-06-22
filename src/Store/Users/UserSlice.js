import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        currentUser: null,
        users: null,
        token: null,
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
        }
    }
})

export const { setCurrentUser, setUsers, setToken } = userSlice.actions;
export default userSlice.reducer;