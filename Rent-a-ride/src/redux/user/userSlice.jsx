import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isUpdated: false,
  isLoading: false,
  isError: false,
  isSweetAlert:false,
  isPageLoading:false,
  isOrderModalOpen:false,
  singleOrderDetails:null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      signInStart: (state) => {
        state.isLoading = true;
      },
     }
    })

export default userSlice.reducer;