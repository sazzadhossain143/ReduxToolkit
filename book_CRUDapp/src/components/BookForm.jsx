import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addBook, updateBook } from '../features/bookslice';

export default function BookForm({bookToEdit, onCancel}) {

  const [book, setBook] = useState({
    title: '',
    author: ''
  });

  useEffect(() => {
    if (bookToEdit) {
      setBook(bookToEdit);
    }
    else {
      setBook({ title: '', author: '' });
    }
  }, [bookToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook)=>({ ...prevBook, [name]: value }));
  }

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Book to be added:",{ ...book , id: Date.now().toString() });
    // Implement add book functionality here
    // dispatch an action to add the book to the Redux store
    if(bookToEdit){
      // Update existing book logic can go here
      dispatch(updateBook(book));
      onCancel();
    } else {
      // Add new book logic
      dispatch(addBook({
        ...book,
        id: Date.now().toString(), // Simple unique id based on timestamp
      }));
    }
    setBook({ title: '', author: '' }); // Clear form after submission
  }

  return (
    <div>
      <h3>Book Form</h3>
      <form onSubmit={handleSubmit} >
        <div>
          <label>Title:</label>
          <input type="text" name="title" required 
            onChange={handleChange} 
            value={book.title}
          />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" required 
            onChange={handleChange} 
            value={book.author}
          />
        </div>
        <button type="submit">{bookToEdit ? "Update Book" : "Add Book"}</button>
        {bookToEdit && <button type="button" onClick={onCancel} >Cancel</button>}
      </form>
    </div>
  )
}
