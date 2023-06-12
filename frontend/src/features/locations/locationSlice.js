import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  locations: [
    {
      _id: "64862e5d96f44cad1ca7f370",
      user: "64371b297653765fef40f61c",
      name: "Sky Condo",
      __v: 0,
    },
    {
      _id: "64862fa79b142743b8d68e36",
      user: "64371b297653765fef40f61c",
      name: "The Villager",
      __v: 0,
    },
    {
      _id: "6486310c7d1464807c0820d2",
      user: "64371b297653765fef40f61c",
      name: "6 Niamogue",
      __v: 0,
    },
    {
      _id: "6486410c63496e9aaae35270",
      user: "64371b297653765fef40f61c",
      name: "8 Niamogue",
      __v: 0,
    },
    {
      _id: "648730bec97046198e4037c6",
      user: "64371b297653765fef40f61c",
      name: "125 Millionaire's Lane",
      __v: 0,
    },
    {
      _id: "648730ccc97046198e4037cb",
      user: "64371b297653765fef40f61c",
      name: "None",
      __v: 0,
    },
  ],
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
