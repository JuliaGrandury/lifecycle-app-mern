import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import closetService from './closetService'

const initialState = {
    owner_name: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}