import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import itemService from "./itemService"

const initialState = {
  items: [],
  statistics: {},
  filterObject: {
    category: null,
    subcategory: null,
    search: null,
    sort: null,
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

// Create new item
export const createItem = createAsyncThunk("items/create", async (itemData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await itemService.createItem(itemData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get user items
export const getItems = createAsyncThunk("items/getAll", async (filter, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await itemService.getItems(token, filter)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Delete closet item
export const deleteItem = createAsyncThunk("items/delete", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await itemService.deleteItem(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get closet statistics
export const getStatistics = createAsyncThunk("items/statistics", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await itemService.getStatistics(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    reset: (state) => ({
      ...initialState,
      filterObject: state.filterObject,
    }),
    updateFilter: (state, action) => {
      state.filterObject = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.items.push(action.payload)
      })
      .addCase(createItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.items = action.payload
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.items = state.items.filter((item) => item._id !== action.payload.id)
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getStatistics.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.statistics = action.payload
      })
      .addCase(getStatistics.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, updateFilter } = itemSlice.actions
export default itemSlice.reducer
