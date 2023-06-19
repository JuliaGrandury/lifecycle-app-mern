import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  usernames: [],
  following: ["Louisa", "Juliette", "Martin"],
  followers: ["Victoria", "Mattias", "Michael"],
}

// Get all usernames
export const getAllUsernames = createAsyncThunk("closet/getAllUsernames", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    const res = await fetch("/api/v1/users/allUsernames", {
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

export const closetSlice = createSlice({
  name: "closet",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsernames.pending, (state) => {
        state.usernames = ["Loading users"]
      })
      .addCase(getAllUsernames.fulfilled, (state, action) => {
        state.usernames = action.payload
      })
      .addCase(getAllUsernames.rejected, (state) => {
        state.usernames = ["No users"]
      })
  },
})

export default closetSlice.reducer
