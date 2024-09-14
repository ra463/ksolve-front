import { createSlice } from "@reduxjs/toolkit";

const lectureSlice = createSlice({
  name: "lecture",
  initialState: {
    lectures: [],
    lecture: {},
  },
  reducers: {
    setLectures: (state, action) => {
      state.lectures = action.payload.lectures;
    },
    setLecture: (state, action) => {
      state.lecture = action.payload.lecture;
    },
  },
});

export const { setLectures, setLecture } = lectureSlice.actions;
export default lectureSlice.reducer;
