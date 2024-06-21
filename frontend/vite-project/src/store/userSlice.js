import { craeteSlice } from "@reduxjs/toolkit"

const initialState = {
    userData: {
        id: '',
        email: '',
        name: '',
        role: 0,
        image: '',
    },
    isAuth: false,
    isLoading: false,
    error: ''
}

const userSlice = craeteSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => { }
})

export default userSlice.reducer;
