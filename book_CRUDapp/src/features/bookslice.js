import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [
    { id:1 , title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id:2 , title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id:3 , title: "1984", author: "George Orwell" },
  ]
}

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    deleteBook: (state, action) => {
      const bookId = action.payload;
      state.books = state.books.filter(book => book.id !== bookId);
    },
    updateBook: (state, action) => {
      const {id, title, author } = action.payload;
      const exisitingBook = state.books.find(book => book.id === id);
      if (exisitingBook) {
        exisitingBook.title = title;
        exisitingBook.author = author;
      }
    },
    addBook: (state, action) => {
      const newBook = action.payload;
      state.books.push(newBook);
    }
  },
});

export const { deleteBook, addBook, updateBook } = bookSlice.actions;

export const bookReducer = bookSlice.reducer;