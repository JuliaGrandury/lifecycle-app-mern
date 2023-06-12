import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  locations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

// Get user locations
export const getLocations = createAsyncThunk("locations/getLocations", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    const res = await fetch("/api/v1/locations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.json()
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const locationSlice = createSlice({
  name: "locations",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getLocations.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.locations = action.payload
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export default locationSlice.reducer
