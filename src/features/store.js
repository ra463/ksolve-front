import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "./commentSlice";
import authSlice from "./authSlice";
import bookSlice from "./bookSlice";
import classSlice from "./classSlice";
import lectureSlice from "./lectureSlice";
import chapterSlice from "./chapterSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    comment: commentSlice,
    book: bookSlice,
    class: classSlice,
    lecture: lectureSlice,
    chapter: chapterSlice,
  },
});
