'use client';

import { useState, useEffect } from 'react';
import BookList, { Book } from './BookList';
import AddBook from './AddBook';

const BooksContainer: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  // Fetch books from the API on component mount
  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch('/api/books');
      const data = await response.json();
      setBooks(data);
    }

    fetchBooks();
  }, []);

  // Optimistically add a new book to the UI
  const handleAddBook = (newBook: Book) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  // Delete a book and update the UI
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/books', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setBooks(books.filter((book) => book._id !== id));
      } else {
        alert('Failed to delete the book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-5">Book Tracker</h1>
        <AddBook onAddBook={handleAddBook} />
        <BookList books={books} onDeleteBook={handleDelete} />
      </div>
    </div>
  );
};

export default BooksContainer;
