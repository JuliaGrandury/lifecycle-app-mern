import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import closetService from './closetService'

const initialState = {
    owner_name: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const closetSlice = createSlice({
    name: 'closet',
    initialState,
    reducers: {

    }
})

export default closetSlice.reducer