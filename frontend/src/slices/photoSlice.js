import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import photoService from '../services/photoService'

const initialState = {
    photos: [],
    photo: {},
    error: false,
    success: false,
    loading: false,
    message: null,
}

// publish an user's photo
export const publishPhoto = createAsyncThunk(
    "photo/publish",
      async (photo, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token

        const data = await photoService.publishPhoto(photo, token)

        console.log(data.errors)
        //check for errors
        if(data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

// get user's photo

export const photoSlice = createSlice({
    name: "photos",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.mmessage = null
        },
    },
    extraReducers : (builder) => {
        builder
            .addCase(publishPhoto.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(publishPhoto.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.photo = action.payload
                state.photos.unshift(state.photo)
                state.message =  "Foto publicada com sucesso!"
            })
            .addCase(publishPhoto.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.photo = null
            })            
    }
})

export const { resetMessage } = photoSlice.actions
export default photoSlice.reducer