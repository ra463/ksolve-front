import { createSlice } from "@reduxjs/toolkit";

const chapterSlice = createSlice({
  name: "chapter",
  initialState: {
    chapters: [],
    chapter: {},
  },
  reducers: {
    setChapters: (state, action) => {
      state.chapters = action.payload.chapters;
    },
    setChapter: (state, action) => {
      state.chapter = action.payload.chapter;
    },
  },
});

export const { setChapters, setChapter } = chapterSlice.actions;
export default chapterSlice.reducer;
