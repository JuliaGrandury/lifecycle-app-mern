import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import itemsService from './itemsService'

const initialState = {
    items: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        reset: (state) => initialState
    }
})

export const { reset } = itemsSlice.actions
export default itemsSlice.reducer