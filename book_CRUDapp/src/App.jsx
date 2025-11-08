import React, { useState } from 'react'
import './App.css'
import BookList from './components/BookList'
import BookForm from './components/BookForm'

function App() {

  const [bookToEdit, setBookToEdit] = useState(null);

  const handleEdit = (book) => {  
    console.log("Edit book in App component:", book);
    // Implement edit functionality here
    setBookToEdit(book);
  }

  const handleCancelEdit = () => {
    setBookToEdit(null);
  }

  return (
    <>
      <div> book app </div>
      <BookForm bookToEdit={bookToEdit} onCancel={handleCancelEdit} />
      <BookList onHandleEdit={handleEdit} />
    </>
  )
}

export default App
