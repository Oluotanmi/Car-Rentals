import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    chat: false,
    userProfile: false,
    notification: false,
    activeMenu:true,
    isClicked:false,
    screenSize: window.innerWidth,
};

export const adminDashboardSlice = createSlice({
    name: "adminDashboardSlice",
    initialState,
    reducers: {

    }
});

export default adminDashboardSlice.reducer