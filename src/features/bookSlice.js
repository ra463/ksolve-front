import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    book: {},
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload.books;
    },
    setBook: (state, action) => {
      state.book = action.payload.book;
    },
  },
});

export const { setBooks, setBook } = bookSlice.actions;
export default bookSlice.reducer;
