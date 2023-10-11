import {configureStore} from "@reduxjs/toolkit"

//slice
import authReducer from './slices/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
})