import React, { use } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook } from '../features/bookslice';

export default function BookList({onHandleEdit}) {

  const books = useSelector((state) => state.booksR.books);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    console.log("Delete book with id:", id);
    // Implement delete functionality here
    // dispatch({ type: 'books/deleteBook', payload: id });
    dispatch(deleteBook(id));
  }


  return (
    <div>
      <h2>List of books</h2>
      {books && books.length === 0 ? (
        <p>No books available</p>
      ) : 
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            {book.title} by {book.author}
            <button onClick={()=> onHandleEdit(book)} >Edit</button>
            <button onClick={()=> handleDelete(book.id)} >Delete</button>
          </li>
        ))} 
      </ul>
      }
    </div>
  )
}
