import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // signInRes:null,
  currentUser: null,
  isUpdated: false,
  isLoading: false,
  isError: false,
  isSweetAlert:false,
  isPageLoading:false,
  isOrderModalOpen:false,
  singleOrderDetails:null
};

// console.log(currentUser);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      signInStart: (state) => {
        state.isLoading = true;
        
      },
      setIsSweetAlert: (state, action) => {
        state.isSweetAlert = action.payload;
      },
      signInSuccess: (state, action) => {
        state.currentUser = action.payload;
        // console.log(action.payload)
        state.isError = false;
        state.isLoading = false;
      },
      editUserProfile: (state, action) => {
        const { username, email, phoneNumber, adress } = action.payload;
        state.currentUser.username = username;
        state.currentUser.email = email;
        state.currentUser.phoneNumber = phoneNumber;
        state.currentUser.adress = adress;
      },
     }
    });

 export const {
  setIsSweetAlert,signInSuccess,editUserProfile
 } = userSlice.actions
 
export default userSlice.reducer;