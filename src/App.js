import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; 
function App() {
  // I have used 3 state variables [books,setBooks] is for all books, [name, setName] is for particular book name and [author, setAuthor]
  const [books, setBooks] = useState([]);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(()=>{
    getBooks()
  },[])

  // to add books to inventory
  const addBook = async () => {
    await axios.post('http://localhost:3001/books', { name, author });
    getBooks();
  };

  //to delete books from inventory
  const removeBook = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);
    getBooks();
  };

  //to get books from backend and added to books state
  const getBooks = async () => {
    const { data } = await axios.get('http://localhost:3001/books');
    setBooks(data);
  };

  return (
    <div>
      <h1>My Book Inventory</h1>
      <form onSubmit={addBook}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />{/* I have used onchange and on submit it will be saved at name state */}
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} /> {/* I have used onchange and on submit it will be saved at author state */}
        <button type="submit">Add Book</button>
      </form>
      <ol> {/* I have used orderded list and mapped the books state for display of all books in inventory I  have added remove button beside the books */}
        {books.map((books) => (
          <li key={books.id}>
            {books.name} by {books.author}{' '}
            <button onClick={() => removeBook(books.id)}>Remove</button>
          </li>
        ))}
      </ol>
      
    </div>
  );
}

export default App;
