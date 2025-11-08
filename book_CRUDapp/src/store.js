import {configureStore} from '@reduxjs/toolkit'
import { bookReducer } from './features/bookslice.js'

export const store = configureStore({
  reducer: {
    // Add your reducers here
    booksR: bookReducer,
  },
})