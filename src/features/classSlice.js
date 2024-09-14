import { createSlice } from "@reduxjs/toolkit";

const classSlice = createSlice({
  name: "class",
  initialState: {
    classes: [],
    clas: {},
    enrolledClasses: [],
  },
  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload.classes;
    },
    setClass: (state, action) => {
      state.clas = action.payload.clas;
    },
    setEnrolledClasses: (state, action) => {
      state.enrolledClasses = action.payload.enrolledClasses;
    },
  },
});

export const { setClasses, setClass, setEnrolledClasses } = classSlice.actions;
export default classSlice.reducer;
