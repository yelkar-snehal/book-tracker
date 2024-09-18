'use client';

import { useState, useEffect } from 'react';
import BookList, { Book } from './BookList';
import AddBook from './AddBook';

const BooksContainer: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch('/api/books');
      const data = await response.json();
      setBooks(data);
    }

    fetchBooks();
  }, []);

  const handleAddBook = (newBook: Book) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const handleUpdateBook = async (updatedBook: Book) => {
    try {
      const response = await fetch('/api/books', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });

      if (response.ok) {
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book._id === updatedBook._id ? updatedBook : book))
        );
      } else {
        const { message } = await response.json()
        alert(`Failed to update the book with message: ${message}`);
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

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
        <BookList books={books} onDeleteBook={handleDelete} onUpdateBook={handleUpdateBook} />
      </div>
    </div>
  );
};

export default BooksContainer;
